import { Component } from '@angular/core';

// Import common resources.
import * as Generic from 'resources/demos/imports';
import { environment } from 'src/environments/environment';

// Apply specific demo names to all the objects.
document.getElementById('header_title_name').innerHTML = 'MathType for Froala on Angular';
document.getElementById('version_editor').innerHTML = 'Froala: ';

// Create the initial editor content.
const editorContent = Generic.editorContentImg;

// Copy the editor content before initializing it.
// Currently disabled by decision of QA.
// document.getElementById('transform_content').innerHTML = editorContent;

// Add listener on click button to launch updateContent function.
document.getElementById('btn_update').addEventListener('click', (e) => {
  e.preventDefault();
  Generic.updateContent((window as any).FroalaEditor.INSTANCES[0].html.get(), 'transform_content');                     //eslint-disable-line
});

@Component({
  selector: '#editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // Set App Title.
  title = 'Demo Froala on Angular';

  // Initializate the editor content.
  public content: string = editorContent;

  // Set options for the editor.
  public options: Object = {
    // Define the toolbar options for the froala editor.
    toolbarButtons: ['undo', 'redo', 'bold', 'italic', '|', 'wirisEditor', 'wirisChemistry', 'insertImage'],

    // Add [MW] buttons to the image editing popup Toolbar.
    imageEditButtons: ['wirisEditor', 'wirisChemistry', 'imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove'],

    // Allow all the tags to understand the mathml
		htmlAllowedTags:  ['.*'],
    htmlAllowedAttrs: ['.*'],

    key: environment.froalaKey,

    // List of tags that are not removed when they have no content inside
    // so that formulas renderize propertly
    htmlAllowedEmptyTags: ['mprescripts', 'none'],

    // Remove "Powered by Froala" water mark
    attribution: false,

    // Froala editor language
    // language: 'de',
    // You could set a different language for MathType editor:
    // mathTypeParameters: {
    //   editorParameters: { language: 'es' },
    // },

    // Execute on initialized editor.
    events: {
      initialized() {
        // Get and set the editor and wiris versions in this order.
        Generic.setEditorAndWirisVersion((window as any).FroalaEditor.VERSION, (window as any).WirisPlugin.currentInstance.version);        //eslint-disable-line

        // Set initial content
        this.html.set(editorContent);
      },
    },
  };
}
