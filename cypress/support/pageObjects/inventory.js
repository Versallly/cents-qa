class Inventory{

    addToCart( itemTag ){
        return cy.get( `[data-test="add-to-cart-${itemTag}"]` );
    }
    itemImg( id ){
        return cy.get(`#item_${id}_img_link`).find('img')
    }
    itemImgCheckSrc( id, imgLink ){
        return this.itemImg( id ).should('have.attr', 'src').and('contain', `${imgLink}`);
    }
}
export default Inventory;