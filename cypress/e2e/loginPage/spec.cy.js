/// <reference types="cypress"/>
import handle from "../pageObject/loginPage";
describe("Sauce Demo App", () => {
  before(() => {
    cy.fixture("credentials").then((data) => {
      this.data = data;
    });
  });
  beforeEach(() => {
    cy.visit("/");
  });
  it("Validate that user cannot login with incorrect password", () => {
    handle.login(this.data.standard_user, this.data.wrong_password);
    handle.assert_error("do not match any user in this service");
  });
  it("Validate that the user is locked out", () => {
    handle.login(this.data.locked_out_user, this.data.password);
    handle.assert_error("Sorry, this user has been locked out.");
  });
  it("Validate that the user can login successfully", () => {
    handle.login(this.data.standard_user, this.data.password);
    cy.get("#react-burger-menu-btn").click({force:true})
  });
});
