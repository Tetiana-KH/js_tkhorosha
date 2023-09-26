const Helper = require('@codeceptjs/helper');

class PriceGrabber extends Helper {

  async grabPriceFromString(string) {
    const clearStringPrice = string.replace(/[^\d.]/g, '');
    return parseFloat(clearStringPrice);
  }

  async parsePrice(priceString) {
    console.log('product price:', parseFloat(priceString.replace(/[^0-9.]/g, '')));
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  }

}

module.exports = PriceGrabber;
