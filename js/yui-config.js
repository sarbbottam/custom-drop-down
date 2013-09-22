var YUI_config = {
  //combine: true,
  groups: {
    app: {
      'modules': {
        //polyfill
        'placeholder' : {
          fullpath: '../js/polyfill/placeholder.js'
        },
        // fancy drop downs
        'country-code-drop-down-markup' : {
          fullpath: '../js/fancy-drop-down/country-code-drop-down-markup.js'
        },
        'country-code-drop-down-update-style' : {
          fullpath: '../js/fancy-drop-down/country-code-drop-down-update-style.js'
        },
        'country-code-drop-down-event-handler' : {
          fullpath: '../js/fancy-drop-down/country-code-drop-down-event-handler.js'
        },
        'country-code-drop-down-index' : {
          fullpath: '../js/fancy-drop-down/country-code-drop-down-index.js'
        },
        'country-code-drop-down' : {
          fullpath: '../js/fancy-drop-down/country-code-drop-down.js',
          requires: ['country-code-drop-down-markup', 'country-code-drop-down-update-style', 'country-code-drop-down-event-handler', 'country-code-drop-down-index']
        },
        // auto format mobile number
        'formatter' : {
          fullpath: '../js/formatter/formatter.js'
        }
      }
    }
  }
};
