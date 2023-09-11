const { subTotal, flatShippingRate } = require("../pages/cart");
const steps_file = require("../steps_file");

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

Before(({ I }) => {
  I.login(USER);
});

Scenario('buy product', async ({ I, cartPage, productPage, successPage }) => {
  I.amOnPage('/index.php?route=product/product&product_id=44');
  productPage.selectColor();
  productPage.selectSize();
  productPage.addToCart();
  productPage.openCart();
  const productPrice = await productPage.getProductPrice();
  console.log('productPrice: ', productPrice);
  const totalPrice = await cartPage.getTotalPrice();
  I.assertEqual(subTotal + flatShippingRate, totalPrice, "Prices are not in match!");
  cartPage.proceedToCheckOut();
  successPage.verifySuccessfulPurchase();
}).tag("buy");