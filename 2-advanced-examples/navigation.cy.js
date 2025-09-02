/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/navigation.cy.js ***!
  \**********************************************************/


/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io');
    cy.get('.navbar-nav').contains('Commands').click();
    cy.get('.dropdown-menu').contains('Navigation').click();
  });
  it('cy.go() - go back or forward in the browser\'s history', () => {
    // https://on.cypress.io/go

    cy.location('pathname').should('include', 'navigation');
    cy.go('back');
    cy.location('pathname').should('not.include', 'navigation');
    cy.go('forward');
    cy.location('pathname').should('include', 'navigation');

    // clicking back
    cy.go(-1);
    cy.location('pathname').should('not.include', 'navigation');

    // clicking forward
    cy.go(1);
    cy.location('pathname').should('include', 'navigation');
  });
  it('cy.reload() - reload the page', () => {
    // https://on.cypress.io/reload
    cy.reload();

    // reload the page without using the cache
    cy.reload(true);
  });
  it('cy.visit() - visit a remote url', () => {
    // https://on.cypress.io/visit

    // Visit any sub-domain of your current domain
    // Pass options to the visit
    cy.visit('https://example.cypress.io/commands/navigation', {
      timeout: 50000,
      // increase total time for the visit to resolve
      onBeforeLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true;
      },
      onLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true;
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jeS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUFBLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTTtFQUMxQkMsVUFBVSxDQUFDLE1BQU07SUFDZkMsRUFBRSxDQUFDQyxLQUFLLENBQUMsNEJBQTRCLENBQUM7SUFDdENELEVBQUUsQ0FBQ0UsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQ2xESixFQUFFLENBQUNFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDO0VBQ3pELENBQUMsQ0FBQztFQUVGQyxFQUFFLENBQUMsd0RBQXdELEVBQUUsTUFBTTtJQUNqRTs7SUFFQUwsRUFBRSxDQUFDTSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO0lBRXZEUCxFQUFFLENBQUNRLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDYlIsRUFBRSxDQUFDTSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO0lBRTNEUCxFQUFFLENBQUNRLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDaEJSLEVBQUUsQ0FBQ00sUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDQyxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQzs7SUFFdkQ7SUFDQVAsRUFBRSxDQUFDUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVFIsRUFBRSxDQUFDTSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDOztJQUUzRDtJQUNBUCxFQUFFLENBQUNRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUlIsRUFBRSxDQUFDTSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO0VBQ3pELENBQUMsQ0FBQztFQUVGRixFQUFFLENBQUMsK0JBQStCLEVBQUUsTUFBTTtJQUN4QztJQUNBTCxFQUFFLENBQUNTLE1BQU0sQ0FBQyxDQUFDOztJQUVYO0lBQ0FULEVBQUUsQ0FBQ1MsTUFBTSxDQUFDLElBQUksQ0FBQztFQUNqQixDQUFDLENBQUM7RUFFRkosRUFBRSxDQUFDLGlDQUFpQyxFQUFFLE1BQU07SUFDMUM7O0lBRUE7SUFDQTtJQUNBTCxFQUFFLENBQUNDLEtBQUssQ0FBQyxnREFBZ0QsRUFBRTtNQUN6RFMsT0FBTyxFQUFFLEtBQUs7TUFBRTtNQUNoQkMsWUFBWUEsQ0FBRUMsYUFBYSxFQUFFO1FBQzNCO1FBQ0FDLE1BQU0sQ0FBQyxPQUFPRCxhQUFhLEtBQUssUUFBUSxDQUFDLENBQUNFLEVBQUUsQ0FBQ0MsRUFBRSxDQUFDQyxJQUFJO01BQ3RELENBQUM7TUFDREMsTUFBTUEsQ0FBRUwsYUFBYSxFQUFFO1FBQ3JCO1FBQ0FDLE1BQU0sQ0FBQyxPQUFPRCxhQUFhLEtBQUssUUFBUSxDQUFDLENBQUNFLEVBQUUsQ0FBQ0MsRUFBRSxDQUFDQyxJQUFJO01BQ3REO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJhYmFuay1hdXRvbWF0aW9uLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy9uYXZpZ2F0aW9uLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY3lwcmVzc1wiIC8+XG5cbmNvbnRleHQoJ05hdmlnYXRpb24nLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGN5LnZpc2l0KCdodHRwczovL2V4YW1wbGUuY3lwcmVzcy5pbycpXG4gICAgY3kuZ2V0KCcubmF2YmFyLW5hdicpLmNvbnRhaW5zKCdDb21tYW5kcycpLmNsaWNrKClcbiAgICBjeS5nZXQoJy5kcm9wZG93bi1tZW51JykuY29udGFpbnMoJ05hdmlnYXRpb24nKS5jbGljaygpXG4gIH0pXG5cbiAgaXQoJ2N5LmdvKCkgLSBnbyBiYWNrIG9yIGZvcndhcmQgaW4gdGhlIGJyb3dzZXJcXCdzIGhpc3RvcnknLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2dvXG5cbiAgICBjeS5sb2NhdGlvbigncGF0aG5hbWUnKS5zaG91bGQoJ2luY2x1ZGUnLCAnbmF2aWdhdGlvbicpXG5cbiAgICBjeS5nbygnYmFjaycpXG4gICAgY3kubG9jYXRpb24oJ3BhdGhuYW1lJykuc2hvdWxkKCdub3QuaW5jbHVkZScsICduYXZpZ2F0aW9uJylcblxuICAgIGN5LmdvKCdmb3J3YXJkJylcbiAgICBjeS5sb2NhdGlvbigncGF0aG5hbWUnKS5zaG91bGQoJ2luY2x1ZGUnLCAnbmF2aWdhdGlvbicpXG5cbiAgICAvLyBjbGlja2luZyBiYWNrXG4gICAgY3kuZ28oLTEpXG4gICAgY3kubG9jYXRpb24oJ3BhdGhuYW1lJykuc2hvdWxkKCdub3QuaW5jbHVkZScsICduYXZpZ2F0aW9uJylcblxuICAgIC8vIGNsaWNraW5nIGZvcndhcmRcbiAgICBjeS5nbygxKVxuICAgIGN5LmxvY2F0aW9uKCdwYXRobmFtZScpLnNob3VsZCgnaW5jbHVkZScsICduYXZpZ2F0aW9uJylcbiAgfSlcblxuICBpdCgnY3kucmVsb2FkKCkgLSByZWxvYWQgdGhlIHBhZ2UnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3JlbG9hZFxuICAgIGN5LnJlbG9hZCgpXG5cbiAgICAvLyByZWxvYWQgdGhlIHBhZ2Ugd2l0aG91dCB1c2luZyB0aGUgY2FjaGVcbiAgICBjeS5yZWxvYWQodHJ1ZSlcbiAgfSlcblxuICBpdCgnY3kudmlzaXQoKSAtIHZpc2l0IGEgcmVtb3RlIHVybCcsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vdmlzaXRcblxuICAgIC8vIFZpc2l0IGFueSBzdWItZG9tYWluIG9mIHlvdXIgY3VycmVudCBkb21haW5cbiAgICAvLyBQYXNzIG9wdGlvbnMgdG8gdGhlIHZpc2l0XG4gICAgY3kudmlzaXQoJ2h0dHBzOi8vZXhhbXBsZS5jeXByZXNzLmlvL2NvbW1hbmRzL25hdmlnYXRpb24nLCB7XG4gICAgICB0aW1lb3V0OiA1MDAwMCwgLy8gaW5jcmVhc2UgdG90YWwgdGltZSBmb3IgdGhlIHZpc2l0IHRvIHJlc29sdmVcbiAgICAgIG9uQmVmb3JlTG9hZCAoY29udGVudFdpbmRvdykge1xuICAgICAgICAvLyBjb250ZW50V2luZG93IGlzIHRoZSByZW1vdGUgcGFnZSdzIHdpbmRvdyBvYmplY3RcbiAgICAgICAgZXhwZWN0KHR5cGVvZiBjb250ZW50V2luZG93ID09PSAnb2JqZWN0JykudG8uYmUudHJ1ZVxuICAgICAgfSxcbiAgICAgIG9uTG9hZCAoY29udGVudFdpbmRvdykge1xuICAgICAgICAvLyBjb250ZW50V2luZG93IGlzIHRoZSByZW1vdGUgcGFnZSdzIHdpbmRvdyBvYmplY3RcbiAgICAgICAgZXhwZWN0KHR5cGVvZiBjb250ZW50V2luZG93ID09PSAnb2JqZWN0JykudG8uYmUudHJ1ZVxuICAgICAgfSxcbiAgICB9KVxuICB9KVxufSlcbiJdLCJuYW1lcyI6WyJjb250ZXh0IiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJnZXQiLCJjb250YWlucyIsImNsaWNrIiwiaXQiLCJsb2NhdGlvbiIsInNob3VsZCIsImdvIiwicmVsb2FkIiwidGltZW91dCIsIm9uQmVmb3JlTG9hZCIsImNvbnRlbnRXaW5kb3ciLCJleHBlY3QiLCJ0byIsImJlIiwidHJ1ZSIsIm9uTG9hZCJdLCJzb3VyY2VSb290IjoiIn0=