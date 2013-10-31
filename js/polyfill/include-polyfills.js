YUI.add('include-polyfills', function (Y) {

  // include placeholder
  var isPlaceholderSupported = function() {
    var i = document.createElement('input');
    return 'placeholder' in i;
  };

  if (Y.one('html').hasClass('modern') && !isPlaceholderSupported()) {
    Y.use('placeholder');
  }

  // include focus highlighter
  if (Y.one('html').hasClass('lt-ie8')) {
    Y.use('focus-highlighter');
  }

}, '0.0.1', {requires: ['node']});
