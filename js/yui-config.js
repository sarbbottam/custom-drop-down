var YUI_config = {
  combine: true,
  groups: {
    app: {
      'modules': {
        //polyfill
        'placeholder' : {
          fullpath: '../js/polyfill/placeholder.js'
        },
        // fancy drop downs
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
