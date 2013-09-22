YUI.add('custom-drop-down-markup', function(Y) {

  var CustomDropDownMarkup;

  CustomDropDownMarkup = function(target) {
    this.selectNode = target;
    this.selectedOptionHTML = [];
    this.availableOptionsHTML = [];
    this.selectedOptionId = 'selected-option-for-' + target.getAttribute('mobile-field-id');
    this.availableOptionsContainerId = 'available-options-container-for-' + target.getAttribute('mobile-field-id');
    this.selectedOptionAriaLabeledById = 'option-for-' + target.getAttribute('mobile-field-id');
    this.optionNodes = target.all('option');
    this.selectedIndex = target.get('selectedIndex');
    this.correspondingNode = Y.one('#'+target.getAttribute('mobile-field-id'));
    this.correspondingNodeWidth = '';
    this.selectedOptionNode = '';
    this.availableOptionsContainerNode = '';
  };

  Y.mix(CustomDropDownMarkup.prototype, {
    createAndInjectSelectedCountryCodeHTML : function() {
      var selectedOptionHTML = this.selectedOptionHTML,
        optionNodes = this.optionNodes,
        selectedIndex = this.selectedIndex;
        selectedOptionHTML.push('<div id="'+ this.selectedOptionId +'" class="column selected-country-code">');
          selectedOptionHTML.push('<a href="#'+ this.availableOptionsContainerId + '" role="menuitem" aria-haspopup="true" aria-labelledby="'+ this.selectedOptionAriaLabeledById +'" tabindex="0">');

            selectedOptionHTML.push('<span class="flag-');
            selectedOptionHTML.push(optionNodes.item(selectedIndex).getAttribute('data-country-code'));
            selectedOptionHTML.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;');
            selectedOptionHTML.push('<span id="'+ this.selectedOptionAriaLabeledById +'" class="clipped">'+ optionNodes.item(selectedIndex).get('innerHTML')+'</span>');
            selectedOptionHTML.push(optionNodes.item(selectedIndex).get('value'));

          selectedOptionHTML.push('</a>');
        selectedOptionHTML.push('</div>');

        selectedOptionHTML = selectedOptionHTML.join('');

        this.correspondingNode.get('parentNode').insertBefore(selectedOptionHTML, this.correspondingNode.get('parentNode').one('label'));

        this.selectedOptionNode = Y.one('#' + this.selectedOptionId);

        // magic number needs to be configurable

        if(Y.UA.ie === 9) {
          this.correspondingNodeWidth = this.correspondingNode.get('offsetWidth') + 17 + 'px';
        } else {
          this.correspondingNodeWidth = this.correspondingNode.get('offsetWidth')+ 'px';
        }

        return this.createAndInjectCountryCodesHTML();
      },

    createAndInjectCountryCodesHTML : function() {
      var availableOptionsHTML = this.availableOptionsHTML;
        availableOptionsHTML.push('<div class="country-codes-container" id="'+ this.availableOptionsContainerId +'" style="width:'+ this.correspondingNodeWidth+'">');
          availableOptionsHTML.push('<ul>');
            this.optionNodes.each(function(countryCodeOption) {
              availableOptionsHTML.push('<li>');
                availableOptionsHTML.push('<a href="#" role="menuitem" data-code="' + countryCodeOption.get('value') + '">');
                  availableOptionsHTML.push('<span class="flag-');
                  availableOptionsHTML.push(countryCodeOption.getAttribute('data-country-code'));
                  availableOptionsHTML.push('"></span>&nbsp;&nbsp;');
                  availableOptionsHTML.push(countryCodeOption.get('innerHTML'));
                availableOptionsHTML.push('</a>');
              availableOptionsHTML.push('</li>');
            });
          availableOptionsHTML.push('</ul>');
        availableOptionsHTML.push('</div>');

        availableOptionsHTML = availableOptionsHTML.join('');

        this.selectedOptionNode.append(availableOptionsHTML);

        this.selectNode.hide();

        this.availableOptionsContainerNode = Y.one('#' + this.availableOptionsContainerId);
        return {
          selectNode : this.selectNode,
          optionNodes : this.optionNodes,
          selectedOptionNode : this.selectedOptionNode,
          correspondingNode : this.correspondingNode,
          availableOptionsContainerNode : this.availableOptionsContainerNode,
          selectedOptionAriaLabeledById : this.selectedOptionAriaLabeledById
        };
      }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownMarkup = CustomDropDownMarkup;

});
