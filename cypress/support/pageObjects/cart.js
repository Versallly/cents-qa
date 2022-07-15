class Cart{

    itemName(){
        return cy.get( '.inventory_item_name' );
    }

    removeFromCart( itemTag ){
        return cy.get( `[data-test="remove-${itemTag}"]` );
    }
    
}
export default Cart;