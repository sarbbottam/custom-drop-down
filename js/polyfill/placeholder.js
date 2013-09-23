YUI.add('placeholder', function (Y) {

  var isPlaceholderSupported = function() {
    var i = document.createElement('input');
    return 'placeholder' in i;
  };

  if (Y.one('html').hasClass('modern') && !isPlaceholderSupported()) {

    Y.all('input[placeholder]').each(function (node) {
      var placeholder = Y.Node.create('<label class="placeholder">' + node.getAttribute('placeholder') + '</label>');
      var parentNode = node.get('parentNode');
      if(Y.Lang.trim(node.get('value')) !== "") {
        placeholder.addClass('lowZIndex');
      }
      parentNode.insertBefore(placeholder, node);
    });

    Y.all('input[placeholder]').on('focus', function (e) {
      e.target.previous().addClass('lowZIndex');
    });

    Y.all('input[placeholder]').on('blur', function (e) {
      if(Y.Lang.trim(e.target.get('value')) === "") {
        e.target.previous().removeClass('lowZIndex');
      }
    });

    Y.all('.placeholder').on('click', function (e) {
      e.target.next().focus();
    });

  }

}, '0.0.1', {requires: ['node']});
