YUI.add('custom-drop-down-controller', function(Y) {

  var CustomDropDownController;

  CustomDropDownController = function(config) {
    this.target = config.target;
    this.ie9WidthOffset = config.ie9WidthOffset || 0;
    this.CustomDropDownMarkup = config.CustomDropDownMarkup;

    this.CustomDropDownStyleUpdater = Y.CustomDropDownMenu.CustomDropDownStyleUpdater;
    this.CustomDropDownIndex = Y.CustomDropDownMenu.CustomDropDownIndex;
    this.CustomDropDownEventHandler = Y.CustomDropDownMenu.CustomDropDownEventHandler;

    this.customDropDownMarkup = '';
    this.customDropDownStyleUpdater = '';
    this.customDropDownIndex = '';
    this.customDropDownEventHandler = '';

    this.referenceNodes = '';
    this.correspondingNode = '';
  };

  Y.mix(CustomDropDownController.prototype, {

    hideAllAvailableOptionsContainer : function(currentOptionsContainer){
      Y.all('.available-options-container').each(function(target){
        if(target !== currentOptionsContainer && target.getStyle('display') === 'block') {
          target.setStyle('display', 'none');
        }
      });
    },

    init : function() {

      var _this = this;

      this.correspondingNode = Y.one('#'+ this.target.getAttribute('corresponding-field-id'));
      this.customDropDownMarkup = new this.CustomDropDownMarkup({
                              target : this.target,
                              correspondingNode: this.correspondingNode,
                              ie9WidthOffset: this.ie9WidthOffset
                            });

      this.referenceNodes = this.customDropDownMarkup.createAndInjectSelectedOptionHTML();

      this.customDropDownStyleUpdater = new this.CustomDropDownStyleUpdater({
                                    referenceNodes : this.referenceNodes
                                  });

      // if correspondig node is present
      this.correspondingNode && this.customDropDownStyleUpdater.updateCorrespondingNodePadding();

      this.customDropDownIndex = new this.CustomDropDownIndex(this.referenceNodes);
      this.customDropDownIndex.init();

      this.customDropDownEventHandler = new this.CustomDropDownEventHandler({
                                    referenceNodes : this.referenceNodes,
                                    customDropDownMarkup : this.customDropDownMarkup,
                                    customDropDownStyleUpdater : this.customDropDownStyleUpdater,
                                    customDropDownIndex : this.customDropDownIndex
                                  });

      this.customDropDownEventHandler.init();

      Y.on('click', this.hideAllAvailableOptionsContainer, 'body');

      Y.on('hide-available-options-container', function(e, availableOptionsContainerNode) {
        _this.hideAllAvailableOptionsContainer(availableOptionsContainerNode);
      });

    }
  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownController = CustomDropDownController;

}, {requires: ['node', 'custom-drop-down-style-updater', 'custom-drop-down-event-handler', 'custom-drop-down-index']});
