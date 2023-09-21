const Helper = require('@codeceptjs/helper');

class PriceGrabber extends Helper {

grabPriceFromString(string) {
const clearStringPrice = string.replace(/[^\d.]/g, '');
return parseFloat(clearStringPrice);
}
  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

}

module.exports = PriceGrabber;
