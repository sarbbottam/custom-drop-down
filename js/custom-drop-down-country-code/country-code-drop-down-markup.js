YUI.add('country-code-drop-down-markup', function(Y) {

  var CountryCodeDropDownMarkup;

  CountryCodeDropDownMarkup = function(config) {
    this.selectNode = config.target;

    this.selectedOptionId = 'selected-option-for-' + this.selectNode.get('id');
    this.availableOptionsContainerId = 'available-options-container-for-' + this.selectNode.get('id');
    this.selectedOptionAriaLabeledById = 'option-for-' + this.selectNode.get('id');

    this.optionNodes = this.selectNode.all('option');
    this.selectedIndex = this.selectNode.get('selectedIndex');

    this.correspondingNode = config.correspondingNode;

    this.ie9WidthOffset = config.ie9WidthOffset;

    this.correspondingNodeWidth = '';
    this.selectedOptionNode = '';
    this.availableOptionsContainerNode = '';
    this.selectedOptionHTML = [];
    this.availableOptionsHTML = [];

    this.correspondingNodePlaceholder = this.correspondingNode?this.correspondingNode.get('parentNode').one('.placeholder'):null;
  };

  Y.mix(CountryCodeDropDownMarkup.prototype, {
    createAndInjectSelectedOptionHTML : function() {
      var selectedOptionHTML = this.selectedOptionHTML,
        optionNodes = this.optionNodes,
        selectedIndex = this.selectedIndex;
        selectedOptionHTML.push('<div id="'+ this.selectedOptionId +'" class="column selected-country-code selected-option">');
          //selectedOptionHTML.push('<a href="#'+ this.availableOptionsContainerId + '" role="button" aria-haspopup="true" aria-labelledby="'+ this.selectedOptionAriaLabeledById +'">');
          selectedOptionHTML.push('<a href="#'+ this.availableOptionsContainerId + '" role="button" aria-haspopup="true" aria-label="'+ optionNodes.item(selectedIndex).get('innerHTML') + ' ' + this.selectNode.getAttribute('aria-label') +'">');
            selectedOptionHTML.push('<span class="flag-');
            selectedOptionHTML.push(optionNodes.item(selectedIndex).getAttribute('country-tld'));
            selectedOptionHTML.push('"></span>&nbsp;<span class="country-code-arrow-container drop-down-arrow-container"><span class="country-code-arrow drop-down-arrow"></span></span>&nbsp;');
            //selectedOptionHTML.push('<span id="'+ this.selectedOptionAriaLabeledById +'" class="clipped">'+ optionNodes.item(selectedIndex).get('innerHTML')+'</span>');
            selectedOptionHTML.push(optionNodes.item(selectedIndex).get('value'));

          selectedOptionHTML.push('</a>');
        selectedOptionHTML.push('</div>');

        selectedOptionHTML = selectedOptionHTML.join('');

        if(this.correspondingNodePlaceholder) {
          this.correspondingNode.get('parentNode').insertBefore(selectedOptionHTML, this.correspondingNodePlaceholder);
        } else {
          this.correspondingNode.get('parentNode').insertBefore(selectedOptionHTML, this.correspondingNode);
        }

        this.selectedOptionNode = Y.one('#' + this.selectedOptionId);

        // magic number is passed as configuration
        this.correspondingNodeWidth = this.correspondingNode.get('offsetWidth');

        if(Y.UA.ie === 9) {
          this.correspondingNodeWidth = this.correspondingNodeWidth + this.ie9WidthOffset + 'px';
        } else {
          this.correspondingNodeWidth = this.correspondingNodeWidth+ 'px';
        }

        return this.createAndInjectAvailableOptionsHTML();
      },

    createAndInjectAvailableOptionsHTML : function() {
      var availableOptionsHTML = this.availableOptionsHTML;
        availableOptionsHTML.push('<div class="country-codes-container available-options-container" id="'+ this.availableOptionsContainerId +'" style="width:'+ this.correspondingNodeWidth+'">');
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
        html.push('"></span>&nbsp;<span class="country-code-arrow-container drop-down-arrow-container"><span class="country-code-arrow drop-down-arrow"></span></span>&nbsp;');
        html.push('<span id="'+ this.selectedOptionAriaLabeledById +'" class="clipped"></span>');
        html.push(optionText);

        return html.join('');
      }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CountryCodeDropDownMarkup = CountryCodeDropDownMarkup;

});
