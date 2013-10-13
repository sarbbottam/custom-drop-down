YUI.add('mobile-number-formatter', function(Y) {

  Y.use('input-data-formatter', function(Y){

    var inputDataFormatter = new Y.InputDataModifier.InputDataFormatter({maxLength: 15});

    Y.all('[data-format]').each(function(target) {
      inputDataFormatter.formatter(target);
    });

    Y.all('[custom-drop-down-type=country-code]').each(function(target){
      inputDataFormatter.updateFormat(target);
    });

    Y.on('change', function(e) {
      inputDataFormatter.updateFormat(e.target);
      var correspondingField = Y.one('#'+e.target.getAttribute('corresponding-field-id'));
      if(correspondingField.get('value') !== "") {
        correspondingField.simulate("blur");
      }
    }, '[custom-drop-down-type=country-code]');

  });

});
