// ToDo - a11y
YUI.add('country-code-drop-down', function(Y) {

  var countryCodesContainer;

  if (Y.one('html').hasClass('modern')) {
    var customCountryCodeDropDown,
      counter = 1;

    customCountryCodeDropDown = function(target) {

      var countryCodeSelectNode, countryCodeOptionNodes, selectedIndex,
        mobileNode, mobileNodeWidth, mobileNodePlaceholder,
        selectedCountryCodeId, selectedCountryCodeHTML = [], selectedCountryCodeNode, selectedCountryCodeNodeWidth,
        countryCodesMenuId, countryCodesMenuHTML = [], countryCodesMenuNode,
        menuHeight,
        //functions
        createAndInjectSelectedCountryCodeHTML,
        createAndInjectCountryCodesHTML,
        updateMobileNodePadding,
        selectedCountryCodeNodeEventHandler,
        selectCountryCode,
        highlightCountryCodeMenu,
        hideCountryCodesContainer,
        // hot keys
        hotKeysIndexCounter = 0,
        hotKeysIndex = {},
        lastHotKeyUsed,
        lastHotKeyIndex,
        updateHotKeysIndex,
        getFirstIndexOfCountryName,
        getIndexOfCountryName,
        countryNames = [],
        countryNameStartsWith = "",
        previousKeyPressTime,
        currentKeyPressTime;

      // get the node reference
      countryCodeSelectNode = target;
      countryCodeOptionNodes = countryCodeSelectNode.all('option');
      selectedIndex = countryCodeSelectNode.get('selectedIndex');
      mobileNode = Y.one('#'+target.getAttribute('mobile-field-id'));
      mobileNodePlaceholder = mobileNode.get('parentNode').one('.placeholder');

      selectedCountryCodeId = 'selected-country-code-' + counter;
      countryCodesMenuId = 'country-codes-menu-' + counter;

      createAndInjectSelectedCountryCodeHTML = function() {
        selectedCountryCodeHTML.push('<div id="'+ selectedCountryCodeId +'" class="column selected-country-code">');
          selectedCountryCodeHTML.push('<a href="#'+ countryCodesMenuId + '" role="menuitem" aria-haspopup="true" aria-labelledby="country-name" tabindex="0">');

            selectedCountryCodeHTML.push('<span class="flag-');
            selectedCountryCodeHTML.push(countryCodeOptionNodes.item(selectedIndex).getAttribute('data-country-code'));
            selectedCountryCodeHTML.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;');
            selectedCountryCodeHTML.push('<span id="country-name" class="clipped">'+ countryCodeOptionNodes.item(selectedIndex).get('innerHTML')+'</span>');
            selectedCountryCodeHTML.push(countryCodeOptionNodes.item(selectedIndex).get('value'));

          selectedCountryCodeHTML.push('</a>');
        selectedCountryCodeHTML.push('</div>');

        selectedCountryCodeHTML = selectedCountryCodeHTML.join('');

        mobileNode.get('parentNode').insertBefore(selectedCountryCodeHTML, mobileNode.get('parentNode').one('label'));
      };

      createAndInjectSelectedCountryCodeHTML();

      // get the node reference and related values
      selectedCountryCodeNode = Y.one('#' + selectedCountryCodeId);

      // update mobileNode padding depending on body direction
      updateMobileNodePadding = function() {
        selectedCountryCodeNodeWidth = selectedCountryCodeNode.get('offsetWidth');
        if(Y.one('body').getStyle('direction') === 'ltr') {
          mobileNode.setStyle('paddingLeft', selectedCountryCodeNodeWidth);
          if(mobileNodePlaceholder) {
            mobileNodePlaceholder.setStyle('paddingLeft', selectedCountryCodeNodeWidth);
          }
        } else {
          mobileNode.setStyle('paddingRight', selectedCountryCodeNodeWidth);
          if(mobileNodePlaceholder) {
            mobileNodePlaceholder.setStyle('paddingRight', selectedCountryCodeNodeWidth);
          }
        }
        mobileNode.setAttribute('placeholder', mobileNode.getAttribute('placeholder'));
      };

      updateMobileNodePadding();

      if(Y.UA.ie === 9) {
        mobileNodeWidth = mobileNode.get('offsetWidth') + 17 + 'px';
      } else {
        mobileNodeWidth = mobileNode.get('offsetWidth')+ 'px';
      }

      createAndInjectCountryCodesHTML = function() {
        countryCodesMenuHTML.push('<div class="country-codes-container" id="'+ countryCodesMenuId +'" style="width:'+ mobileNodeWidth+'">');
        //countryCodesMenuHTML.push('<div class="country-codes-container" id="'+ countryCodesMenuId +'">');
          countryCodesMenuHTML.push('<ul>');
            countryCodeOptionNodes.each(function(countryCodeOption) {
              countryCodesMenuHTML.push('<li>');
                countryCodesMenuHTML.push('<a href="#" role="menuitem" data-code="' + countryCodeOption.get('value') + '">');
                  countryCodesMenuHTML.push('<span class="flag-');
                  countryCodesMenuHTML.push(countryCodeOption.getAttribute('data-country-code'));
                  countryCodesMenuHTML.push('"></span>&nbsp;&nbsp;');
                  countryCodesMenuHTML.push(countryCodeOption.get('innerHTML'));
                countryCodesMenuHTML.push('</a>');
              countryCodesMenuHTML.push('</li>');
            });
          countryCodesMenuHTML.push('</ul>');
        countryCodesMenuHTML.push('</div>');

        countryCodesMenuHTML = countryCodesMenuHTML.join('');

        selectedCountryCodeNode.append(countryCodesMenuHTML);

        countryCodeSelectNode.hide();
      };

      createAndInjectCountryCodesHTML();

      // get the node reference and related values
      countryCodesMenuNode = Y.one('#' + countryCodesMenuId);

      updateHotKeysIndex = function(target, hotKeysIndexCounter) {
        var  countryName = target.one('a').get('innerHTML').replace(/<.*>&nbsp;&nbsp;/g, '').toLowerCase(),
          hotKeyCharCode;
        // hotKeyCharCode = countryName.charCodeAt(0)+'';
        // if(hotKeysIndex[hotKeyCharCode]) {
        //   hotKeysIndex[hotKeyCharCode].push(hotKeysIndexCounter);
        // } else {
        //   hotKeysIndex[hotKeyCharCode] = [];
        //   hotKeysIndex[hotKeyCharCode].push(hotKeysIndexCounter);
        // }
        countryNames.push(countryName);
      };

      countryCodesMenuNode.all('li').each(function(target){
        updateHotKeysIndex(target, hotKeysIndexCounter);
        hotKeysIndexCounter += 1;
      });

      // display country code menu and highlight the selected item
      selectedCountryCodeNodeEventHandler = function(e){
        e.halt();
        selectedIndex = countryCodeSelectNode.get('selectedIndex');
        countryCodesMenuNode.setStyle('display', 'block');
        countryCodesMenuNode.all('ul li').item(selectedIndex).one('a').focus();
        mobileNode.addClass('highlight-border');
        if(!menuHeight) {
          if(Y.UA.ie) {
            if(Y.UA.ie === 8) {
              menuHeight = parseInt(countryCodesMenuNode.one('ul li a').get('offsetHeight'), 0) - 0.27;
            } else{
              menuHeight = parseInt(countryCodesMenuNode.one('ul li a').get('offsetHeight'), 0) + 0.42;
            }
          } else {
            menuHeight = parseInt(countryCodesMenuNode.one('ul li a').get('offsetHeight'), 0);
          }
        }
        countryCodesMenuNode.set('scrollTop', menuHeight * selectedIndex);
        Y.fire('hide-country-codes-container', null, countryCodesMenuNode);
      };

      selectedCountryCodeNode.on('click', selectedCountryCodeNodeEventHandler);

      selectedCountryCodeNode.on('keydown', function(e){
        if(e.keyCode === 40 || e.keyCode === 38) {
          e.halt();
          selectedCountryCodeNodeEventHandler(e);
        }
      });

      highlightCountryCodeMenu = function() {
        countryCodesMenuNode.all('ul li').item(selectedIndex).one('a').focus();
        countryCodesMenuNode.set('scrollTop', menuHeight * selectedIndex);
      };

      // up/down/tab handler on countryCodesMenuNode
      countryCodesMenuNode.on('keydown', function(e){
        if(e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 9) {
          e.halt();
        }
        menuSize = countryCodesMenuNode.all('ul li').size();
        switch(e.keyCode) {
          case 38:
                  if(selectedIndex === 0) {
                    selectedIndex = menuSize;
                  }
                  selectedIndex -= 1;
                  highlightCountryCodeMenu();
                  break;
          case 40:
                  if(selectedIndex === menuSize - 1) {
                    selectedIndex = -1;
                  }
                  selectedIndex += 1;
                  highlightCountryCodeMenu();
                  break;
          case 9:
                  mobileNode.focus();
                  countryCodesMenuNode.setStyle('display', 'none');
                  break;
          case 27:
                  selectedCountryCodeNode.one('a').focus();
                  countryCodesMenuNode.setStyle('display', 'none');
                  break;
        }
      });

      getFirstIndexOfCountryName = function(index) {
        var substrLength = countryNameStartsWith.length;
        while (index >= 0) {
          if(countryNames[index].substr(0, substrLength) !== countryNameStartsWith) {
            break;
          }
          index -= 1;
        }
        return index + 1;
      };

      getIndexOfCountryName = function() {
        var low = 0, high = countryNames.length - 1, mid,
          currentCountryName,
          substrLength = countryNameStartsWith.length;

        while (low <= high) {
          mid = (low + high) / 2 | 0;
          currentCountryName = countryNames[mid].substr(0, substrLength);

          if (currentCountryName < countryNameStartsWith) {
            low = mid + 1;
          }
          else if (currentCountryName > countryNameStartsWith) {
            high = mid - 1;
          }
          else {
            return getFirstIndexOfCountryName(mid);
          }
        }

        return -1;
      };

      // hot keys handler on countryCodesMenuNode
      // hot keys implementation is circular
      // not only it selects the first item on the basis of hotkey
      // but moves ahead to the next element and so forth on successive key press
      // on reaching the last element, on further succesive same hot key press
      // the very first item is selected
      countryCodesMenuNode.on('keypress', function(e){
        //if(e.keyCode >= 65 && e.keyCode <= 90) {
          currentKeyPressTime = new Date().getTime();
          if(previousKeyPressTime && (currentKeyPressTime - previousKeyPressTime) > 500) {
            countryNameStartsWith = "";
          }
          previousKeyPressTime = currentKeyPressTime;
          countryNameStartsWith = countryNameStartsWith + String.fromCharCode(e.keyCode);
          selectedIndex = getIndexOfCountryName();
          if(selectedIndex !== -1) {
            highlightCountryCodeMenu();
          }
          // if(e.keyCode !== lastHotKeyUsed) {
          //   lastHotKeyIndex = 0;
          // } else {
          //   lastHotKeyIndex += 1;
          //   if(lastHotKeyIndex === (hotKeysIndex[e.keyCode+''].length) ) {
          //     lastHotKeyIndex = 0;
          //   }
          // }
          // menuSize = countryCodesMenuNode.all('ul li').size();
          // if(hotKeysIndex[e.keyCode+'']) {
          //   selectedIndex = hotKeysIndex[e.keyCode+''][lastHotKeyIndex];
          //   highlightCountryCodeMenu();
          //   lastHotKeyUsed = e.keyCode;
          // }
        //}
      });

      // focus the selected country code on mouse over
      countryCodesMenuNode.on('mouseover', function(e){
        e.halt();
        e.target.focus();
        selectedIndex = countryCodesMenuNode.all('li').indexOf(e.target.get('parentNode'));
        mobileNode.addClass('highlight-border');
      });
      // select country code
      selectCountryCode = function(e){
        e.halt();
        var countryCode = e.target.getAttribute('data-code'), html = [];

        html.push('<span class="');
        html.push(e.target.one('span').get('className'));
        html.push('"></span>&nbsp;<span class="country-code-arrow-container"><span class="country-code-arrow"></span></span>&nbsp;');
        html.push(countryCode);

        selectedCountryCodeNode.one('a').set('innerHTML', html.join(''));

        // update mobileNode padding
        updateMobileNodePadding();

        // hide countryCodesMenuNode
        countryCodesMenuNode.setStyle('display', 'none');

        // update corresponding select/option. and fire change event
        selectedIndex = countryCodesMenuNode.all('li').indexOf(e.target.get('parentNode'));
        countryCodeSelectNode.set('selectedIndex', selectedIndex);
        Y.fire('country-code-change', null, countryCodeSelectNode);

        // focus mobileNode
        mobileNode.focus();
      };

      countryCodesMenuNode.all('li').on('click', selectCountryCode);
      countryCodesMenuNode.all('li').on('mousedown', selectCountryCode);

      //menu item blur and focus handler
      countryCodesMenuNode.all('a').on('blur', function(e){
        //countryCodesMenuNode.setStyle('display', 'none');
        mobileNode.removeClass('highlight-border');
      });
      countryCodesMenuNode.all('a').on('focus', function(e){
        e.halt();
        //countryCodesMenuNode.setStyle('display', 'block');
        mobileNode.addClass('highlight-border');
      });

      // add/remove highlight border
      selectedCountryCodeNode.one('a').on('focus', function(e){
        mobileNode.addClass('highlight-border');
      });

      selectedCountryCodeNode.one('a').on('blur', function(e){
        mobileNode.removeClass('highlight-border');
      });

      mobileNode.on('blur', function(){
        this.removeClass('highlight-border');
      });

      counter++;

    };

    Y.all('[data=country-code-drop-down]').each(function(target){
      customCountryCodeDropDown(target);
    });

    countryCodesContainer = Y.all('.country-codes-container');
    hideCountryCodesContainer = function(currentContainer){
      countryCodesContainer.each(function(target){
        if(target !== currentContainer && target.getStyle('display') === 'block') {
          target.setStyle('display', 'none');
        }
      });
    };

    Y.on('click', hideCountryCodesContainer, 'body');
    Y.on('hide-country-codes-container', function(e, countryCodesMenuNode) {
      hideCountryCodesContainer(countryCodesMenuNode);
    });
  }
});
