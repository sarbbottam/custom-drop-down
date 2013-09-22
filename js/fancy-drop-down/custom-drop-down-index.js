YUI.add('custom-drop-down-index', function(Y) {

  var CustomDropDownIndex;

  CustomDropDownIndex = function(referenceNodes) {
    this.availableOptionsContainerNode = referenceNodes.availableOptionsContainerNode;
    this.optionsList = [];
  };

  Y.mix(CustomDropDownIndex.prototype, {

    populateAvailableOptionsList : function(_this) {
      this.availableOptionsContainerNode.all('li').each(function(target){
        _this.optionsList.push(target.one('a').get('innerHTML').replace(/<.*>&nbsp;&nbsp;/g, '').toLowerCase());
      }, null, _this);
    },

    getFirstIndexOfDesiredOption : function(index, desiredOptionStartsWith) {
      var substrLength = desiredOptionStartsWith.length;
      while (index >= 0) {
        if(this.optionsList[index].substr(0, substrLength) !== desiredOptionStartsWith) {
          break;
        }
        index -= 1;
      }
      return index + 1;
    },

    getIndexOfDesiredOption : function(desiredOptionStartsWith) {
      var low = 0, high = this.optionsList.length - 1, mid,
        currentOptionStartsWith,
        substrLength = desiredOptionStartsWith.length;

      while (low <= high) {
        mid = (low + high) / 2 | 0;
        currentOptionStartsWith = this.optionsList[mid].substr(0, substrLength);

        if (currentOptionStartsWith < desiredOptionStartsWith) {
          low = mid + 1;
        }
        else if (currentOptionStartsWith > desiredOptionStartsWith) {
          high = mid - 1;
        }
        else {
          return this.getFirstIndexOfDesiredOption(mid, desiredOptionStartsWith);
        }
      }

      return -1;
    },

    init : function() {
      var _this = this;
      this.populateAvailableOptionsList(_this);
    }

  }, true);

  Y.namespace('CustomDropDownMenu');

  Y.CustomDropDownMenu.CustomDropDownIndex = CustomDropDownIndex;

});
