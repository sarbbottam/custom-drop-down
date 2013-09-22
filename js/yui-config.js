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
        'custom-drop-down-markup' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-markup.js'
        },
        'custom-drop-down-update-style' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-update-style.js'
        },
        'custom-drop-down-event-handler' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-event-handler.js'
        },
        'custom-drop-down-index' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-index.js'
        },
        'country-code-drop-down' : {
          fullpath: '../js/fancy-drop-down/country-code-drop-down.js',
          requires: ['custom-drop-down-markup', 'custom-drop-down-update-style', 'custom-drop-down-event-handler', 'custom-drop-down-index']
        },
        // auto format mobile number
        'formatter' : {
          fullpath: '../js/formatter/formatter.js'
        }
      }
    }
  }
};
