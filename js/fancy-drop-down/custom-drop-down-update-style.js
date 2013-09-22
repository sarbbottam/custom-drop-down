YUI.add('custom-drop-down-update-style', function(Y) {

  var CustomDropDownUpdateStyle;

  CustomDropDownUpdateStyle = function(referenceNodes) {
    this.selectedOptionNode = referenceNodes.selectedOptionNode;
    this.correspondingNode = referenceNodes.correspondingNode;
    this.correspondingNodePlaceholder = this.correspondingNode.get('parentNode').one('.placeholder');
    this.availableOptionsContainerNode = referenceNodes.availableOptionsContainerNode;
    this.menuHeight = '';
  };

  Y.mix(CustomDropDownUpdateStyle.prototype, {
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

      // magic numbers need to be configurable

      if(!this.menuHeight) {
        if(Y.UA.ie) {
          if(Y.UA.ie === 8) {
            this.menuHeight = parseInt(this.availableOptionsContainerNode.one('ul li a').get('offsetHeight'), 0) - 0.27;
          } else{
            this.menuHeight = parseInt(this.availableOptionsContainerNode.one('ul li a').get('offsetHeight'), 0) + 0.42;
          }
        } else {
          this.menuHeight = parseInt(this.availableOptionsContainerNode.one('ul li a').get('offsetHeight'), 0);
        }
      }
      //console.log(selectedIndex);
      this.availableOptionsContainerNode.all('ul li').item(selectedIndex).one('a').focus();
      this.availableOptionsContainerNode.set('scrollTop', this.menuHeight * selectedIndex);
    }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownUpdateStyle = CustomDropDownUpdateStyle;

});
