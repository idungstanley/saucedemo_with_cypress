/// <reference types="cypress"/>
import assert_lp from "../pageObject/Login/assertions";
import handle from "../pageObject/Login/loginPage";
describe("Sauce Demo App", () => {
  before(() => {
    cy.fixture("credentials").then((data) => {
      this.data = data;
    });
  });
  beforeEach(() => {
    cy.visit("/");
  });
  let store = []
  it.skip("Validate that user cannot login with incorrect password", () => {
    handle.enter_username(this.data.standard_user);
    handle.enter_password(this.data.wrong_password);
    assert_lp.username_val(this.data.standard_user);
    assert_lp.password(this.data.wrong_password);
    handle.click_login();
    assert_lp.error_message("do not match any user in this service");
  });
  it("Validate that the user is locked out", () => {
    handle.enter_username(this.data.locked_out_user);
    handle.enter_password(this.data.password);
    assert_lp.username_val(this.data.locked_out_user);
    assert_lp.password(this.data.password);
    handle.click_login();
    assert_lp.error_message("Sorry, this user has been locked out.");
  });
  it("Validate that the user can login successfully", () => {
    handle.enter_username(this.data.standard_user);
    handle.enter_password(this.data.password);
    assert_lp.username_val(this.data.standard_user);
    assert_lp.password(this.data.password);
    handle.click_login();
    cy.get(".inventory_list .inventory_item .inventory_item_description .inventory_item_label a .inventory_item_name").each(($el,index,$list)=>{
      cy.log($el.text())
      store.push($el.text())
    })
    cy.log(store)
    cy.get(".inventory_list").children().should("have.length", 6);
    cy.get("[data-test='add-to-cart-sauce-labs-backpack']").click();
    cy.get(".shopping_cart_badge").should("have.text", 1);
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get(".shopping_cart_badge").should("have.text", 2);
    cy.get("#react-burger-menu-btn").click({ force: true });
  });
});