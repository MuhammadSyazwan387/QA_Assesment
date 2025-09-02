/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*********************************************!*\
  !*** ./cypress/e2e/test/test_cypress.cy.js ***!
  \*********************************************/


describe('ParaBank Login Test', () => {
  it('should login successfully with valid credentials', () => {
    // Visit the ParaBank site
    cy.visit('https://parabank.parasoft.com/');

    // Enter username
    cy.get('input[name="username"]').type('john');  // replace with valid test username

    // Enter password
    cy.get('input[name="password"]').type('demo');  // replace with valid test password

    // Click Login button
    cy.get('input[value="Log In"]').click();

    // Verify successful login by checking Account Overview
    cy.contains('Accounts Overview').should('be.visible');
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jeXByZXNzLmN5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQUEsUUFBUSxDQUFDLGVBQWUsRUFBRSxNQUFNO0VBQzlCQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU07SUFDakJDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLDRCQUE0QixDQUFDO0VBQ3hDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFyYWJhbmstYXV0b21hdGlvbi8uL2N5cHJlc3MvZTJlL3Rlc3QvdGVzdF9jeXByZXNzLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRlc2NyaWJlKCd0ZW1wbGF0ZSBzcGVjJywgKCkgPT4ge1xyXG4gIGl0KCdwYXNzZXMnLCAoKSA9PiB7XHJcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8nKVxyXG4gIH0pXHJcbn0pIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiaXQiLCJjeSIsInZpc2l0Il0sInNvdXJjZVJvb3QiOiIifQ==