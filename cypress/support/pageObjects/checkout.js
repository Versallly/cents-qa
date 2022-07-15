
class Checkout{

///////////CHECKOUT: COMPLETE
successMsg(){
    return cy.contains( 'THANK YOU FOR YOUR ORDER' );
}

///////////CHECKOUT: OVERVIEW
subtotal( amount ){
    return cy.get( '.summary_subtotal_label' ).contains( amount );
}
tax( amount ){
    return cy.get( '.summary_tax_label' ).contains( amount );
}
total( amount ){
    return  cy.get( '.summary_total_label' ).contains( amount );
}
finishBtn(){
    return cy.get( `[data-test="finish"]` );
}

///////////CHECKOUT: YOUR INFORMATION
firstName(){
    return cy.get( '[data-test="firstName"]' )
}
lastName(){
    return cy.get( '[data-test="lastName"]' )
}
postal(){
    return cy.get( '[data-test="postalCode"]' )
}
continueBtn(){
    return cy.get( '[data-test="continue"]' )
}

}
export default Checkout;