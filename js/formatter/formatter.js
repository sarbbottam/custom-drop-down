// need to refactor
YUI.add('formatter', function(Y) {

  var keyupHandler, formatter, updateFormat;

  keyupHandler = function(e, separatorIndex, separator){
    if(e.keyCode > 47 && e.keyCode < 58) {
      var formattedValue = this.get('value'),
      formattedValueLength = formattedValue.length,
      formattedValueArray = formattedValue.split('');
      for( var i = 0, l = separatorIndex.length; i < l; i+=1 ) {
        if(separatorIndex[i] <= formattedValueLength && formattedValue.charAt(separatorIndex[i]) !== separator[i]) {
          formattedValueArray.splice(separatorIndex[i], 0, separator[i]);
          if(separator[i+1] === ' ') {
            formattedValueArray.splice(separatorIndex[i+1], 0, separator[i+1]);
            i+=1;
          }
          continue;
        }
      }
      this.set('value', formattedValueArray.join(''));
    }
  };

  formatter = function(target) {
    var value = target.get('value'),
      format = target.getAttribute('data-format'),
      formatLength = format.length,
      separator = format.match(/[^X]/g),
      separatorIndex = [],
      currentSeparatorIndex = -1;

    target.detach('keyup', keyupHandler);

    if(formatLength) {
      target.setAttribute('maxlength', formatLength);

      for(var i = 0, l = separator.length; i < l; i+=1) {
        currentSeparatorIndex = format.indexOf(separator[i], currentSeparatorIndex+1);
        separatorIndex.push(currentSeparatorIndex);
      }
      target.on('keyup', keyupHandler, null, separatorIndex, separator);
    }
    if(value !== '') {
      target.set('value', value.replace(/[^\d]/g, ''));
      keyupHandler.call(target, {keyCode: 48}, separatorIndex, separator);
    }
  };

  Y.all('[data-format]').each(function(target) {
    formatter(target);
  });

  updateFormat = function(target ){
    var mobileNode, selectedIndex, dataFormat;

    mobileNode = Y.one('#'+target.getAttribute('corresponding-field-id'));
    selectedIndex = target.get('selectedIndex') === -1?0:target.get('selectedIndex');
    dataFormat = target.all('option').item(selectedIndex).getAttribute('corresponding-field-data-format');

    if(dataFormat) {
      mobileNode.setAttribute('data-format', dataFormat);
    } else {
      mobileNode.setAttribute('data-format', '');
    }
    formatter(mobileNode);
  };

  Y.all('[data=country-code-drop-down]').each(function(target){
    updateFormat(target);
  });

  Y.on('country-code-change', function(e, target ){
    updateFormat(target);
  });

});
