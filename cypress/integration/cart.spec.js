/// <reference types="cypress" />
import Cart from '../support/pageObjects/cart';
import Inventory from '../support/pageObjects/inventory';
import Header from '../support/pageObjects/header';
Cypress.on('uncaught:exception', (err, runnable) => false );
const items = require( '../fixtures/items.json' ),
      data = require( '../fixtures/data.json' ),
      cart = new Cart(),
      header = new Header(),
      inventory = new Inventory(),
      usersList = [ data.users.standard, data.users.problem, data.users.performanceGlitch ];

      describe( 'Cart page tests page', () => {

        before( () => {
            cy.viewport( 1920, 1080 );
            Cypress.config( 'viewportWidth', 1920 );
            Cypress.config( 'viewportHeight', 1080 );
        });

        beforeEach( () => {
            cy.visit( '/' );
        });
        usersList.forEach( ( user ) => {
            it( `Remove item from the card from the Cart page ${user.login}`, function(){
                cy.centsLogin( user );
                cy.title().should( 'eq', data.titles.inventory );
                inventory.addToCart( items.item1.tag ).click();
                header.cartBtn().click();
                cy.title().should( 'eq', data.titles.cart );
                cart.removeFromCart( items.item1.tag ).click();
                cart.itemName().should( 'not.exist' );
            });
        }); 
        afterEach( () => { // resetting the state
            header.mainMenuBtn().click();
            header.resetStateBtn().click();
        });

      });