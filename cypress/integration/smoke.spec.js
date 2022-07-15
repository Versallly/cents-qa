/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => false );
import Cart from '../support/pageObjects/cart';
import Checkout from '../support/pageObjects/checkout';
import Inventory from '../support/pageObjects/inventory';
import Header from '../support/pageObjects/header';
const items = require( '../fixtures/items.json' ),
      data = require( '../fixtures/data.json' ),
      cart = new Cart(),
      header = new Header(),
      inventory = new Inventory(),
      checkout = new Checkout(),
      usersList = [ data.users.standard, data.users.problem, data.users.performanceGlitch ];

      describe( 'Smoke test workflows', () => {

        before( () => {
            cy.viewport( 1920, 1080 );
            Cypress.config( 'viewportWidth', 1920 );
            Cypress.config( 'viewportHeight', 1080 );
        });

        beforeEach( () => {
            cy.visit( '/' );
        });
        usersList.forEach( ( user ) => {
            it( `User is able to order an item ${user.login}`, function(){
                const price = items.item1.price,
                taxRate = 0.08,
                tax = Math.ceil( ( price * taxRate )*100 )/100,
                total = price + tax;
                cy.centsLogin( user );
                cy.title().should( 'eq', data.titles.inventory );
                inventory.addToCart( items.item1.tag ).click();
                header.cartBtn().click();
                cy.title().should( 'eq', data.titles.cart );
                cart.itemName().contains( items.item1.name ).should( 'be.visible' );
                cy.get('button').contains('Checkout').click();
                cy.title().should( 'eq', data.titles.checkoutData );
                checkout.firstName().type( data.checkoutData.firstName );
                checkout.lastName().type( data.checkoutData.lastName );
                checkout.postal().type( data.checkoutData.zip );
                checkout.continueBtn().click();
                cy.title().should( 'eq', data.titles.checkoutOverview );
                cart.itemName().contains( items.item1.name ).should( 'be.visible' );
                checkout.subtotal( price ).should( 'be.visible' );
                checkout.tax( tax ).should( 'be.visible' );
                checkout.total( total ).should( 'be.visible' );
                checkout.finishBtn().click();
            });
        }); 

        afterEach( () => { // resetting the state
            header.mainMenuBtn().click();
            header.resetStateBtn().click();
        });
      });