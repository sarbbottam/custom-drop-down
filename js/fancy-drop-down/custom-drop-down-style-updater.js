YUI.add('custom-drop-down-style-updater', function(Y) {

  var CustomDropDownStyleUpdater;

  CustomDropDownStyleUpdater = function(config) {
    this.selectedOptionNode = config.referenceNodes.selectedOptionNode;
    this.correspondingNode = config.referenceNodes.correspondingNode;
    this.availableOptionsContainerNode = config.referenceNodes.availableOptionsContainerNode;

    this.ie8HeightOffset = config.ie8HeightOffset;
    this.ie8AboveHeightOffset = config.ie8AboveHeightOffset;

    this.correspondingNodePlaceholder = this.correspondingNode.get('parentNode').one('.placeholder');

    this.menuHeight = '';
  };

  Y.mix(CustomDropDownStyleUpdater.prototype, {
    updateCorrespondingNodePadding : function() {
      var selectedOptionNodeWidth = this.selectedOptionNode.get('offsetWidth');
      if(Y.one('body').getStyle('direction') === 'ltr') {
        this.correspondingNode.setStyle('paddingLeft', selectedOptionNodeWidth);
        if(this.correspondingNodePlaceholder) {
          this.correspondingNodePlaceholder.setStyle('paddingLeft', selectedOptionNodeWidth);
        }
      } else {
        this.correspondingNode.setStyle('paddingRight', selectedOptionNodeWidth);
        if(this.correspondingNodePlaceholder) {
          this.correspondingNodePlaceholder.setStyle('paddingRight', selectedOptionNodeWidth);
        }
      }
      this.correspondingNode.setAttribute('placeholder', this.correspondingNode.getAttribute('placeholder'));
    },

    highlightMenu : function(selectedIndex) {

      // magic number is passed as configuration
      if(!this.menuHeight) {
        this.menuHeight = parseInt(this.availableOptionsContainerNode.one('ul li a').get('offsetHeight'), 0);
        if(Y.UA.ie) {
          if(Y.UA.ie === 8) {
            this.menuHeight = this.menuHeight + this.ie8HeightOffset;
          } else{
            this.menuHeight = this.menuHeight + this.ie8AboveHeightOffset;
          }
        }
      }

      this.availableOptionsContainerNode.all('ul li').item(selectedIndex).one('a').focus();
      this.availableOptionsContainerNode.set('scrollTop', this.menuHeight * selectedIndex);
    }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownStyleUpdater = CustomDropDownStyleUpdater;

});
