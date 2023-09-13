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

Scenario('buy product', async ({ I, productPage, cartPage, successPage }) => {
  I.amOnPage('/index.php?route=product/product&path=260&product_id=48');
  productPage.selectColor();
  productPage.selectSize();
  const productPrice = await productPage.getProductPrice();
  productPage.addToCart();
  cartPage.proceedToCheckOut();
  const flatShippingRate = await cartPage.getFlatShippingRate();
  const totalPrice = await cartPage.getTotalPrice();
  I.assertEqual(productPrice + flatShippingRate, totalPrice, "Prices are not in match!");
  successPage.verifySuccessfulPurchase();
}).tag("buy");