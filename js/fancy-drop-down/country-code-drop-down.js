YUI.add('country-code-drop-down', function(Y) {

  var countryCodesContainer;

  if (Y.one('html').hasClass('modern')) {
    var customCountryCodeDropDown;

    // create a constructor and pass the desired information / magic numbers
    customCountryCodeDropDown = function(target) {
      var customDropDownMarkup,
        customDropDownUpdateStyle,
        customDropDownEventHandler,
        customDropDownIndex,
        referenceNodes;

      customDropDownMarkup = new Y.CustomDropDownMenu.CustomDropDownMarkup(target);
      referenceNodes = customDropDownMarkup.createAndInjectSelectedCountryCodeHTML();

      customDropDownUpdateStyle = new Y.CustomDropDownMenu.CustomDropDownUpdateStyle(referenceNodes);
      // if correspondig field is present
      customDropDownUpdateStyle.updateCorrespondingNodePadding();

      customDropDownIndex = new Y.CustomDropDownMenu.CustomDropDownIndex(referenceNodes);
      customDropDownIndex.init();

      // pass as a single argument
      customDropDownEventHandler = new Y.CustomDropDownMenu.CustomDropDownEventHandler(referenceNodes, customDropDownUpdateStyle, customDropDownIndex);
      customDropDownEventHandler.init();
    };

    Y.all('[custom-drop-down-type=country-code]').each(function(target){
      // invoke the ToDo constructor from the use file
      customCountryCodeDropDown(target);
    });

    hideAllAvailableOptionsContainer = function(currentOptionsContainer){
      Y.all('.available-options-container').each(function(target){
        if(target !== currentOptionsContainer && target.getStyle('display') === 'block') {
          target.setStyle('display', 'none');
        }
      });
    };

    Y.on('click', hideAllAvailableOptionsContainer, 'body');
    Y.on('hide-available-options-container', function(e, availableOptionsContainerNode) {
      hideAllAvailableOptionsContainer(availableOptionsContainerNode);
    });
  }
}, {requires: ['custom-drop-down-markup', 'custom-drop-down-update-style', 'custom-drop-down-event-handler', 'custom-drop-down-index']});
