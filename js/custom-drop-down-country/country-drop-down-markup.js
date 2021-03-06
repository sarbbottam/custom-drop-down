YUI.add('country-drop-down-markup', function(Y) {

  var CountryDropDownMarkup;

  CountryDropDownMarkup = function(config) {
    this.selectNode = config.target;

    this.selectedOptionId = 'selected-option-for-' + this.selectNode.get('id');
    this.availableOptionsContainerId = 'available-options-container-for-' + this.selectNode.get('id');
    this.selectedOptionAriaLabeledById = 'option-for-' + this.selectNode.get('id');

    this.optionNodes = this.selectNode.all('option');
    this.selectedIndex = this.selectNode.get('selectedIndex');

    this.correspondingNode = config.correspondingNode;

    this.ie9WidthOffset = config.ie9WidthOffset;

    this.selectNodeWidth = '';
    this.selectedOptionNode = '';
    this.availableOptionsContainerNode = '';
    this.selectedOptionHTML = [];
    this.availableOptionsHTML = [];
  };

  Y.mix(CountryDropDownMarkup.prototype, {
    createAndInjectSelectedOptionHTML : function() {
      var selectedOptionHTML = this.selectedOptionHTML,
        optionNodes = this.optionNodes,
        selectedIndex = this.selectedIndex,
        ariaLabelledby = Y.one('#'+this.selectNode.getAttribute('aria-labelledby')).get('innerHTML'),
        selectedItemText = optionNodes.item(selectedIndex).get('innerHTML'),
        ariaLabel = selectedItemText + ' ' + ariaLabelledby;
        selectedOptionHTML.push('<div id="'+ this.selectedOptionId +'" class="column selected-country selected-option">');
          selectedOptionHTML.push('<a href="#'+ this.availableOptionsContainerId + '" role="button" aria-haspopup="true" aria-label="'+ ariaLabel +'">');

            selectedOptionHTML.push('<span class="flag-');
            selectedOptionHTML.push(optionNodes.item(selectedIndex).getAttribute('country-tld'));
            selectedOptionHTML.push('"></span>&nbsp;&nbsp;');
            selectedOptionHTML.push(optionNodes.item(selectedIndex).get('value'));
            selectedOptionHTML.push('<span class="country-arrow-container drop-down-arrow-container"><span class="country-arrow drop-down-arrow"></span></span>');

          selectedOptionHTML.push('</a>');
        selectedOptionHTML.push('</div>');

        selectedOptionHTML = selectedOptionHTML.join('');

        this.selectNode.get('parentNode').insertBefore(selectedOptionHTML, this.selectNode);

        this.selectedOptionNode = Y.one('#' + this.selectedOptionId);

        // magic number is passed as configuration
        this.selectNodeWidth = this.selectNode.get('offsetWidth');

        if(Y.UA.ie === 9) {
          this.selectNodeWidth = this.selectNodeWidth + this.ie9WidthOffset + 'px';
        } else {
          this.selectNodeWidth = this.selectNodeWidth+ 'px';
        }

        return this.createAndInjectAvailableOptionsHTML();
      },

    createAndInjectAvailableOptionsHTML : function() {
      var availableOptionsHTML = this.availableOptionsHTML;
        availableOptionsHTML.push('<div class="countries-container available-options-container" id="'+ this.availableOptionsContainerId +'" style="width:'+ this.selectNodeWidth+'">');
          availableOptionsHTML.push('<ul role="menu">');
            this.optionNodes.each(function(option) {
              availableOptionsHTML.push('<li role="presentation">');
                availableOptionsHTML.push('<a href="#" role="menuitem" data-code="' + option.get('value') + '">');
                  availableOptionsHTML.push('<span class="flag-');
                  availableOptionsHTML.push(option.getAttribute('country-tld'));
                  availableOptionsHTML.push('"></span>&nbsp;&nbsp;');
                  availableOptionsHTML.push(option.get('innerHTML'));
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
      },

      getSelectedOptionHTML : function(selectedOption) {
        var optionText = selectedOption.getAttribute('data-code'), html = [], selectedIndex;

        html.push('<span class="');
        html.push(selectedOption.one('span').get('className'));
        html.push('"></span>&nbsp;&nbsp;');
        html.push('<span id="'+ this.selectedOptionAriaLabeledById +'" class="clipped"></span>');
        html.push(optionText);
        html.push('<span class="country-arrow-container drop-down-arrow-container"><span class="country-arrow drop-down-arrow"></span></span>');

        return html.join('');
      }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CountryDropDownMarkup = CountryDropDownMarkup;

});
