YUI.add('country-code-drop-down-markup', function(Y) {

  var CustomCountryCodeDropDownMarkup;

  CustomCountryCodeDropDownMarkup = function(target) {
    this.countryCodeSelectNode = target;
    this.selectedCountryCodeHTML = [];
    this.countryCodesMenuHTML = [];
    this.selectedCountryCodeId = 'selected-country-code-for-' + target.getAttribute('mobile-field-id');
    this.countryCodesMenuId = 'country-codes-menu-for-' + target.getAttribute('mobile-field-id');
    this.countryCodeOptionNodes = target.all('option');
    this.selectedIndex = target.get('selectedIndex');
    this.mobileNode = Y.one('#'+target.getAttribute('mobile-field-id'));
    this.mobileNodeWidth = '';
    this.selectedCountryCodeNode = '';
    this.countryCodesMenuNode = '';
  };

  Y.mix(CustomCountryCodeDropDownMarkup.prototype, {
    createAndInjectSelectedCountryCodeHTML : function() {
      var selectedCountryCodeHTML = this.selectedCountryCodeHTML,
        countryCodeOptionNodes = this.countryCodeOptionNodes,
        selectedIndex = this.selectedIndex;
        selectedCountryCodeHTML.push('<div id="'+ this.selectedCountryCodeId +'" class="column selected-country-code">');
          selectedCountryCodeHTML.push('<a href="#'+ this.countryCodesMenuId + '" role="menuitem" aria-haspopup="true" aria-labelledby="country-name" tabindex="0">');

            selectedCountryCodeHTML.push('<span class="flag-');
            selectedCountryCodeHTML.push(countryCodeOptionNodes.item(selectedIndex).getAttribute('data-country-code'));
            selectedCountryCodeHTML.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;');
            selectedCountryCodeHTML.push('<span id="country-name" class="clipped">'+ countryCodeOptionNodes.item(selectedIndex).get('innerHTML')+'</span>');
            selectedCountryCodeHTML.push(countryCodeOptionNodes.item(selectedIndex).get('value'));

          selectedCountryCodeHTML.push('</a>');
        selectedCountryCodeHTML.push('</div>');

        selectedCountryCodeHTML = selectedCountryCodeHTML.join('');

        this.mobileNode.get('parentNode').insertBefore(selectedCountryCodeHTML, this.mobileNode.get('parentNode').one('label'));

        this.selectedCountryCodeNode = Y.one('#' + this.selectedCountryCodeId);

        // magic number needs to be configurable

        if(Y.UA.ie === 9) {
          this.mobileNodeWidth = this.mobileNode.get('offsetWidth') + 17 + 'px';
        } else {
          this.mobileNodeWidth = this.mobileNode.get('offsetWidth')+ 'px';
        }

        return this.createAndInjectCountryCodesHTML();
      },

    createAndInjectCountryCodesHTML : function() {
      var countryCodesMenuHTML = this.countryCodesMenuHTML;
        countryCodesMenuHTML.push('<div class="country-codes-container" id="'+ this.countryCodesMenuId +'" style="width:'+ this.mobileNodeWidth+'">');
          countryCodesMenuHTML.push('<ul>');
            this.countryCodeOptionNodes.each(function(countryCodeOption) {
              countryCodesMenuHTML.push('<li>');
                countryCodesMenuHTML.push('<a href="#" role="menuitem" data-code="' + countryCodeOption.get('value') + '">');
                  countryCodesMenuHTML.push('<span class="flag-');
                  countryCodesMenuHTML.push(countryCodeOption.getAttribute('data-country-code'));
                  countryCodesMenuHTML.push('"></span>&nbsp;&nbsp;');
                  countryCodesMenuHTML.push(countryCodeOption.get('innerHTML'));
                countryCodesMenuHTML.push('</a>');
              countryCodesMenuHTML.push('</li>');
            });
          countryCodesMenuHTML.push('</ul>');
        countryCodesMenuHTML.push('</div>');

        countryCodesMenuHTML = countryCodesMenuHTML.join('');

        this.selectedCountryCodeNode.append(countryCodesMenuHTML);

        this.countryCodeSelectNode.hide();

        this.countryCodesMenuNode = Y.one('#' + this.countryCodesMenuId);
        return {
          countryCodeSelectNode : this.countryCodeSelectNode,
          selectedCountryCodeNode : this.selectedCountryCodeNode,
          mobileNode : this.mobileNode,
          countryCodesMenuNode : this.countryCodesMenuNode
        };
      }

  }, true);

  Y.namespace('CustomDropDownMenu'); // This core validation can be used across membership;

  Y.CustomDropDownMenu.CustomCountryCodeDropDownMarkup = CustomCountryCodeDropDownMarkup;

});
