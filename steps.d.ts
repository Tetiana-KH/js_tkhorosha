/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type basePage = typeof import('./pages/base.js');
type accountPage = typeof import('./pages/account.js');
type productPage = typeof import('./pages/product.js');
type cartPage = typeof import('./pages/cart.js');
type successPage = typeof import('./pages/success.js');
type ChaiWrapper = import('codeceptjs-chai');
type PriceGrabber = import('./helpers/pricegrabber_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, basePage: basePage, accountPage: accountPage, productPage: productPage, cartPage: cartPage, successPage: successPage }
  interface Methods extends Playwright, ChaiWrapper, PriceGrabber {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
