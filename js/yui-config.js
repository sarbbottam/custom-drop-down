var YUI_config = {
  //combine: true,
  groups: {
    app: {
      'modules': {
        //polyfill
        'placeholder' : {
          fullpath: '../js/polyfill/placeholder.js',
          requires: ['node']
        },
        // custom drop down core
        'custom-drop-down-style-updater' : {
          fullpath: '../js/custom-drop-down-core/custom-drop-down-style-updater.js',
          requires: ['node']
        },
        'custom-drop-down-index' : {
          fullpath: '../js/custom-drop-down-core/custom-drop-down-index.js',
          requires: ['node']
        },
        'custom-drop-down-event-handler' : {
          fullpath: '../js/custom-drop-down-core/custom-drop-down-event-handler.js',
          requires: ['node']
        },
        'custom-drop-down-controller' : {
          fullpath: '../js/custom-drop-down-core/custom-drop-down-controller.js',
          requires: ['node', 'custom-drop-down-style-updater', 'custom-drop-down-event-handler', 'custom-drop-down-index']
        },
        // custom drop down country code css
        'country-code-drop-down-ltr-css' : {
          fullpath: '../css/country-code-drop-down-ltr.css',
          type : 'css'
        },
        'country-code-drop-down-rtl-css' : {
          fullpath: '../css/country-code-drop-down-rtl.css',
          type : 'css'
        },
        // custom drop down country code
        'country-code-drop-down-markup' : {
          fullpath: '../js/custom-drop-down-country-code/country-code-drop-down-markup.js'
        },
        'country-code-drop-down' : { // uses custom-drop-down-controller & custom-drop-down-markup
          fullpath: '../js/custom-drop-down-country-code/country-code-drop-down.js'
        },
        // input data formatter
        'input-data-formatter' : {
          fullpath: '../js/input-data-modifier/input-data-formatter.js'
        },
        // mobile number formatter
        'mobile-number-formatter' : {
          fullpath: '../js/mobile-number-modifier/mobile-number-formatter.js'
        }
      }
    }
  }
};
