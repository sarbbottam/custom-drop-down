YUI.add('country-code-drop-down', function(Y) {

  var countryCodesContainer;

  if (Y.one('html').hasClass('modern')) {
    var customCountryCodeDropDown;

    customCountryCodeDropDown = function(target) {
      var customCountryCodeDropDownMarkup,
        customCountryCodeDropDownUpdateStyle,
        customCountryCodeDropDownEventHandler,
        customCountryCodeDropDownIndex,
        referenceNodes;

      customCountryCodeDropDownMarkup = new Y.CustomDropDownMenu.CustomCountryCodeDropDownMarkup(target);
      referenceNodes = customCountryCodeDropDownMarkup.createAndInjectSelectedCountryCodeHTML();

      customCountryCodeDropDownUpdateStyle = new Y.CustomDropDownMenu.CustomCountryCodeDropDownUpdateStyle(referenceNodes);
      customCountryCodeDropDownUpdateStyle.updateMobileNodePadding();

      customCountryCodeDropDownIndex = new Y.CustomDropDownMenu.CustomCountryCodeDropDownIndex(referenceNodes);

      customCountryCodeDropDownIndex.init();

      customCountryCodeDropDownEventHandler = new Y.CustomDropDownMenu.CustomCountryCodeDropDownEventHandler(referenceNodes, customCountryCodeDropDownUpdateStyle, customCountryCodeDropDownIndex);

      customCountryCodeDropDownEventHandler.init();
    };

    Y.all('[data=country-code-drop-down]').each(function(target){
      customCountryCodeDropDown(target);
    });

    countryCodesContainer = Y.all('.country-codes-container');

    hideCountryCodesContainer = function(currentContainer){
      countryCodesContainer.each(function(target){
        if(target !== currentContainer && target.getStyle('display') === 'block') {
          target.setStyle('display', 'none');
        }
      });
    };

    Y.on('click', hideCountryCodesContainer, 'body');
    Y.on('hide-country-codes-container', function(e, countryCodesMenuNode) {
      hideCountryCodesContainer(countryCodesMenuNode);
    });
  }
}, {requires: ['country-code-drop-down-markup', 'country-code-drop-down-update-style', 'country-code-drop-down-event-handler', 'country-code-drop-down-index']});
