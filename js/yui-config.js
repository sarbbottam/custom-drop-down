var YUI_config = {
  //combine: true,
  groups: {
    app: {
      'modules': {
        //polyfill
        'placeholder' : {
          fullpath: '../js/polyfill/placeholder.js'
        },
        // custom drop downs
        'custom-drop-down-markup' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-markup.js'
        },
        'custom-drop-down-style-updater' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-style-updater.js'
        },
        'custom-drop-down-index' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-index.js'
        },
        'custom-drop-down-event-handler' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-event-handler.js'
        },
        'custom-drop-down-controller' : {
          fullpath: '../js/fancy-drop-down/custom-drop-down-controller.js',
          requires: ['custom-drop-down-style-updater', 'custom-drop-down-event-handler', 'custom-drop-down-index']
        },
        // uses custom-drop-down-controller & custom-drop-down-markup
        'country-code-drop-down' : {
          fullpath: '../js/fancy-drop-down/country-code-drop-down.js'
        },
        // auto format mobile number
        'formatter' : {
          fullpath: '../js/formatter/formatter.js'
        }
      }
    }
  }
};
