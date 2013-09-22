YUI.add('country-code-drop-down-index', function(Y) {

  var CustomCountryCodeDropDownIndex;

  CustomCountryCodeDropDownIndex = function(referenceNodes) {
    this.countryCodesMenuNode = referenceNodes.countryCodesMenuNode;
    this.countryNames = [];
  };

  Y.mix(CustomCountryCodeDropDownIndex.prototype, {

    populateCountryName : function(_this) {
      this.countryCodesMenuNode.all('li').each(function(target){
        _this.countryNames.push(target.one('a').get('innerHTML').replace(/<.*>&nbsp;&nbsp;/g, '').toLowerCase());
      }, null, _this);
    },

    getFirstIndexOfDesiredCountryName : function(index, desiredCountryNameStartsWith) {
      var substrLength = desiredCountryNameStartsWith.length;
      while (index >= 0) {
        if(this.countryNames[index].substr(0, substrLength) !== desiredCountryNameStartsWith) {
          break;
        }
        index -= 1;
      }
      return index + 1;
    },

    getIndexOfCountryName : function(desiredCountryNameStartsWith) {
      var low = 0, high = this.countryNames.length - 1, mid,
        currentCountryNameStartsWith,
        substrLength = desiredCountryNameStartsWith.length;

      while (low <= high) {
        mid = (low + high) / 2 | 0;
        currentCountryNameStartsWith = this.countryNames[mid].substr(0, substrLength);

        if (currentCountryNameStartsWith < desiredCountryNameStartsWith) {
          low = mid + 1;
        }
        else if (currentCountryNameStartsWith > desiredCountryNameStartsWith) {
          high = mid - 1;
        }
        else {
          return this.getFirstIndexOfDesiredCountryName(mid, desiredCountryNameStartsWith);
        }
      }

      return -1;
    },

    init : function() {
      var _this = this;
      this.populateCountryName(_this);
    }

  }, true);

  Y.namespace('CustomDropDownMenu'); // This core validation can be used across membership;

  Y.CustomDropDownMenu.CustomCountryCodeDropDownIndex = CustomCountryCodeDropDownIndex;

});
