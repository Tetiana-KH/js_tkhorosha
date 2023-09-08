const { pause } = require("codeceptjs");
const { flatShippingRate, proceedToCheckOut, subTotal } = require("../pages/cart");
const { productPriceText } = require("../pages/product");
const { totalPrice1 } = require("../pages/checkout");

const USER = {
    email: "360testuser@test.com",
    password: "password",
    firstName: "Tetiana",
    lastName: "33",
    city: "Dubai",
    postCode: "08711",
    address1: "Dubai str 1",
};

Feature('buy product');

//Before(({ I }) => {
  //  I.login(USER);
//});

Scenario('buy product', async ({ I, cartPage, productPage, checkoutPage, successPage }) => {
    I.login(USER);
    I.amOnPage('/index.php?route=product/product&product_id=44');
    productPage.selectColor();
    productPage.selectSize();
    const productPrice = await productPage.getProductPrice();
    console.log('productPrice: ', productPrice);
    const totalPrice = await cartPage.getTotalPrice();
    I.assertEqual(subTotal + flatShippingRate, totalPrice1, "Prices are not in match!");
    productPage.addToCart();
    I.amOnPage('http://opencart.qatestlab.net/index.php?route=checkout/cart');
    checkoutPage.proceedToCheckOut();
    successPage.verifySuccessfulPurchase();
}).tag("buy");