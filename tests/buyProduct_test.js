const fileReader = require('./helpers/fileReader');
const PATH = './tests/productIds.txt';
const productIds = fileReader.readFile(PATH);

const USER = {
  email: "360testuser@test.com",
  password: "password",
  firstName: "Tetiana",
  lastName: "33",
  city: "Dubai",
  postCode: "08711",
  address1: "Dubai str 1",
};

let productLinks = [44, 48, 68, 32];
const productList = [44, 48, 68, 32];
const randomIndex = Math.floor(Math.random() * productList.length);
const selectedProduct = productList[randomIndex];

Feature('buy product');

Before(({ I }) => {
  I.login(USER);
});

Scenario('clear cart', async ({ I, basePage }) => {
  I.amOnPage('/index.php?route=common/home');
  basePage.clearCart();
}).tag("clear");

Data(productLinks).Scenario('buy product', async ({ I, productPage, cartPage, current, successPage }) => {
  console.log(fileReader.convertStringToArray(productIds));
  I.amOnPage('/index.php?route=product/product&product_id=' + current);
  console.log("Color exists?", await productPage.checkColorExists());
  console.log("Size exists?", await productPage.checkSizeExists());
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