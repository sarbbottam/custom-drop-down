YUI.add('custom-drop-down-style-updater', function(Y) {

  var CustomDropDownStyleUpdater;

  CustomDropDownStyleUpdater = function(config) {
    this.selectedOptionNode = config.referenceNodes.selectedOptionNode;
    this.correspondingNode = config.referenceNodes.correspondingNode;
    this.availableOptionsContainerNode = config.referenceNodes.availableOptionsContainerNode;

    this.correspondingNodePlaceholder = this.correspondingNode?this.correspondingNode.get('parentNode').one('.placeholder'):null;
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

      var selectedMenu = this.availableOptionsContainerNode.all('ul li').item(selectedIndex).one('a');

      selectedMenu.focus();
      selectedMenu.scrollIntoView(true);
    },

    highlightDesiredNodeBorder : function(e, desiredNode){
      desiredNode.addClass('highlight-border');
    },

    unHighlightDesiredNodeBorder : function(e, desiredNode){
      desiredNode.removeClass('highlight-border');
    }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownStyleUpdater = CustomDropDownStyleUpdater;

}, {requires : ['node']});
