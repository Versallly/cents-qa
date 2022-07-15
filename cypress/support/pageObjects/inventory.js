class Inventory{

    addToCart( itemTag ){
        return cy.get( `[data-test="add-to-cart-${itemTag}"]` );
    }
    
}
export default Inventory;