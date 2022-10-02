class Handle {
    login(username, password){
        cy.get("[data-test='username']").clear().type(username)
        cy.get("[data-test='password']").clear().type(password)
        cy.get("[data-test='login-button']").click()
        return this
    }
    assert_error(message){
        cy.get(".error-message-container").should("contain", message)
    }

}

const handle = new Handle()
export default handle;