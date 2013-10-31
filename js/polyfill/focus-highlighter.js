YUI.add('focus-highlighter', function (Y) {

  highlightDesiredNodeBorder = function(e){
    this.addClass('highlight-border');
  };

  unHighlightDesiredNodeBorder = function(e){
    this.removeClass('highlight-border');
  };

  Y.all('input, select').each(function (target) {
    target.on('focus', highlightDesiredNodeBorder);
    target.on('blur', unHighlightDesiredNodeBorder);
  });

}, '0.0.1', {requires: ['node']});
