/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/aliasing.cy.js ***!
  \********************************************************/


/// <reference types="cypress" />

context('Aliasing', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/aliasing');
  });
  it('.as() - alias a DOM element for later use', () => {
    // https://on.cypress.io/as

    // Alias a DOM element for use later
    // We don't have to traverse to the element
    // later in our code, we reference it with @

    cy.get('.as-table').find('tbody>tr').first().find('td').first().find('button').as('firstBtn');

    // when we reference the alias, we place an
    // @ in front of its name
    cy.get('@firstBtn').click();
    cy.get('@firstBtn').should('have.class', 'btn-success').and('contain', 'Changed');
  });
  it('.as() - alias a route for later use', () => {
    // Alias the route to wait for its response
    cy.intercept('GET', '**/comments/*').as('getComment');

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click();

    // https://on.cypress.io/wait
    cy.wait('@getComment').its('response.statusCode').should('eq', 200);
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNpbmcuY3kuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBQSxPQUFPLENBQUMsVUFBVSxFQUFFLE1BQU07RUFDeEJDLFVBQVUsQ0FBQyxNQUFNO0lBQ2ZDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLDhDQUE4QyxDQUFDO0VBQzFELENBQUMsQ0FBQztFQUVGQyxFQUFFLENBQUMsMkNBQTJDLEVBQUUsTUFBTTtJQUNwRDs7SUFFQTtJQUNBO0lBQ0E7O0lBRUFGLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQ2pDQyxLQUFLLENBQUMsQ0FBQyxDQUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDLENBQzFCRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUNFLEVBQUUsQ0FBQyxVQUFVLENBQUM7O0lBRWhDO0lBQ0E7SUFDQU4sRUFBRSxDQUFDRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUNJLEtBQUssQ0FBQyxDQUFDO0lBRTNCUCxFQUFFLENBQUNHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FDaEJLLE1BQU0sQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQ25DQyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztFQUM5QixDQUFDLENBQUM7RUFFRlAsRUFBRSxDQUFDLHFDQUFxQyxFQUFFLE1BQU07SUFDOUM7SUFDQUYsRUFBRSxDQUFDVSxTQUFTLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDSixFQUFFLENBQUMsWUFBWSxDQUFDOztJQUVyRDtJQUNBO0lBQ0FOLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDSSxLQUFLLENBQUMsQ0FBQzs7SUFFOUI7SUFDQVAsRUFBRSxDQUFDVyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUNDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDSixNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztFQUNyRSxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhcmFiYW5rLWF1dG9tYXRpb24vLi9jeXByZXNzL2UyZS8yLWFkdmFuY2VkLWV4YW1wbGVzL2FsaWFzaW5nLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY3lwcmVzc1wiIC8+XG5cbmNvbnRleHQoJ0FsaWFzaW5nJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8vY29tbWFuZHMvYWxpYXNpbmcnKVxuICB9KVxuXG4gIGl0KCcuYXMoKSAtIGFsaWFzIGEgRE9NIGVsZW1lbnQgZm9yIGxhdGVyIHVzZScsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vYXNcblxuICAgIC8vIEFsaWFzIGEgRE9NIGVsZW1lbnQgZm9yIHVzZSBsYXRlclxuICAgIC8vIFdlIGRvbid0IGhhdmUgdG8gdHJhdmVyc2UgdG8gdGhlIGVsZW1lbnRcbiAgICAvLyBsYXRlciBpbiBvdXIgY29kZSwgd2UgcmVmZXJlbmNlIGl0IHdpdGggQFxuXG4gICAgY3kuZ2V0KCcuYXMtdGFibGUnKS5maW5kKCd0Ym9keT50cicpXG4gICAgICAuZmlyc3QoKS5maW5kKCd0ZCcpLmZpcnN0KClcbiAgICAgIC5maW5kKCdidXR0b24nKS5hcygnZmlyc3RCdG4nKVxuXG4gICAgLy8gd2hlbiB3ZSByZWZlcmVuY2UgdGhlIGFsaWFzLCB3ZSBwbGFjZSBhblxuICAgIC8vIEAgaW4gZnJvbnQgb2YgaXRzIG5hbWVcbiAgICBjeS5nZXQoJ0BmaXJzdEJ0bicpLmNsaWNrKClcblxuICAgIGN5LmdldCgnQGZpcnN0QnRuJylcbiAgICAgIC5zaG91bGQoJ2hhdmUuY2xhc3MnLCAnYnRuLXN1Y2Nlc3MnKVxuICAgICAgLmFuZCgnY29udGFpbicsICdDaGFuZ2VkJylcbiAgfSlcblxuICBpdCgnLmFzKCkgLSBhbGlhcyBhIHJvdXRlIGZvciBsYXRlciB1c2UnLCAoKSA9PiB7XG4gICAgLy8gQWxpYXMgdGhlIHJvdXRlIHRvIHdhaXQgZm9yIGl0cyByZXNwb25zZVxuICAgIGN5LmludGVyY2VwdCgnR0VUJywgJyoqL2NvbW1lbnRzLyonKS5hcygnZ2V0Q29tbWVudCcpXG5cbiAgICAvLyB3ZSBoYXZlIGNvZGUgdGhhdCBnZXRzIGEgY29tbWVudCB3aGVuXG4gICAgLy8gdGhlIGJ1dHRvbiBpcyBjbGlja2VkIGluIHNjcmlwdHMuanNcbiAgICBjeS5nZXQoJy5uZXR3b3JrLWJ0bicpLmNsaWNrKClcblxuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby93YWl0XG4gICAgY3kud2FpdCgnQGdldENvbW1lbnQnKS5pdHMoJ3Jlc3BvbnNlLnN0YXR1c0NvZGUnKS5zaG91bGQoJ2VxJywgMjAwKVxuICB9KVxufSlcbiJdLCJuYW1lcyI6WyJjb250ZXh0IiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJpdCIsImdldCIsImZpbmQiLCJmaXJzdCIsImFzIiwiY2xpY2siLCJzaG91bGQiLCJhbmQiLCJpbnRlcmNlcHQiLCJ3YWl0IiwiaXRzIl0sInNvdXJjZVJvb3QiOiIifQ==