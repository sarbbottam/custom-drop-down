YUI.add('input-data-formatter', function(Y) {

  var InputDataFormatter;

  InputDataFormatter = function(config) {
    if (typeof InputDataFormatter.instance === "object") {
      return InputDataFormatter.instance;
    }
    InputDataFormatter.instance = this;
  };

  Y.mix(InputDataFormatter.prototype, {

    getSepatarorPattern : function(separator) {
      var separatorPattern = '(';
      for ( var index = 0, length = separator.length; index < length; index += 1 ) {
        if(index > 0) {
          separatorPattern = separatorPattern + '|';
        }
        separatorPattern = separatorPattern + '\\' + separator[index];
      }
      separatorPattern = separatorPattern + ')';
      return separatorPattern;
    },

    keypressHandler : function(e, separatorIndex, separator, separatorPattern){
      var caretIndex = this.get('selectionStart'),
        value = this.get('value'),
        valueLength = value.length,
        unFormattedValue = value.replace(separatorPattern, ''),
        unFormattedValueArray = unFormattedValue.split(''),
        autoFormatEnabled = true;

      autoFormatEnabled = Y.Array.indexOf([8, 37, 38, 39, 40], e.keyCode) === -1? true: false;

      if(autoFormatEnabled) {
        for( var i = 0, l = separatorIndex.length; i < l; i+=1 ) {
          if(separatorIndex[i] <= valueLength) {

            if(unFormattedValueArray.length >= separatorIndex[i]) {
              unFormattedValueArray.splice(separatorIndex[i], 0, separator[i]);
            }

            if(caretIndex >= valueLength) {
              caretIndex++;
            }

            if(caretIndex === separatorIndex[i] && e.keyCode !== 8) {
              caretIndex++;
            }

            continue;
          }
        }
        this.set('value', unFormattedValueArray.join(''));
        if(e.type) {
          this.set('selectionStart', caretIndex);
          this.set('selectionEnd', caretIndex);
        }
      }
    },

    formatter : function(target) {
      var value = target.get('value'),
        format = target.getAttribute('data-format'),
        formatLength = format.length,
        separator = format.match(/[^X]/g),
        separatorIndex = [],
        currentSeparatorIndex = -1;

      target.detach('keypress', this.keypressHandler);

      if(formatLength) {
        target.setAttribute('maxlength', formatLength);

        for(var i = 0, l = separator.length; i < l; i+=1) {
          currentSeparatorIndex = format.indexOf(separator[i], currentSeparatorIndex+1);
          separatorIndex.push(currentSeparatorIndex);
        }
        target.on('keypress', this.keypressHandler, null, separatorIndex, separator, new RegExp(this.getSepatarorPattern(separator), 'g'));
      }
      if(value !== '') {
        target.set('value', value.replace(/[^\d]/g, ''));
        this.keypressHandler.call(target, {}, separatorIndex, separator, new RegExp(this.getSepatarorPattern(separator), 'g'));
      }
    },

    updateFormat : function(target ){
      var correspondingNode, selectedIndex, dataFormat;

      correspondingNode = Y.one('#'+target.getAttribute('corresponding-field-id'));
      if(correspondingNode) {
        selectedIndex = target.get('selectedIndex') === -1?0:target.get('selectedIndex');
        dataFormat = target.all('option').item(selectedIndex).getAttribute('corresponding-field-data-format');

        if(dataFormat) {
          correspondingNode.setAttribute('data-format', dataFormat);
        } else {
          correspondingNode.setAttribute('data-format', '');
        }
        this.formatter(correspondingNode);
      }
    }

  }, true);

  Y.namespace('InputDataModifier');

  Y.InputDataModifier.InputDataFormatter = InputDataFormatter;

}, {requires: ['node']});
