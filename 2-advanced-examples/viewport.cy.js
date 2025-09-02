/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/viewport.cy.js ***!
  \********************************************************/


/// <reference types="cypress" />
context('Viewport', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/viewport');
  });
  it('cy.viewport() - set the viewport size and dimension', () => {
    // https://on.cypress.io/viewport

    cy.get('#navbar').should('be.visible');
    cy.viewport(320, 480);

    // the navbar should have collapse since our screen is smaller
    cy.get('#navbar').should('not.be.visible');
    cy.get('.navbar-toggle').should('be.visible').click();
    cy.get('.nav').find('a').should('be.visible');

    // lets see what our app looks like on a super large screen
    cy.viewport(2999, 2999);

    // cy.viewport() accepts a set of preset sizes
    // to easily set the screen to a device's width and height

    // We added a cy.wait() between each viewport change so you can see
    // the change otherwise it is a little too fast to see :)

    cy.viewport('macbook-15');
    cy.wait(200);
    cy.viewport('macbook-13');
    cy.wait(200);
    cy.viewport('macbook-11');
    cy.wait(200);
    cy.viewport('ipad-2');
    cy.wait(200);
    cy.viewport('ipad-mini');
    cy.wait(200);
    cy.viewport('iphone-6+');
    cy.wait(200);
    cy.viewport('iphone-6');
    cy.wait(200);
    cy.viewport('iphone-5');
    cy.wait(200);
    cy.viewport('iphone-4');
    cy.wait(200);
    cy.viewport('iphone-3');
    cy.wait(200);

    // cy.viewport() accepts an orientation for all presets
    // the default orientation is 'portrait'
    cy.viewport('ipad-2', 'portrait');
    cy.wait(200);
    cy.viewport('iphone-4', 'landscape');
    cy.wait(200);

    // The viewport will be reset back to the default dimensions
    // in between tests (the  default can be set in cypress.config.{js|ts})
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3BvcnQuY3kuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0FBLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTTtFQUN4QkMsVUFBVSxDQUFDLE1BQU07SUFDZkMsRUFBRSxDQUFDQyxLQUFLLENBQUMsOENBQThDLENBQUM7RUFDMUQsQ0FBQyxDQUFDO0VBRUZDLEVBQUUsQ0FBQyxxREFBcUQsRUFBRSxNQUFNO0lBQzlEOztJQUVBRixFQUFFLENBQUNHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0Q0osRUFBRSxDQUFDSyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7SUFFckI7SUFDQUwsRUFBRSxDQUFDRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUMxQ0osRUFBRSxDQUFDRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDRSxLQUFLLENBQUMsQ0FBQztJQUNyRE4sRUFBRSxDQUFDRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQzs7SUFFN0M7SUFDQUosRUFBRSxDQUFDSyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzs7SUFFdkI7SUFDQTs7SUFFQTtJQUNBOztJQUVBTCxFQUFFLENBQUNLLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFDekJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFDekJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFDekJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDckJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDeEJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDeEJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDdkJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDdkJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDdkJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDdkJMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7SUFFWjtJQUNBO0lBQ0FSLEVBQUUsQ0FBQ0ssUUFBUSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7SUFDakNMLEVBQUUsQ0FBQ1EsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNaUixFQUFFLENBQUNLLFFBQVEsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDO0lBQ3BDTCxFQUFFLENBQUNRLElBQUksQ0FBQyxHQUFHLENBQUM7O0lBRVo7SUFDQTtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFyYWJhbmstYXV0b21hdGlvbi8uL2N5cHJlc3MvZTJlLzItYWR2YW5jZWQtZXhhbXBsZXMvdmlld3BvcnQuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjeXByZXNzXCIgLz5cbmNvbnRleHQoJ1ZpZXdwb3J0JywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8vY29tbWFuZHMvdmlld3BvcnQnKVxuICB9KVxuXG4gIGl0KCdjeS52aWV3cG9ydCgpIC0gc2V0IHRoZSB2aWV3cG9ydCBzaXplIGFuZCBkaW1lbnNpb24nLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3ZpZXdwb3J0XG5cbiAgICBjeS5nZXQoJyNuYXZiYXInKS5zaG91bGQoJ2JlLnZpc2libGUnKVxuICAgIGN5LnZpZXdwb3J0KDMyMCwgNDgwKVxuXG4gICAgLy8gdGhlIG5hdmJhciBzaG91bGQgaGF2ZSBjb2xsYXBzZSBzaW5jZSBvdXIgc2NyZWVuIGlzIHNtYWxsZXJcbiAgICBjeS5nZXQoJyNuYXZiYXInKS5zaG91bGQoJ25vdC5iZS52aXNpYmxlJylcbiAgICBjeS5nZXQoJy5uYXZiYXItdG9nZ2xlJykuc2hvdWxkKCdiZS52aXNpYmxlJykuY2xpY2soKVxuICAgIGN5LmdldCgnLm5hdicpLmZpbmQoJ2EnKS5zaG91bGQoJ2JlLnZpc2libGUnKVxuXG4gICAgLy8gbGV0cyBzZWUgd2hhdCBvdXIgYXBwIGxvb2tzIGxpa2Ugb24gYSBzdXBlciBsYXJnZSBzY3JlZW5cbiAgICBjeS52aWV3cG9ydCgyOTk5LCAyOTk5KVxuXG4gICAgLy8gY3kudmlld3BvcnQoKSBhY2NlcHRzIGEgc2V0IG9mIHByZXNldCBzaXplc1xuICAgIC8vIHRvIGVhc2lseSBzZXQgdGhlIHNjcmVlbiB0byBhIGRldmljZSdzIHdpZHRoIGFuZCBoZWlnaHRcblxuICAgIC8vIFdlIGFkZGVkIGEgY3kud2FpdCgpIGJldHdlZW4gZWFjaCB2aWV3cG9ydCBjaGFuZ2Ugc28geW91IGNhbiBzZWVcbiAgICAvLyB0aGUgY2hhbmdlIG90aGVyd2lzZSBpdCBpcyBhIGxpdHRsZSB0b28gZmFzdCB0byBzZWUgOilcblxuICAgIGN5LnZpZXdwb3J0KCdtYWNib29rLTE1JylcbiAgICBjeS53YWl0KDIwMClcbiAgICBjeS52aWV3cG9ydCgnbWFjYm9vay0xMycpXG4gICAgY3kud2FpdCgyMDApXG4gICAgY3kudmlld3BvcnQoJ21hY2Jvb2stMTEnKVxuICAgIGN5LndhaXQoMjAwKVxuICAgIGN5LnZpZXdwb3J0KCdpcGFkLTInKVxuICAgIGN5LndhaXQoMjAwKVxuICAgIGN5LnZpZXdwb3J0KCdpcGFkLW1pbmknKVxuICAgIGN5LndhaXQoMjAwKVxuICAgIGN5LnZpZXdwb3J0KCdpcGhvbmUtNisnKVxuICAgIGN5LndhaXQoMjAwKVxuICAgIGN5LnZpZXdwb3J0KCdpcGhvbmUtNicpXG4gICAgY3kud2FpdCgyMDApXG4gICAgY3kudmlld3BvcnQoJ2lwaG9uZS01JylcbiAgICBjeS53YWl0KDIwMClcbiAgICBjeS52aWV3cG9ydCgnaXBob25lLTQnKVxuICAgIGN5LndhaXQoMjAwKVxuICAgIGN5LnZpZXdwb3J0KCdpcGhvbmUtMycpXG4gICAgY3kud2FpdCgyMDApXG5cbiAgICAvLyBjeS52aWV3cG9ydCgpIGFjY2VwdHMgYW4gb3JpZW50YXRpb24gZm9yIGFsbCBwcmVzZXRzXG4gICAgLy8gdGhlIGRlZmF1bHQgb3JpZW50YXRpb24gaXMgJ3BvcnRyYWl0J1xuICAgIGN5LnZpZXdwb3J0KCdpcGFkLTInLCAncG9ydHJhaXQnKVxuICAgIGN5LndhaXQoMjAwKVxuICAgIGN5LnZpZXdwb3J0KCdpcGhvbmUtNCcsICdsYW5kc2NhcGUnKVxuICAgIGN5LndhaXQoMjAwKVxuXG4gICAgLy8gVGhlIHZpZXdwb3J0IHdpbGwgYmUgcmVzZXQgYmFjayB0byB0aGUgZGVmYXVsdCBkaW1lbnNpb25zXG4gICAgLy8gaW4gYmV0d2VlbiB0ZXN0cyAodGhlICBkZWZhdWx0IGNhbiBiZSBzZXQgaW4gY3lwcmVzcy5jb25maWcue2pzfHRzfSlcbiAgfSlcbn0pXG4iXSwibmFtZXMiOlsiY29udGV4dCIsImJlZm9yZUVhY2giLCJjeSIsInZpc2l0IiwiaXQiLCJnZXQiLCJzaG91bGQiLCJ2aWV3cG9ydCIsImNsaWNrIiwiZmluZCIsIndhaXQiXSwic291cmNlUm9vdCI6IiJ9