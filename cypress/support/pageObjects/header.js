
class Header{

    cartBtn(){
        return cy.get( 'a.shopping_cart_link' );
    }

    mainMenuBtn(){
        return cy.get( '#react-burger-menu-btn' );
    }

    resetStateBtn(){
        return cy.get( 'a' ).contains( 'Reset App State' );
    }
    
    logOut(){
        return cy.get( 'a' ).contains( 'Logout' );
    }
}
export default Header;