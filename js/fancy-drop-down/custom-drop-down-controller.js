YUI.add('custom-drop-down-controller', function(Y) {

  var CustomDropDownController;

  CustomDropDownController = function(config) {
    this.target = config.target;
    this.ie9WidthOffset = config.ie9WidthOffset;
    this.correspondingNode = '';
    this.CustomDropDownMarkup = config.CustomDropDownMarkup;
    this.CustomDropDownUpdateStyle = config.CustomDropDownUpdateStyle;
    this.CustomDropDownEventHandler = config.CustomDropDownEventHandler;
    this.CustomDropDownIndex = config.CustomDropDownIndex;
    this.referenceNodes = '';
  };

  Y.mix(CustomDropDownController.prototype, {

    init : function() {
      var _this = this,
        customDropDownMarkup,
        customDropDownUpdateStyle,
        customDropDownEventHandler,
        customDropDownIndex,
        referenceNodes;

      this.correspondingNode = Y.one('#'+target.getAttribute('corresponding-field-id'));
      customDropDownMarkup = new this.CustomDropDownMarkup(this.target, this.ie9WidthOffset);
      this.referenceNodes = customDropDownMarkup.createAndInjectSelectedCountryCodeHTML();

      customDropDownUpdateStyle = new this.CustomDropDownUpdateStyle(referenceNodes);



      customDropDownUpdateStyle = new Y.CustomDropDownMenu.CustomDropDownUpdateStyle(referenceNodes);
      // if correspondig field is present
      this.correspondingNode && customDropDownUpdateStyle.updateCorrespondingNodePadding();

      customDropDownIndex = new this.CustomDropDownIndex(referenceNodes);
      customDropDownIndex.init();

      // pass as a single argument
      customDropDownEventHandler = new this.CustomDropDownEventHandler(referenceNodes, customDropDownUpdateStyle, customDropDownIndex);
      customDropDownEventHandler.init();
    };
    }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownController = CustomDropDownController;

});
