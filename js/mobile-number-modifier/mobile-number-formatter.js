YUI.add('mobile-number-formatter', function(Y) {

  Y.use('input-data-formatter', function(Y){

    var inputDataFormatter = new Y.InputDataModifier.InputDataFormatter();

    Y.all('[data-format]').each(function(target) {
      inputDataFormatter.formatter(target);
    });

    Y.all('[custom-drop-down-type=country-code]').each(function(target){
      inputDataFormatter.updateFormat(target);
    });

    Y.on('option-changed', function(e, target ){
      inputDataFormatter.updateFormat(target);
    });

  });

});