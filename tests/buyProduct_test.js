const fileReader = require('../helpers/fileReader');
const PATH = './productIds.txt';
const productIds = fileReader.convertStringToArray(PATH);
const randomIndex = Math.floor(Math.random() * productIds.length);

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

Before(({ I, basePage }) => {
  I.login(USER);
  basePage.clearCart();
});

Data([productIds[randomIndex]]).Scenario('buy product', async ({ I, productPage, cartPage, current, successPage }) => {
  I.amOnPage('/index.php?route=product/product&product_id=' + current);
  productPage.selectColor();
  productPage.selectSize();
  const productPrice = await productPage.getProductPrice();
  productPage.addToCart();
  console.log("Product is n/a", await cartPage.throwNewError());
  cartPage.proceedToCheckOut();
  const flatShippingRate = await cartPage.getFlatShippingRate();
  const totalPrice = await cartPage.getTotalPrice();
  I.assertEqual(productPrice + flatShippingRate, totalPrice, "Prices are not in match!");
  successPage.verifySuccessfulPurchase();
}).tag("buy");

After(({ I }) => {
  I.logoff();
});