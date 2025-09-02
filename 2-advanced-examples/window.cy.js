/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!******************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/window.cy.js ***!
  \******************************************************/


/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/window');
  });
  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top');
  });
  it('cy.document() - get the document object', () => {
    // https://on.cypress.io/document
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });
  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Kitchen Sink');
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LmN5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQUEsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNO0VBQ3RCQyxVQUFVLENBQUMsTUFBTTtJQUNmQyxFQUFFLENBQUNDLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQztFQUN4RCxDQUFDLENBQUM7RUFFRkMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLE1BQU07SUFDckQ7SUFDQUYsRUFBRSxDQUFDRyxNQUFNLENBQUMsQ0FBQyxDQUFDQyxNQUFNLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQztFQUM1QyxDQUFDLENBQUM7RUFFRkYsRUFBRSxDQUFDLHlDQUF5QyxFQUFFLE1BQU07SUFDbEQ7SUFDQUYsRUFBRSxDQUFDSyxRQUFRLENBQUMsQ0FBQyxDQUFDRCxNQUFNLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDRSxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztFQUNyRSxDQUFDLENBQUM7RUFFRkosRUFBRSxDQUFDLDRCQUE0QixFQUFFLE1BQU07SUFDckM7SUFDQUYsRUFBRSxDQUFDTyxLQUFLLENBQUMsQ0FBQyxDQUFDSCxNQUFNLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQztFQUM5QyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhcmFiYW5rLWF1dG9tYXRpb24vLi9jeXByZXNzL2UyZS8yLWFkdmFuY2VkLWV4YW1wbGVzL3dpbmRvdy5jeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cImN5cHJlc3NcIiAvPlxuXG5jb250ZXh0KCdXaW5kb3cnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGN5LnZpc2l0KCdodHRwczovL2V4YW1wbGUuY3lwcmVzcy5pby9jb21tYW5kcy93aW5kb3cnKVxuICB9KVxuXG4gIGl0KCdjeS53aW5kb3coKSAtIGdldCB0aGUgZ2xvYmFsIHdpbmRvdyBvYmplY3QnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3dpbmRvd1xuICAgIGN5LndpbmRvdygpLnNob3VsZCgnaGF2ZS5wcm9wZXJ0eScsICd0b3AnKVxuICB9KVxuXG4gIGl0KCdjeS5kb2N1bWVudCgpIC0gZ2V0IHRoZSBkb2N1bWVudCBvYmplY3QnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2RvY3VtZW50XG4gICAgY3kuZG9jdW1lbnQoKS5zaG91bGQoJ2hhdmUucHJvcGVydHknLCAnY2hhcnNldCcpLmFuZCgnZXEnLCAnVVRGLTgnKVxuICB9KVxuXG4gIGl0KCdjeS50aXRsZSgpIC0gZ2V0IHRoZSB0aXRsZScsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vdGl0bGVcbiAgICBjeS50aXRsZSgpLnNob3VsZCgnaW5jbHVkZScsICdLaXRjaGVuIFNpbmsnKVxuICB9KVxufSlcbiJdLCJuYW1lcyI6WyJjb250ZXh0IiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJpdCIsIndpbmRvdyIsInNob3VsZCIsImRvY3VtZW50IiwiYW5kIiwidGl0bGUiXSwic291cmNlUm9vdCI6IiJ9