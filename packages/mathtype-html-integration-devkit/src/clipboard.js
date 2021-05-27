export default class Clipboard {
  constructor() {
    throw new Error('Static class StringManager can not be instantiated.');
  }

  /**
  * The list of cleaners that each pasted string must pass through.
  * Each one should take a string and return a string.
  */
  static cleaners = [
    Clipboard.cleanGoogleSpreadsheetDebris,
  ];

  static setPasteListener(target) {
    target.addEventListener('paste', (event) => {
      // Change the copied contents to remove debris
      let copied = (event.clipboardData ?? window.clipboardData).getData('text');
      for (const cleaner of Clipboard.cleaners) {
        copied = cleaner(copied);
      }

      // "Paste" the modified content
      // TODO change following lines for a call to the specific editor's API.
      const selection = window.getSelection();
      if (!selection.rangeCount) return false;
      console.log(copied);
      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(document.createTextNode(copied));

      // Don't let the browser do the pasting.
      event.preventDefault();
      return false;
    });
  }

  /**
  * Takes a string and rids it from unnecessary tags introduced by copying from Google Spreadsheets.
  *
  * Example of the text/html content of a copied cell:
  *
  * ```html
  * <html><body>
  * <!--StartFragment--><style type="text/css"><!--td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}--></style><span style="font-size:10pt;font-family:Arial;font-style:normal;" data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;$$\\frac{x+3}{y-4}$$&quot;}" data-sheets-userformat="{&quot;2&quot;:513,&quot;3&quot;:{&quot;1&quot;:0},&quot;12&quot;:0}">$$\frac{x+3}{y-4}$$</span><!--EndFragment-->
  * </body>
  * </html>
  * ```
  *
  * From this, we want to return:
  *
  *   $$\frac{x+3}{y-4}$$
  */
  static cleanGoogleSpreadsheetDebris(copied) {
    const doc = new DOMParser().parseFromString(copied, 'text/html');
    return doc.getElementsByTagName('span')[0].innerHTML;
  }
}
