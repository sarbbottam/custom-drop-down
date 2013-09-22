YUI.add('country-code-drop-down', function(Y) {

  var countryCodesContainer;

  if (Y.one('html').hasClass('modern')) {
    var customCountryCodeDropDown;

    customCountryCodeDropDown = function(target) {
      var customDropDownMarkup,
        customDropDownUpdateStyle,
        customDropDownEventHandler,
        customDropDownIndex,
        referenceNodes;

      customDropDownMarkup = new Y.CustomDropDownMenu.CustomDropDownMarkup(target);
      referenceNodes = customDropDownMarkup.createAndInjectSelectedCountryCodeHTML();

      customDropDownUpdateStyle = new Y.CustomDropDownMenu.CustomDropDownUpdateStyle(referenceNodes);
      customDropDownUpdateStyle.updateCorrespondingNodePadding();

      customDropDownIndex = new Y.CustomDropDownMenu.CustomDropDownIndex(referenceNodes);

      customDropDownIndex.init();

      customDropDownEventHandler = new Y.CustomDropDownMenu.CustomDropDownEventHandler(referenceNodes, customDropDownUpdateStyle, customDropDownIndex);

      customDropDownEventHandler.init();
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
    Y.on('hide-available-options-container', function(e, countryCodesMenuNode) {
      hideCountryCodesContainer(countryCodesMenuNode);
    });
  }
}, {requires: ['custom-drop-down-markup', 'custom-drop-down-update-style', 'custom-drop-down-event-handler', 'custom-drop-down-index']});
