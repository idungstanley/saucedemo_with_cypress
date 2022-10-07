class Handle {
  enter_username(username) {
    cy.get("[data-test='username']").clear().type(username);
  }
  enter_password(password) {
    cy.get("[data-test='password']").clear().type(password);
  }
  click_login() {
    cy.get("[data-test='login-button']").click();
  }
}

const handle = new Handle();
export default handle;
