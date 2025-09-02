/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/waiting.cy.js ***!
  \*******************************************************/


/// <reference types="cypress" />
context('Waiting', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/waiting');
  });
  // BE CAREFUL of adding unnecessary wait times.
  // https://on.cypress.io/best-practices#Unnecessary-Waiting

  // https://on.cypress.io/wait
  it('cy.wait() - wait for a specific amount of time', () => {
    cy.get('.wait-input1').type('Wait 1000ms after typing');
    cy.wait(1000);
    cy.get('.wait-input2').type('Wait 1000ms after typing');
    cy.wait(1000);
    cy.get('.wait-input3').type('Wait 1000ms after typing');
    cy.wait(1000);
  });
  it('cy.wait() - wait for a specific route', () => {
    // Listen to GET to comments/1
    cy.intercept('GET', '**/comments/*').as('getComment');

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click();

    // wait for GET comments/1
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304]);
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdGluZy5jeS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQUEsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNO0VBQ3ZCQyxVQUFVLENBQUMsTUFBTTtJQUNmQyxFQUFFLENBQUNDLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQztFQUN6RCxDQUFDLENBQUM7RUFDRjtFQUNBOztFQUVBO0VBQ0FDLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxNQUFNO0lBQ3pERixFQUFFLENBQUNHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLDBCQUEwQixDQUFDO0lBQ3ZESixFQUFFLENBQUNLLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDYkwsRUFBRSxDQUFDRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUNDLElBQUksQ0FBQywwQkFBMEIsQ0FBQztJQUN2REosRUFBRSxDQUFDSyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2JMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsMEJBQTBCLENBQUM7SUFDdkRKLEVBQUUsQ0FBQ0ssSUFBSSxDQUFDLElBQUksQ0FBQztFQUNmLENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMsdUNBQXVDLEVBQUUsTUFBTTtJQUNoRDtJQUNBRixFQUFFLENBQUNNLFNBQVMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUNDLEVBQUUsQ0FBQyxZQUFZLENBQUM7O0lBRXJEO0lBQ0E7SUFDQVAsRUFBRSxDQUFDRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUNLLEtBQUssQ0FBQyxDQUFDOztJQUU5QjtJQUNBUixFQUFFLENBQUNLLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQ0ksR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUNDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDbEYsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJhYmFuay1hdXRvbWF0aW9uLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy93YWl0aW5nLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY3lwcmVzc1wiIC8+XG5jb250ZXh0KCdXYWl0aW5nJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8vY29tbWFuZHMvd2FpdGluZycpXG4gIH0pXG4gIC8vIEJFIENBUkVGVUwgb2YgYWRkaW5nIHVubmVjZXNzYXJ5IHdhaXQgdGltZXMuXG4gIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9iZXN0LXByYWN0aWNlcyNVbm5lY2Vzc2FyeS1XYWl0aW5nXG5cbiAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3dhaXRcbiAgaXQoJ2N5LndhaXQoKSAtIHdhaXQgZm9yIGEgc3BlY2lmaWMgYW1vdW50IG9mIHRpbWUnLCAoKSA9PiB7XG4gICAgY3kuZ2V0KCcud2FpdC1pbnB1dDEnKS50eXBlKCdXYWl0IDEwMDBtcyBhZnRlciB0eXBpbmcnKVxuICAgIGN5LndhaXQoMTAwMClcbiAgICBjeS5nZXQoJy53YWl0LWlucHV0MicpLnR5cGUoJ1dhaXQgMTAwMG1zIGFmdGVyIHR5cGluZycpXG4gICAgY3kud2FpdCgxMDAwKVxuICAgIGN5LmdldCgnLndhaXQtaW5wdXQzJykudHlwZSgnV2FpdCAxMDAwbXMgYWZ0ZXIgdHlwaW5nJylcbiAgICBjeS53YWl0KDEwMDApXG4gIH0pXG5cbiAgaXQoJ2N5LndhaXQoKSAtIHdhaXQgZm9yIGEgc3BlY2lmaWMgcm91dGUnLCAoKSA9PiB7XG4gICAgLy8gTGlzdGVuIHRvIEdFVCB0byBjb21tZW50cy8xXG4gICAgY3kuaW50ZXJjZXB0KCdHRVQnLCAnKiovY29tbWVudHMvKicpLmFzKCdnZXRDb21tZW50JylcblxuICAgIC8vIHdlIGhhdmUgY29kZSB0aGF0IGdldHMgYSBjb21tZW50IHdoZW5cbiAgICAvLyB0aGUgYnV0dG9uIGlzIGNsaWNrZWQgaW4gc2NyaXB0cy5qc1xuICAgIGN5LmdldCgnLm5ldHdvcmstYnRuJykuY2xpY2soKVxuXG4gICAgLy8gd2FpdCBmb3IgR0VUIGNvbW1lbnRzLzFcbiAgICBjeS53YWl0KCdAZ2V0Q29tbWVudCcpLml0cygncmVzcG9uc2Uuc3RhdHVzQ29kZScpLnNob3VsZCgnYmUub25lT2YnLCBbMjAwLCAzMDRdKVxuICB9KVxufSlcbiJdLCJuYW1lcyI6WyJjb250ZXh0IiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJpdCIsImdldCIsInR5cGUiLCJ3YWl0IiwiaW50ZXJjZXB0IiwiYXMiLCJjbGljayIsIml0cyIsInNob3VsZCJdLCJzb3VyY2VSb290IjoiIn0=