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

}

module.exports = ElementChecker;
