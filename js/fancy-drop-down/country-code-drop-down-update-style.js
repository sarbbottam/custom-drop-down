YUI.add('country-code-drop-down-update-style', function(Y) {

  var CustomCountryCodeDropDownUpdateStyle;

  CustomCountryCodeDropDownUpdateStyle = function(referenceNodes) {
    this.selectedCountryCodeNode = referenceNodes.selectedCountryCodeNode;
    this.mobileNode = referenceNodes.mobileNode;
    this.mobileNodePlaceholder = this.mobileNode.get('parentNode').one('.placeholder');
    this.countryCodesMenuNode = referenceNodes.countryCodesMenuNode;
    this.menuHeight = '';
  };

  Y.mix(CustomCountryCodeDropDownUpdateStyle.prototype, {
    updateMobileNodePadding : function() {
      var selectedCountryCodeNodeWidth = this.selectedCountryCodeNode.get('offsetWidth');
      if(Y.one('body').getStyle('direction') === 'ltr') {
        this.mobileNode.setStyle('paddingLeft', selectedCountryCodeNodeWidth);
        if(this.mobileNodePlaceholder) {
          this.mobileNodePlaceholder.setStyle('paddingLeft', selectedCountryCodeNodeWidth);
        }
      } else {
        this.mobileNode.setStyle('paddingRight', selectedCountryCodeNodeWidth);
        if(this.mobileNodePlaceholder) {
          this.mobileNodePlaceholder.setStyle('paddingRight', selectedCountryCodeNodeWidth);
        }
      }
      this.mobileNode.setAttribute('placeholder', this.mobileNode.getAttribute('placeholder'));
    },

    highlightCountryCodeMenu : function(selectedIndex) {

      // magic numbers need to be configurable

      if(!this.menuHeight) {
        if(Y.UA.ie) {
          if(Y.UA.ie === 8) {
            this.menuHeight = parseInt(this.countryCodesMenuNode.one('ul li a').get('offsetHeight'), 0) - 0.27;
          } else{
            this.menuHeight = parseInt(this.countryCodesMenuNode.one('ul li a').get('offsetHeight'), 0) + 0.42;
          }
        } else {
          this.menuHeight = parseInt(this.countryCodesMenuNode.one('ul li a').get('offsetHeight'), 0);
        }
      }
      //console.log(selectedIndex);
      this.countryCodesMenuNode.all('ul li').item(selectedIndex).one('a').focus();
      this.countryCodesMenuNode.set('scrollTop', this.menuHeight * selectedIndex);
    }

  }, true);

  Y.namespace('CustomDropDownMenu'); // This core validation can be used across membership;

  Y.CustomDropDownMenu.CustomCountryCodeDropDownUpdateStyle = CustomCountryCodeDropDownUpdateStyle;

});
