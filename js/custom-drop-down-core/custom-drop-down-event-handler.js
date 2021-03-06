YUI.add('custom-drop-down-event-handler', function(Y) {

  var CustomDropDownEventHandler;

  CustomDropDownEventHandler = function(config) {
    this.selectNode = config.referenceNodes.selectNode;
    this.optionNodes = config.referenceNodes.optionNodes;
    this.selectedOptionNode = config.referenceNodes.selectedOptionNode;
    this.correspondingNode = config.referenceNodes.correspondingNode;
    this.availableOptionsContainerNode = config.referenceNodes.availableOptionsContainerNode;
    this.selectedOptionAriaLabeledById = config.referenceNodes.selectedOptionAriaLabeledById;

    this.customDropDownMarkup = config.customDropDownMarkup;
    this.customDropDownStyleUpdater = config.customDropDownStyleUpdater;
    this.customDropDownIndex = config.customDropDownIndex;

    this.correspondingNodePlaceholder = this.correspondingNode?this.correspondingNode.get('parentNode').one('.placeholder'):null;

    this.selectedIndex = this.selectNode.get('selectedIndex') === -1?0:this.selectNode.get('selectedIndex');

    this.desiredOptionStartsWith = '';
    this.currentKeyPressTime = 0;
    this.previousKeyPressTime = 0;
    this.ariaLabelledby = Y.one('#'+this.selectNode.getAttribute('aria-labelledby')).get('innerHTML');
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
                // focus correspondingNode if present or the selectedNode
                if(_this.correspondingNode) {
                  _this.correspondingNode.focus();
                } else {
                  _this.selectedOptionNode.one('a').focus();
                }
                _this.availableOptionsContainerNode.setStyle('display', 'none');
                break;
        case 27:
                _this.selectedOptionNode.one('a').focus();
                _this.availableOptionsContainerNode.setStyle('display', 'none');
                break;
      }
      _this.availableOptionsContainerNode.detach('mouseover', _this.availableOptionsMouseoverHandler, null, _this);
    },

    availableOptionsHotKeypressHandler : function(e, _this) {
      var desiredOptionIndex = 0;
      // halt for space and arrow keys
      e.halt();
      _this.currentKeyPressTime = new Date().getTime();
      if(_this.previousKeyPressTime && (_this.currentKeyPressTime - _this.previousKeyPressTime) > 500) {
        _this.desiredOptionStartsWith = "";
      }
      _this.previousKeyPressTime = _this.currentKeyPressTime;
      _this.desiredOptionStartsWith = _this.desiredOptionStartsWith + String.fromCharCode(e.keyCode).toLowerCase();
      // do not update the selectedindex if desiredOptionIndex is -1
      // firefox/windows hack, firefox/windows listening to up/down/right/left arrow keypress
      desiredOptionIndex = _this.customDropDownIndex.getIndexOfDesiredOption(_this.desiredOptionStartsWith);
      if(desiredOptionIndex !== -1) {
        _this.selectedIndex = desiredOptionIndex;
        _this.customDropDownStyleUpdater.highlightMenu(_this.selectedIndex);
      }
      _this.availableOptionsContainerNode.detach('mouseover', _this.availableOptionsMouseoverHandler, null, _this);//_this.availableOptionsContainerNode.on('mousemove', _this.attachAvailableOptionsMouseoverHandler, null, _this);
    },

    // focus the selected country code on mouse over
    availableOptionsMouseoverHandler : function(e, _this) {
      e.halt();
      e.target.focus();
      _this.selectedIndex = _this.availableOptionsContainerNode.all('li').indexOf(e.target.get('parentNode'));
      _this.availableOptionsContainerNode.detach('mouseover', _this.attachAvailableOptionsMouseoverHandler);
    },

    attachAvailableOptionsMouseoverHandler : function(e, _this) {
      _this.availableOptionsContainerNode.on('mouseover', _this.availableOptionsMouseoverHandler, null, _this);
    },

    selectOption : function(e, _this){
      e.halt();
      var selectedIndex = _this.availableOptionsContainerNode.all('li').indexOf(e.target.get('parentNode')),
       selectedItemText = _this.optionNodes.item(selectedIndex).get('innerHTML'),
       ariaLabel = selectedItemText + ' ' + _this.ariaLabelledby;

      // if the selected option is immediate previous selected do not process
      if(_this.selectNode.get('selectedIndex') !== selectedIndex) {

        _this.selectedOptionNode.one('a').set('innerHTML', _this.customDropDownMarkup.getSelectedOptionHTML(e.target));

        // update correspondingNode padding
        _this.correspondingNode && _this.customDropDownStyleUpdater.updateCorrespondingNodePadding();

        // update corresponding select/option. and fire change event
        _this.selectNode.set('selectedIndex', selectedIndex);
        //Y.fire('option-changed', null, _this.selectNode);

        _this.selectNode.simulate('change');

        _this.selectedOptionNode.one('a').setAttribute('aria-label', ariaLabel);
      }

      // hide availableOptionsContainerNode
      _this.availableOptionsContainerNode.setStyle('display', 'none');

      // focus correspondingNode if present or the selectedNode
      if(_this.correspondingNode) {
        _this.correspondingNode.focus();
      } else {
        _this.selectedOptionNode.one('a').focus();
      }

    },

    init : function() {
      var _this = this, selectedIndex, desiredNode;

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
      this.selectedOptionNode.on('keypress', function(e) {
        if(e.keyCode !== 9) {
          _this.selectedOptionNodeEventHandler(e, _this);
          _this.availableOptionsHotKeypressHandler(e, _this);
        }
      });

      // hot keypress handler
      this.availableOptionsContainerNode.on('keypress', this.availableOptionsHotKeypressHandler, null, _this);

      // attach mouseover handler
      this.availableOptionsContainerNode.on('mousemove', this.attachAvailableOptionsMouseoverHandler, null, _this);

      this.availableOptionsContainerNode.all('li a').on('click', this.selectOption, null, _this);

      // ie does not fire click event when enter is pressed on a link
      this.availableOptionsContainerNode.all('li a').on('keydown', function(e, _this){
        if(e.keyCode === 13) {
          e.halt();
          _this.selectOption(e, _this);
        }
      }, null, _this);

      if (_this.correspondingNode) {
        desiredNode = _this.correspondingNode;
        // remove highlight border
        this.correspondingNode.on('blur', this.customDropDownStyleUpdater.unHighlightDesiredNodeBorder, null, desiredNode);
      } else {
        desiredNode = _this.selectedOptionNode.one('a');
      }
      // menu item focus handler
      this.availableOptionsContainerNode.all('a').on('focus', this.customDropDownStyleUpdater.highlightDesiredNodeBorder, null, desiredNode);

      // menu item blur handler
      this.availableOptionsContainerNode.all('a').on('blur', this.customDropDownStyleUpdater.unHighlightDesiredNodeBorder, null, desiredNode);

      // add highlight border
      this.selectedOptionNode.one('a').on('focus', this.customDropDownStyleUpdater.highlightDesiredNodeBorder, null, desiredNode);

      // remove highlight border
      this.selectedOptionNode.one('a').on('blur', this.customDropDownStyleUpdater.unHighlightDesiredNodeBorder, null, desiredNode);

    }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownEventHandler = CustomDropDownEventHandler;

}, {requires : ['node', 'node-event-simulate']});
