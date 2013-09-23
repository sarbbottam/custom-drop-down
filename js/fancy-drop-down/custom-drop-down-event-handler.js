YUI.add('custom-drop-down-event-handler', function(Y) {

  var CustomDropDownEventHandler;

  CustomDropDownEventHandler = function(config) {
    this.selectNode = config.referenceNodes.selectNode;
    this.optionNodes = config.referenceNodes.optionNodes;
    this.selectedOptionNode = config.referenceNodes.selectedOptionNode;
    this.correspondingNode = config.referenceNodes.correspondingNode;
    this.availableOptionsContainerNode = config.referenceNodes.availableOptionsContainerNode;
    this.selectedOptionAriaLabeledById = config.referenceNodes.selectedOptionAriaLabeledById;

    this.customDropDownStyleUpdater = config.customDropDownStyleUpdater;
    this.customDropDownIndex = config.customDropDownIndex;

    this.correspondingNodePlaceholder = this.correspondingNode.get('parentNode').one('.placeholder');

    this.selectedIndex = 0;

    this.menuHeight = '';

    this.desiredOptionStartsWith = '';
    this.currentKeyPressTime = 0;
    this.previousKeyPressTime = 0;
  };

  Y.mix(CustomDropDownEventHandler.prototype, {

    selectedOptionNodeEventHandler : function(e, _this){
      e.halt();
      selectedIndex = _this.selectNode.get('selectedIndex');
      _this.availableOptionsContainerNode.setStyle('display', 'block');
      _this.correspondingNode && _this.correspondingNode.addClass('highlight-border');
      _this.customDropDownStyleUpdater.highlightMenu(selectedIndex);
      Y.fire('hide-available-options-container', null, _this.availableOptionsContainerNode);
    },

    availableOptionsContainerNodeKeydownHandler : function(e, _this) {
      if(e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 9 || e.keyCode === 27) {
        e.halt();
      }
      menuSize = _this.availableOptionsContainerNode.all('ul li').size();
      switch(e.keyCode) {
        case 38:
                if(_this.selectedIndex <= 0) {
                  _this.selectedIndex = menuSize;
                }
                _this.selectedIndex -= 1;
                _this.customDropDownStyleUpdater.highlightMenu(_this.selectedIndex);
                break;
        case 40:
                if(_this.selectedIndex >= menuSize - 1) {
                  _this.selectedIndex = -1;
                }
                _this.selectedIndex += 1;
                _this.customDropDownStyleUpdater.highlightMenu(_this.selectedIndex);
                break;
        case 9:
                _this.correspondingNode.focus();
                _this.availableOptionsContainerNode.setStyle('display', 'none');
                break;
        case 27:
                _this.selectedOptionNode.one('a').focus();
                _this.availableOptionsContainerNode.setStyle('display', 'none');
                break;
      }
    },

    availableOptionsHotKeypressHandler : function(e, _this) {
      var desiredOptionIndex = 0;
      e.halt();
      _this.currentKeyPressTime = new Date().getTime();
      if(_this.previousKeyPressTime && (_this.currentKeyPressTime - _this.previousKeyPressTime) > 500) {
        _this.desiredOptionStartsWith = "";
      }
      _this.previousKeyPressTime = _this.currentKeyPressTime;
      _this.desiredOptionStartsWith = _this.desiredOptionStartsWith + String.fromCharCode(e.keyCode);
      // do not update the selectedindex if desiredOptionIndex is -1
      // firefox/windows hack, firefox/windows listening to up/down/right/left arrow keypress
      desiredOptionIndex = _this.customDropDownIndex.getIndexOfDesiredOption(_this.desiredOptionStartsWith);
      if(desiredOptionIndex !== -1) {
        _this.selectedIndex = desiredOptionIndex;
        _this.customDropDownStyleUpdater.highlightMenu(_this.selectedIndex);
      }
    },

    selectOption : function(e, _this){
      e.halt();
      var countryCode = e.target.getAttribute('data-code'), html = [], selectedIndex;
      // ToDo
      // if the select option is re-selected do not process
      // fire an event, let the custom-drop-down-markup update the markup
      html.push('<span class="');
      html.push(e.target.one('span').get('className'));
      html.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;');
      html.push('<span id="'+ _this.selectedOptionAriaLabeledById +'" class="clipped"></span>');
      html.push(countryCode);

      _this.selectedOptionNode.one('a').set('innerHTML', html.join(''));

      // update correspondingNode padding
      _this.correspondingNode && _this.customDropDownStyleUpdater.updateCorrespondingNodePadding();

      // hide availableOptionsContainerNode
      _this.availableOptionsContainerNode.setStyle('display', 'none');

      // update corresponding select/option. and fire change event
      selectedIndex = _this.availableOptionsContainerNode.all('li').indexOf(e.target.get('parentNode'));
      _this.selectNode.set('selectedIndex', selectedIndex);
      Y.fire('country-code-change', null, _this.selectNode);

      Y.one('#' + _this.selectedOptionAriaLabeledById).set('innerHTML',_this.optionNodes.item(selectedIndex).get('innerHTML'));

      // focus correspondingNode
      _this.correspondingNode && _this.correspondingNode.focus();
    },

    highlightCorrespondingNode : function(e, _this){
      _this.correspondingNode.addClass('highlight-border');
    },

    unHighlightCorrespondingNode : function(e, _this){
      _this.correspondingNode.removeClass('highlight-border');
    },

    init : function() {
      var _this = this, selectedIndex;

      // click/enter handler on selectedOptionNode
      this.selectedOptionNode.on('click', this.selectedOptionNodeEventHandler, null, _this);

      // up/down handler on selectedOptionNode
      this.selectedOptionNode.on('keydown', function(e, _this){
        if(e.keyCode === 40 || e.keyCode === 38) {
          e.halt();
          _this.selectedOptionNodeEventHandler(e, _this);
        }
      }, null, _this);

      // up/down/tab/esc handler on availableOptionsContainerNode
      this.availableOptionsContainerNode.on('keydown', this.availableOptionsContainerNodeKeydownHandler, null, _this);

      // hot keypress handler
      this.availableOptionsContainerNode.on('keypress', this.availableOptionsHotKeypressHandler, null, _this);

      // focus the selected country code on mouse over
      this.availableOptionsContainerNode.on('mouseover', function(e, _this){
        e.halt();
        e.target.focus();
        _this.selectedIndex = _this.availableOptionsContainerNode.all('li').indexOf(e.target.get('parentNode'));
      }, null, _this);

      this.availableOptionsContainerNode.all('li').on('click', this.selectOption, null, _this);

      // ie does not fire click event when enter is pressed on a link
      this.availableOptionsContainerNode.all('li').on('keydown', function(e, _this){
        if(e.keyCode === 13) {
          e.halt();
          _this.selectOption(e, _this);
        }
      }, null, _this);

      if (_this.correspondingNode) {
        // menu item focus handler
        this.availableOptionsContainerNode.all('a').on('focus', this.highlightCorrespondingNode, null, _this);

        // menu item blur handler
        this.availableOptionsContainerNode.all('a').on('blur', this.unHighlightCorrespondingNode, null, _this);

        // add highlight border
        this.selectedOptionNode.one('a').on('focus', this.highlightCorrespondingNode, null, _this);

        // remove highlight border
        this.selectedOptionNode.one('a').on('blur', this.unHighlightCorrespondingNode, null, _this);

        // remove highlight border
        this.correspondingNode.on('blur', this.unHighlightCorrespondingNode, null, _this);
      }

    }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownEventHandler = CustomDropDownEventHandler;

});
