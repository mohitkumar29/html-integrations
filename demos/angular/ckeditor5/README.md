# CKEditor integration in Angular

A simple Angular App integrating WIRIS MathType on a CKEditor 5 and step-by-step information on how to build it. The  code of this example loads a rich text editor instance with a default value.

## Requirements

* npm
* Angular (*Currently* v11.2.10)

## How to run the demo

```sh
$ npm install
$ npm start
```

*More information on the different ways to run a demo [here](../../README.md)*

Runs the app in the development mode.<br />
Open [http://localhost:4200/](http://localhost:4200/) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## How to add MathType to CKEditor

1. Install MathType for CKEditor5 dependency.

    ```sh
    $ npm install --save @wiris/mathtype-ckeditor5
    ```

2. Open *src/app/app.component.ts* and add the following lines:

    ```ts
    
    // Load the custom classic editor build with MathType included.
    import * as ClassicEditor from '../ckeditor';
    
    ...

    export class AppComponent {
        
        public Editor = ClassicEditor;
        
        // Define the editor configurations
        public options: Object = {
            toolbar: [ 'heading', '|', 'bold', 'italic', 'MathType', 'ChemType', 'alignment' ],
            htmlAllowedTags:  ['.*'],
            htmlAllowedAttrs: ['.*'],
        }
    }
    ```

3. Open *src/app/app.component.html* and replace all with:

    ```html
    <h1>Classic editor</h1>
    <ckeditor [config]="options" [editor]="Editor"></ckeditor>
    ```

4. Create a custom build to integrate wiris plugins and more. <br>
    a. Follow this [GUIDE](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/custom-builds.html) on how to create a custom Classic editor build. <br>
    b. The wiris dependency you will need to install when following the guide is:
        ```
        npm install @wiris/mathtype-ckeditor5
        ``` <br>
    c. You can also add as many plugins as your project will need which are not on the default ClassicEditor build (We also added  the align plugin). <br>
    d. We recommend you to just clone the branch and copy the compiled file with the editor and the new configurations placed on **build/ckeditor.js** on your project src folder. If you decide to do it by other ways, you will have to change the way the custom build is imported on your app.component.ts file.

5. Finally, you are ready to run the development server through the specified command ```ng serve```

## How to run the tests

```sh
$ npm run test
```

Execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Learn More

Checkout the [FAQ](FAQs.md) file learn more about the most frequent asked questions.

You can learn more in the [Create Angular App documentation](https://angular.io/cli/new).

To learn more about Angular, check out the [Angular documentation](https://angular.io/).

For more information about the CKEditor or it’s options, you can check their [documentation](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/angular.html).

To get more information about wiris MathType you can check on the [official documentation](http://www.wiris.com/mathtype)

## License

Copyright © 2010-2022 [WIRIS](http://www.wiris.com). Released under the [MIT License](../../../LICENSE).
