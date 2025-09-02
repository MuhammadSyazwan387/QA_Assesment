/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/location.cy.js ***!
  \********************************************************/


/// <reference types="cypress" />

context('Location', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/location');
  });
  it('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty');
  });
  it('cy.location() - get window.location', () => {
    // https://on.cypress.io/location
    cy.location().should(location => {
      expect(location.hash).to.be.empty;
      expect(location.href).to.eq('https://example.cypress.io/commands/location');
      expect(location.host).to.eq('example.cypress.io');
      expect(location.hostname).to.eq('example.cypress.io');
      expect(location.origin).to.eq('https://example.cypress.io');
      expect(location.pathname).to.eq('/commands/location');
      expect(location.port).to.eq('');
      expect(location.protocol).to.eq('https:');
      expect(location.search).to.be.empty;
    });
  });
  it('cy.url() - get the current URL', () => {
    // https://on.cypress.io/url
    cy.url().should('eq', 'https://example.cypress.io/commands/location');
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uY3kuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBQSxPQUFPLENBQUMsVUFBVSxFQUFFLE1BQU07RUFDeEJDLFVBQVUsQ0FBQyxNQUFNO0lBQ2ZDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLDhDQUE4QyxDQUFDO0VBQzFELENBQUMsQ0FBQztFQUVGQyxFQUFFLENBQUMsc0NBQXNDLEVBQUUsTUFBTTtJQUMvQztJQUNBRixFQUFFLENBQUNHLElBQUksQ0FBQyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxVQUFVLENBQUM7RUFDOUIsQ0FBQyxDQUFDO0VBRUZGLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxNQUFNO0lBQzlDO0lBQ0FGLEVBQUUsQ0FBQ0ssUUFBUSxDQUFDLENBQUMsQ0FBQ0QsTUFBTSxDQUFFQyxRQUFRLElBQUs7TUFDakNDLE1BQU0sQ0FBQ0QsUUFBUSxDQUFDRixJQUFJLENBQUMsQ0FBQ0ksRUFBRSxDQUFDQyxFQUFFLENBQUNDLEtBQUs7TUFDakNILE1BQU0sQ0FBQ0QsUUFBUSxDQUFDSyxJQUFJLENBQUMsQ0FBQ0gsRUFBRSxDQUFDSSxFQUFFLENBQUMsOENBQThDLENBQUM7TUFDM0VMLE1BQU0sQ0FBQ0QsUUFBUSxDQUFDTyxJQUFJLENBQUMsQ0FBQ0wsRUFBRSxDQUFDSSxFQUFFLENBQUMsb0JBQW9CLENBQUM7TUFDakRMLE1BQU0sQ0FBQ0QsUUFBUSxDQUFDUSxRQUFRLENBQUMsQ0FBQ04sRUFBRSxDQUFDSSxFQUFFLENBQUMsb0JBQW9CLENBQUM7TUFDckRMLE1BQU0sQ0FBQ0QsUUFBUSxDQUFDUyxNQUFNLENBQUMsQ0FBQ1AsRUFBRSxDQUFDSSxFQUFFLENBQUMsNEJBQTRCLENBQUM7TUFDM0RMLE1BQU0sQ0FBQ0QsUUFBUSxDQUFDVSxRQUFRLENBQUMsQ0FBQ1IsRUFBRSxDQUFDSSxFQUFFLENBQUMsb0JBQW9CLENBQUM7TUFDckRMLE1BQU0sQ0FBQ0QsUUFBUSxDQUFDVyxJQUFJLENBQUMsQ0FBQ1QsRUFBRSxDQUFDSSxFQUFFLENBQUMsRUFBRSxDQUFDO01BQy9CTCxNQUFNLENBQUNELFFBQVEsQ0FBQ1ksUUFBUSxDQUFDLENBQUNWLEVBQUUsQ0FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQztNQUN6Q0wsTUFBTSxDQUFDRCxRQUFRLENBQUNhLE1BQU0sQ0FBQyxDQUFDWCxFQUFFLENBQUNDLEVBQUUsQ0FBQ0MsS0FBSztJQUNyQyxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFFRlAsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLE1BQU07SUFDekM7SUFDQUYsRUFBRSxDQUFDbUIsR0FBRyxDQUFDLENBQUMsQ0FBQ2YsTUFBTSxDQUFDLElBQUksRUFBRSw4Q0FBOEMsQ0FBQztFQUN2RSxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhcmFiYW5rLWF1dG9tYXRpb24vLi9jeXByZXNzL2UyZS8yLWFkdmFuY2VkLWV4YW1wbGVzL2xvY2F0aW9uLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY3lwcmVzc1wiIC8+XG5cbmNvbnRleHQoJ0xvY2F0aW9uJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8vY29tbWFuZHMvbG9jYXRpb24nKVxuICB9KVxuXG4gIGl0KCdjeS5oYXNoKCkgLSBnZXQgdGhlIGN1cnJlbnQgVVJMIGhhc2gnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2hhc2hcbiAgICBjeS5oYXNoKCkuc2hvdWxkKCdiZS5lbXB0eScpXG4gIH0pXG5cbiAgaXQoJ2N5LmxvY2F0aW9uKCkgLSBnZXQgd2luZG93LmxvY2F0aW9uJywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9sb2NhdGlvblxuICAgIGN5LmxvY2F0aW9uKCkuc2hvdWxkKChsb2NhdGlvbikgPT4ge1xuICAgICAgZXhwZWN0KGxvY2F0aW9uLmhhc2gpLnRvLmJlLmVtcHR5XG4gICAgICBleHBlY3QobG9jYXRpb24uaHJlZikudG8uZXEoJ2h0dHBzOi8vZXhhbXBsZS5jeXByZXNzLmlvL2NvbW1hbmRzL2xvY2F0aW9uJylcbiAgICAgIGV4cGVjdChsb2NhdGlvbi5ob3N0KS50by5lcSgnZXhhbXBsZS5jeXByZXNzLmlvJylcbiAgICAgIGV4cGVjdChsb2NhdGlvbi5ob3N0bmFtZSkudG8uZXEoJ2V4YW1wbGUuY3lwcmVzcy5pbycpXG4gICAgICBleHBlY3QobG9jYXRpb24ub3JpZ2luKS50by5lcSgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8nKVxuICAgICAgZXhwZWN0KGxvY2F0aW9uLnBhdGhuYW1lKS50by5lcSgnL2NvbW1hbmRzL2xvY2F0aW9uJylcbiAgICAgIGV4cGVjdChsb2NhdGlvbi5wb3J0KS50by5lcSgnJylcbiAgICAgIGV4cGVjdChsb2NhdGlvbi5wcm90b2NvbCkudG8uZXEoJ2h0dHBzOicpXG4gICAgICBleHBlY3QobG9jYXRpb24uc2VhcmNoKS50by5iZS5lbXB0eVxuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ2N5LnVybCgpIC0gZ2V0IHRoZSBjdXJyZW50IFVSTCcsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vdXJsXG4gICAgY3kudXJsKCkuc2hvdWxkKCdlcScsICdodHRwczovL2V4YW1wbGUuY3lwcmVzcy5pby9jb21tYW5kcy9sb2NhdGlvbicpXG4gIH0pXG59KVxuIl0sIm5hbWVzIjpbImNvbnRleHQiLCJiZWZvcmVFYWNoIiwiY3kiLCJ2aXNpdCIsIml0IiwiaGFzaCIsInNob3VsZCIsImxvY2F0aW9uIiwiZXhwZWN0IiwidG8iLCJiZSIsImVtcHR5IiwiaHJlZiIsImVxIiwiaG9zdCIsImhvc3RuYW1lIiwib3JpZ2luIiwicGF0aG5hbWUiLCJwb3J0IiwicHJvdG9jb2wiLCJzZWFyY2giLCJ1cmwiXSwic291cmNlUm9vdCI6IiJ9