YUI.add('input-data-formatter', function(Y) {

  var InputDataFormatter;

  InputDataFormatter = function(config) {
    if (typeof InputDataFormatter.instance === "object") {
      return InputDataFormatter.instance;
    }
    InputDataFormatter.instance = this;
  };

  Y.mix(InputDataFormatter.prototype, {

    keyupHandler : function(e, separatorIndex, separator){
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
    },

    formatter : function(target) {
      var value = target.get('value'),
        format = target.getAttribute('data-format'),
        formatLength = format.length,
        separator = format.match(/[^X]/g),
        separatorIndex = [],
        currentSeparatorIndex = -1;

      target.detach('keyup', this.keyupHandler);

      if(formatLength) {
        target.setAttribute('maxlength', formatLength);

        for(var i = 0, l = separator.length; i < l; i+=1) {
          currentSeparatorIndex = format.indexOf(separator[i], currentSeparatorIndex+1);
          separatorIndex.push(currentSeparatorIndex);
        }
        target.on('keyup', this.keyupHandler, null, separatorIndex, separator);
      }
      if(value !== '') {
        target.set('value', value.replace(/[^\d]/g, ''));
        this.keyupHandler.call(target, {keyCode: 48}, separatorIndex, separator);
      }
    },

    updateFormat : function(target ){
      var correspondingNode, selectedIndex, dataFormat;

      correspondingNode = Y.one('#'+target.getAttribute('corresponding-field-id'));
      selectedIndex = target.get('selectedIndex') === -1?0:target.get('selectedIndex');
      dataFormat = target.all('option').item(selectedIndex).getAttribute('corresponding-field-data-format');

      if(dataFormat) {
        correspondingNode.setAttribute('data-format', dataFormat);
      } else {
        correspondingNode.setAttribute('data-format', '');
      }
      this.formatter(correspondingNode);
    }

  }, true);

  Y.namespace('InputDataModifier');

  Y.InputDataModifier.InputDataFormatter = InputDataFormatter;

}, {requires: ['node']});
