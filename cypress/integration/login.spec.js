/// <reference types="cypress" />
import Login from '../support/pageObjects/login';
import Header from '../support/pageObjects/header';
Cypress.on('uncaught:exception', (err, runnable) => false );
const data = require( '../fixtures/data.json' ),
      login = new Login(),
      header = new Header(),
      curuser = data.users.standard,
      usersList = [ data.users.standard, data.users.problem, data.users.performanceGlitch ];

      describe( 'Login page', () => {
        before( () => {
            cy.viewport( 1920, 1080 );
            Cypress.config( 'viewportWidth', 1920 );
            Cypress.config( 'viewportHeight', 1080 );
        });
        beforeEach( () => {
            cy.visit( '/' );
        });
        usersList.forEach( ( user ) => {
            it( `Login using valid credentials ${user.login}`, function(){
                    cy.visit( '/' );
                    header.cartBtn().should( 'not.exist' );
                    cy.centsLogin( user );
                    cy.title().should( 'eq', data.titles.inventory );
                    header.cartBtn().should( 'be.visible' );
            
            });
            it( `Logout from the Logged in state ${user.login}`, function(){
                cy.visit( '/' );
                header.cartBtn().should( 'not.exist' );
                cy.centsLogin( user );
                cy.title().should( 'eq', data.titles.inventory );
                header.cartBtn().should( 'be.visible' );
                header.mainMenuBtn().click();
                header.logOut().click();
                cy.title().should( 'eq', data.titles.login );
                header.cartBtn().should( 'not.exist' );
            });
        });
         
        it( 'Locked out user is unable to login', function(){
            cy.centsLogin( data.users.locked );
            cy.title().should( 'eq', data.titles.login );
            login.errorText( data.errors.locked ).should( 'be.visible' );
            header.cartBtn().should( 'not.exist' );
        });

        it( 'Login with invalid Password', function(){
            cy.centsLogin( data.users.wrongPass );
            cy.title().should( 'eq', data.titles.login );
            login.errorText( data.errors.wrongCredentials ).should( 'be.visible' );
            header.cartBtn().should( 'not.exist' );
        });

        it( 'Login with invalid Username', function(){
            cy.centsLogin( data.users.wrongUsername );
            cy.title().should( 'eq', data.titles.login );
            login.errorText( data.errors.wrongCredentials ).should( 'be.visible' );
            header.cartBtn().should( 'not.exist' );
        });

        it( 'Username and Password inputs are required', function(){
            // checking both empty
            login.loginBtn().click();
            cy.title().should( 'eq', data.titles.login );
            login.loginBtn().click();
            login.errorText( data.errors.usernameReq ).should( 'be.visible' );
            // checking username empty
            login.userInput().type( curuser.login );
            login.loginBtn().click();
            cy.title().should( 'eq', data.titles.login );
            login.errorText( data.errors.passwordReq ).should( 'be.visible' ); 
            login.userInput().clear();
            // checking password empty 
            login.passInput().type( curuser.password );
            login.loginBtn().click();
            cy.title().should( 'eq', data.titles.login );
            login.errorText( data.errors.usernameReq ).should( 'be.visible' );
        });
        
      });