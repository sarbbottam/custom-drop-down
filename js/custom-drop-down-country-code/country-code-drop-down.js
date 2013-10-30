YUI.add('country-code-drop-down', function(Y) {

  if (Y.one('html').hasClass('modern')) {
    var countryCodeDropDownCss;

    if(Y.one('body').getStyle('direction') === 'ltr') {
      countryCodeDropDownCss = 'country-code-drop-down-ltr-css';
    } else {
      countryCodeDropDownCss = 'country-code-drop-down-rtl-css';
    }
    Y.use('custom-drop-down-controller', 'country-code-drop-down-markup', countryCodeDropDownCss, function(Y){

      Y.all('[custom-drop-down-type=country-code]').each(function(target) {
        var CustomDropDownMarkup = Y.CustomDropDownMenu.CountryCodeDropDownMarkup,
          customDropDownController = new Y.CustomDropDownMenu.CustomDropDownController({
                                        target : target,
                                        ie9WidthOffset : 17,
                                        CustomDropDownMarkup : CustomDropDownMarkup
                                      });
        customDropDownController.init();
      });

    });
  }
});
