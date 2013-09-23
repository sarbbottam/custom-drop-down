YUI.add('country-code-drop-down', function(Y) {

  if (Y.one('html').hasClass('modern')) {

    Y.use('custom-drop-down-controller', 'custom-drop-down-markup', function(Y){

      Y.all('[custom-drop-down-type=country-code]').each(function(target) {
        var CustomDropDownMarkup = Y.CustomDropDownMenu.CustomDropDownMarkup,
          customDropDownController = new Y.CustomDropDownMenu.CustomDropDownController({
                                        target : target,
                                        ie9WidthOffset : 17,
                                        ie8HeightOffset : -0.27,
                                        ie8AboveHeightOffset : 0.42,
                                        CustomDropDownMarkup : CustomDropDownMarkup
                                      });
        customDropDownController.init();
      });

    });
  }
});
