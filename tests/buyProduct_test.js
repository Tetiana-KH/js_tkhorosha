const { pause } = require("codeceptjs");
const { flatShippingRate, proceedToCheckout } = require("../pages/cart");
const { productPriceText } = require("../pages/product");

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

Scenario('login', ({ I }) => {
    I.login(USER);
}).tag("login");

Scenario('buy product', async ({ I, cartPage, productPage }) => {
    I.login(USER);
    I.amOnPage('/index.php?route=product/product&product_id=44');
    productPage.selectColor();
    productPage.selectSize();
    const productPrice = await productPage.getProductPrice();
    console.log('productPrice: ', productPrice);
    //const totalPrice = await cartPage.getTotalPrice();
    //I.assertEqual(productPriceText + flatShippingRate, totalPrice, "Prices are not in match!");
    productPage.addToCart();
}).tag("buy");

Scenario('checkout', ({ I, checkoutPage }) => {
I.amOnPage('http://opencart.qatestlab.net/index.php?route=checkout/cart');
checkoutPage.proceedToCheckout();
}).tag("checkout");