class Login{

    userInput(){
        return cy.get( 'input[data-test="username"]' );
    }
    passInput(){
        return cy.get( 'input[data-test="password"]' );
    }
    loginBtn(){
        return cy.get( 'input[name="login-button"]' );
    }
    error(){
        return cy.get( '[data-test="error"]' );
    }
    errorText( text ){
        return this.error().contains( text );
    }
    
}
export default Login;