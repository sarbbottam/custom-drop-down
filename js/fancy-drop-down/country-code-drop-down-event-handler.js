YUI.add('country-code-drop-down-event-handler', function(Y) {

  var CustomCountryCodeDropDownEventHandler;

  CustomCountryCodeDropDownEventHandler = function(referenceNodes, customCountryCodeDropDownUpdateStyle, customCountryCodeDropDownIndex) {
    this.countryCodeSelectNode = referenceNodes.countryCodeSelectNode;
    this.selectedCountryCodeNode = referenceNodes.selectedCountryCodeNode;
    this.mobileNode = referenceNodes.mobileNode;
    this.mobileNodePlaceholder = this.mobileNode.get('parentNode').one('.placeholder');
    this.countryCodesMenuNode = referenceNodes.countryCodesMenuNode;
    this.menuHeight = '';
    this.selectedIndex = 0;
    this.customCountryCodeDropDownUpdateStyle = customCountryCodeDropDownUpdateStyle;
    this.customCountryCodeDropDownIndex = customCountryCodeDropDownIndex;
    this.countryNameStartsWith = '';
    this.currentKeyPressTime = 0;
    this.previousKeyPressTime = 0;
  };

  Y.mix(CustomCountryCodeDropDownEventHandler.prototype, {

    selectedCountryCodeNodeEventHandler : function(e, _this){
      e.halt();
      selectedIndex = _this.countryCodeSelectNode.get('selectedIndex');
      _this.countryCodesMenuNode.setStyle('display', 'block');
      _this.mobileNode.addClass('highlight-border');
      _this.customCountryCodeDropDownUpdateStyle.highlightCountryCodeMenu(selectedIndex);
      Y.fire('hide-country-codes-container', null, _this.countryCodesMenuNode);
    },

    countryCodesMenuNodeKeydownHandler : function(e, _this) {
      if(e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 9 || e.keyCode === 27) {
        e.halt();
      }
      menuSize = _this.countryCodesMenuNode.all('ul li').size();
      switch(e.keyCode) {
        case 38:
                if(_this.selectedIndex === 0) {
                  _this.selectedIndex = menuSize;
                }
                _this.selectedIndex -= 1;
                _this.customCountryCodeDropDownUpdateStyle.highlightCountryCodeMenu(_this.selectedIndex);
                break;
        case 40:
                if(_this.selectedIndex === menuSize - 1) {
                  _this.selectedIndex = -1;
                }
                _this.selectedIndex += 1;
                _this.customCountryCodeDropDownUpdateStyle.highlightCountryCodeMenu(_this.selectedIndex);
                break;
        case 9:
                _this.mobileNode.focus();
                _this.countryCodesMenuNode.setStyle('display', 'none');
                break;
        case 27:
                _this.selectedCountryCodeNode.one('a').focus();
                _this.countryCodesMenuNode.setStyle('display', 'none');
                break;
      }
    },

    selectCountryCode : function(e, _this){
      e.halt();
      var countryCode = e.target.getAttribute('data-code'), html = [], selectedIndex;

      html.push('<span class="');
      html.push(e.target.one('span').get('className'));
      html.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;');
      html.push(countryCode);

      _this.selectedCountryCodeNode.one('a').set('innerHTML', html.join(''));

      // update mobileNode padding
      _this.customCountryCodeDropDownUpdateStyle.updateMobileNodePadding();

      // hide countryCodesMenuNode
      _this.countryCodesMenuNode.setStyle('display', 'none');

      // update corresponding select/option. and fire change event
      selectedIndex = _this.countryCodesMenuNode.all('li').indexOf(e.target.get('parentNode'));
      _this.countryCodeSelectNode.set('selectedIndex', selectedIndex);
      Y.fire('country-code-change', null, _this.countryCodeSelectNode);

      // focus mobileNode
      _this.mobileNode.focus();
    },

    init : function() {
      var _this = this, selectedIndex;

      // click/enter handler on selectedCountryCodeNode
      this.selectedCountryCodeNode.on('click', this.selectedCountryCodeNodeEventHandler, null, _this);

      // up/down handler on selectedCountryCodeNode
      this.selectedCountryCodeNode.on('keydown', function(e, _this){
        if(e.keyCode === 40 || e.keyCode === 38) {
          e.halt();
          _this.selectedCountryCodeNodeEventHandler(e, _this);
        }
      }, null, _this);

      // up/down/tab/esc handler on countryCodesMenuNode
      this.countryCodesMenuNode.on('keydown', this.countryCodesMenuNodeKeydownHandler, null, _this);

      this.countryCodesMenuNode.on('keypress', function(e, _this){
        _this.currentKeyPressTime = new Date().getTime();
        if(_this.previousKeyPressTime && (_this.currentKeyPressTime - _this.previousKeyPressTime) > 500) {
          _this.countryNameStartsWith = "";
        }
        _this.previousKeyPressTime = _this.currentKeyPressTime;
        _this.countryNameStartsWith = _this.countryNameStartsWith + String.fromCharCode(e.keyCode);
        _this.selectedIndex = _this.customCountryCodeDropDownIndex.getIndexOfCountryName(_this.countryNameStartsWith);
        if(_this.selectedIndex !== -1) {
          _this.customCountryCodeDropDownUpdateStyle.highlightCountryCodeMenu(_this.selectedIndex);
        }
      }, null, _this);

      // focus the selected country code on mouse over
      this.countryCodesMenuNode.on('mouseover', function(e, _this){
        e.halt();
        e.target.focus();
        _this.selectedIndex = _this.countryCodesMenuNode.all('li').indexOf(e.target.get('parentNode'));
        //_this.mobileNode.addClass('highlight-border');
      }, null, _this);

      this.countryCodesMenuNode.all('li').on('click', this.selectCountryCode, null, _this);

      // menu item blur handler
      this.countryCodesMenuNode.all('a').on('blur', function(e, _this){
        _this.mobileNode.removeClass('highlight-border');
      }, null, _this);

      // menu item focus handler
      this.countryCodesMenuNode.all('a').on('focus', function(e, _this){
        e.halt();
        _this.mobileNode.addClass('highlight-border');
      }, null, _this);

      // add highlight border
      this.selectedCountryCodeNode.one('a').on('focus', function(e, _this){
        _this.mobileNode.addClass('highlight-border');
      }, null, _this);

      // remove highlight border
      this.selectedCountryCodeNode.one('a').on('blur', function(e, _this){
        _this.mobileNode.removeClass('highlight-border');
      }, null, _this);

      // remove highlight border
      this.mobileNode.on('blur', function(e){
        this.removeClass('highlight-border');
      }, null, _this);

    }

  }, true);

  Y.namespace('CustomDropDownMenu'); // This core validation can be used across membership;

  Y.CustomDropDownMenu.CustomCountryCodeDropDownEventHandler = CustomCountryCodeDropDownEventHandler;

});
