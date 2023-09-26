const Helper = require('@codeceptjs/helper');

class ElementChecker extends Helper {

  async tryElementExist(element) {
    try {
      await this.helpers['Playwright'].seeElement(element);
      return true;
    } catch {
      return false;
    }
  }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

}

module.exports = ElementChecker;
