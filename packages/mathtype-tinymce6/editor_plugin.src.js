import IntegrationModel from '@wiris/mathtype-html-integration-devkit/src/integrationmodel';
import Configuration from '@wiris/mathtype-html-integration-devkit/src/configuration';
import Parser from '@wiris/mathtype-html-integration-devkit/src/parser';
// import Util from '@wiris/mathtype-html-integration-devkit/src/util';
import Listeners from '@wiris/mathtype-html-integration-devkit/src/listeners';

// import packageInfo from './package.json';

/**
 * TinyMCE integration class. This class extends IntegrationModel class.
 */
export class TinyMceIntegration extends IntegrationModel {
  constructor(integrationModelProperties) {
    super(integrationModelProperties);
    /**
         * Indicates if the content of the TinyMCe editor has
         * been parsed.
         * @type {Boolean}
         */
    this.initParsed = integrationModelProperties.initParsed;
    /**
         * Indicates if the TinyMCE is integrated in Moodle.
         * @type {Boolean}
         */
    this.isMoodle = integrationModelProperties.isMoodle;
    /**
         * Indicates if the plugin is loaded as an external plugin by TinyMCE.
         * @type {Boolean}
         */
    this.isExternal = integrationModelProperties.isExternal;
  }

  /**
     * Returns the absolute path of the integration script. Depends on
     * TinyMCE integration (Moodle or standard).
     * @returns {Boolean} - Absolute path for the integration script.
     */
  getPath() {
    if (this.isMoodle) {
      // return '/lib/editor/tinymce/plugins/tiny_mce_wiris/tinymce/';
      const search = 'lib/editor/tinymce';
      const pos = tinymce.baseURL.indexOf(search);
      const baseURL = tinymce.baseURL.substr(0, pos + search.length);
      return `${baseURL}/plugins/tiny_mce_wiris/tinymce/`;
    } if (this.isExternal) {
      const externalUrl = this.editorObject.getParam('external_plugins').tiny_mce_wiris;
      return externalUrl.substring(0, externalUrl.lastIndexOf('/') + 1);
    }
    return `${tinymce.baseURL}/plugins/tiny_mce_wiris/`;
  }

  /**
     * Returns the absolute path of plugin icons. A set of different
     * icons is needed for TinyMCE and Moodle 2.5-
     * @returns {String} - Absolute path of the icons folder.
     */
  getIconsPath() {
    if (this.isMoodle && Configuration.get('versionPlatform') < 2013111800) {
      return `${this.getPath()}icons/tinymce3/`;
    }
    return `${this.getPath()}icons/`;
  }

  /**
     * Returns the integration language. TinyMCE language is inherited.
     * When no language is set, TinyMCE sets the toolbar to english.
     * @returns {String} - Integration language.
     */
  getLanguage() {
    const editorSettings = this.editorObject.settings;
    try {
      return editorSettings.mathTypeParameters.editorParameters.language;
    } catch (e) { console.error(); }
    // Get the deprecated wirisformulaeditorlang
    if (editorSettings.wirisformulaeditorlang) {
      console.warn('Deprecated property wirisformulaeditorlang. Use mathTypeParameters on instead.');
      return editorSettings.wirisformulaeditorlang;
    }
    const langParam = this.editorObject.getParam('language');
    return langParam || super.getLanguage();
  }

  /**
     * Callback function called before 'onTargetLoad' is fired. All the logic here is to
     * avoid TinyMCE change MathType formulas.
     */
  callbackFunction() {
    const dataImgFiltered = [];
    super.callbackFunction();

    // Avoid to change class of image formulas.
    const imageClassName = Configuration.get('imageClassName');
    if (this.isIframe) {
      // Attaching observers to wiris images.
      if (typeof Parser.observer !== 'undefined') {
        Array.prototype.forEach.call(this.target.contentDocument.getElementsByClassName(imageClassName), (wirisImages) => {
          Parser.observer.observe(wirisImages);
        });
      }
    } else { // Inline.
      // Attaching observers to wiris images.
      Array.prototype.forEach.call(document.getElementsByClassName(imageClassName), (wirisImages) => {
        Parser.observer.observe(wirisImages);
      });
    }

    // When a formula is updated TinyMCE 'Change' event must be fired.
    // See https://www.tiny.cloud/docs/advanced/events/#change for further information.
    const listener = Listeners.newListener('onAfterFormulaInsertion', () => {
      if (typeof this.editorObject.fire !== 'undefined') {
        this.editorObject.fire('Change');
      }
    });
    this.getCore().addListener(listener);

    // Avoid filter formulas with performance enabled.
    dataImgFiltered[this.editorObject.id] = this.editorObject.settings.images_dataimg_filter;
    this.editorObject.settings.images_dataimg_filter = (img) => {
      if (img.hasAttribute('class') && img.getAttribute('class').indexOf(Configuration.get('imageClassName')) !== -1) {
        return img.hasAttribute('internal-blob');
      }
      // If the client put an image data filter, run. Otherwise default behaviour (put blob).
      if (typeof dataImgFiltered[this.editorObject.id] !== 'undefined') {
        return dataImgFiltered[this.editorObject.id](img);
      }
      return true;
    };
  }

  /**
     * Fires the event ExecCommand and transform a MathML into an image formula.
     * @param {string} mathml - MathML to generate the formula and can be caught with the event.
     */
  updateFormula(mathml) {
    if (typeof this.editorObject.fire !== 'undefined') {
      this.editorObject.fire('ExecCommand', { command: 'updateFormula', value: mathml });
    }
    super.updateFormula(mathml);
  }
}

/**
 * Object containing all TinyMCE integration instances. One for each TinyMCE editor.
 * @type {Object}
 */
export const instances = {};
/**
 * TinyMCE integration current instance. The current instance
 * is the instance related with the focused editor.
 * @type {TinyMceIntegration}
 */
export const currentInstance = null;

/*
  Note: We have included the plugin in the same JavaScript file as the TinyMCE
  instance for display purposes only. Tiny recommends not maintaining the plugin
  with the TinyMCE instance and using the `external_plugins` option.
*/
// eslint-disable-next-line no-unused-vars
tinymce.PluginManager.add('example', (editor, url) => {
  const openDialog = function () {
    return editor.windowManager.open({
      title: 'Example plugin',
      body: {
        type: 'panel',
        items: [
          {
            type: 'input',
            name: 'title',
            label: 'Title',
          },
        ],
      },
      buttons: [
        {
          type: 'cancel',
          text: 'Close',
        },
        {
          type: 'submit',
          text: 'Save',
          primary: true,
        },
      ],
      onSubmit(api) {
        const data = api.getData();
        /* Insert content when the window form is submitted */
        editor.insertContent(`Title: ${data.title}`);
        api.close();
      },
    });
  };
  /* Add a button that opens a window */
  editor.ui.registry.addButton('example', {
    text: 'My button',
    onAction() {
      /* Open window */
      openDialog();
    },
  });
  /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
  editor.ui.registry.addMenuItem('example', {
    text: 'Example plugin',
    onAction() {
      /* Open window */
      openDialog();
    },
  });
  /* Return the metadata for the help plugin */
  return {
    getMetadata() {
      return {
        name: 'Example plugin',
        url: 'http://exampleplugindocsurl.com',
      };
    },
  };
});
