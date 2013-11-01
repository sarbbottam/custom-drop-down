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

  // include password mask toggle
  if (Y.one('html').hasClass('modern') && !Y.one('html').hasClass('lt-ie9')) {
    Y.use('toggle-password-mask');
  }

}, '0.0.1', {requires: ['node']});
