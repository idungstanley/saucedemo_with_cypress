class Assert_login{
    error_message(message){
        cy.get(".error-message-container").should("contain", message)
    }
    username_val(value){
        cy.get("[data-test='username']").should("have.value", value)
    }
    password(value){
        cy.get("[data-test='password']").should("have.value", value)
    }
}

//Assertions on login page 
const assert_lp = new Assert_login()
export default assert_lp;