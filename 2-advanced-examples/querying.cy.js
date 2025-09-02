/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/querying.cy.js ***!
  \********************************************************/


/// <reference types="cypress" />

context('Querying', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/querying');
  });

  // The most commonly used query is 'cy.get()', you can
  // think of this like the '$' in jQuery

  it('cy.get() - query DOM elements', () => {
    // https://on.cypress.io/get

    cy.get('#query-btn').should('contain', 'Button');
    cy.get('.query-btn').should('contain', 'Button');
    cy.get('#querying .well>button:first').should('contain', 'Button');
    //              ↲
    // Use CSS selectors just like jQuery

    cy.get('[data-test-id="test-example"]').should('have.class', 'example');

    // 'cy.get()' yields jQuery object, you can get its attribute
    // by invoking `.attr()` method
    cy.get('[data-test-id="test-example"]').invoke('attr', 'data-test-id').should('equal', 'test-example');

    // or you can get element's CSS property
    cy.get('[data-test-id="test-example"]').invoke('css', 'position').should('equal', 'static');

    // or use assertions directly during 'cy.get()'
    // https://on.cypress.io/assertions
    cy.get('[data-test-id="test-example"]').should('have.attr', 'data-test-id', 'test-example').and('have.css', 'position', 'static');
  });
  it('cy.contains() - query DOM elements with matching content', () => {
    // https://on.cypress.io/contains
    cy.get('.query-list').contains('bananas').should('have.class', 'third');

    // we can pass a regexp to `.contains()`
    cy.get('.query-list').contains(/^b\w+/).should('have.class', 'third');
    cy.get('.query-list').contains('apples').should('have.class', 'first');

    // passing a selector to contains will
    // yield the selector containing the text
    cy.get('#querying').contains('ul', 'oranges').should('have.class', 'query-list');
    cy.get('.query-button').contains('Save Form').should('have.class', 'btn');
  });
  it('.within() - query DOM elements within a specific element', () => {
    // https://on.cypress.io/within
    cy.get('.query-form').within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Email');
      cy.get('input:last').should('have.attr', 'placeholder', 'Password');
    });
  });
  it('cy.root() - query the root DOM element', () => {
    // https://on.cypress.io/root

    // By default, root is the document
    cy.root().should('match', 'html');
    cy.get('.query-ul').within(() => {
      // In this within, the root is now the ul DOM element
      cy.root().should('have.class', 'query-ul');
    });
  });
  it('best practices - selecting elements', () => {
    // https://on.cypress.io/best-practices#Selecting-Elements
    cy.get('[data-cy=best-practices-selecting-elements]').within(() => {
      // Worst - too generic, no context
      cy.get('button').click();

      // Bad. Coupled to styling. Highly subject to change.
      cy.get('.btn.btn-large').click();

      // Average. Coupled to the `name` attribute which has HTML semantics.
      cy.get('[name=submission]').click();

      // Better. But still coupled to styling or JS event listeners.
      cy.get('#main').click();

      // Slightly better. Uses an ID but also ensures the element
      // has an ARIA role attribute
      cy.get('#main[role=button]').click();

      // Much better. But still coupled to text content that may change.
      cy.contains('Submit').click();

      // Best. Insulated from all changes.
      cy.get('[data-cy=submit]').click();
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFyYWJhbmstYXV0b21hdGlvbi8uL2N5cHJlc3MvZTJlLzItYWR2YW5jZWQtZXhhbXBsZXMvcXVlcnlpbmcuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjeXByZXNzXCIgLz5cblxuY29udGV4dCgnUXVlcnlpbmcnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGN5LnZpc2l0KCdodHRwczovL2V4YW1wbGUuY3lwcmVzcy5pby9jb21tYW5kcy9xdWVyeWluZycpXG4gIH0pXG5cbiAgLy8gVGhlIG1vc3QgY29tbW9ubHkgdXNlZCBxdWVyeSBpcyAnY3kuZ2V0KCknLCB5b3UgY2FuXG4gIC8vIHRoaW5rIG9mIHRoaXMgbGlrZSB0aGUgJyQnIGluIGpRdWVyeVxuXG4gIGl0KCdjeS5nZXQoKSAtIHF1ZXJ5IERPTSBlbGVtZW50cycsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vZ2V0XG5cbiAgICBjeS5nZXQoJyNxdWVyeS1idG4nKS5zaG91bGQoJ2NvbnRhaW4nLCAnQnV0dG9uJylcblxuICAgIGN5LmdldCgnLnF1ZXJ5LWJ0bicpLnNob3VsZCgnY29udGFpbicsICdCdXR0b24nKVxuXG4gICAgY3kuZ2V0KCcjcXVlcnlpbmcgLndlbGw+YnV0dG9uOmZpcnN0Jykuc2hvdWxkKCdjb250YWluJywgJ0J1dHRvbicpXG4gICAgLy8gICAgICAgICAgICAgIOKGslxuICAgIC8vIFVzZSBDU1Mgc2VsZWN0b3JzIGp1c3QgbGlrZSBqUXVlcnlcblxuICAgIGN5LmdldCgnW2RhdGEtdGVzdC1pZD1cInRlc3QtZXhhbXBsZVwiXScpLnNob3VsZCgnaGF2ZS5jbGFzcycsICdleGFtcGxlJylcblxuICAgIC8vICdjeS5nZXQoKScgeWllbGRzIGpRdWVyeSBvYmplY3QsIHlvdSBjYW4gZ2V0IGl0cyBhdHRyaWJ1dGVcbiAgICAvLyBieSBpbnZva2luZyBgLmF0dHIoKWAgbWV0aG9kXG4gICAgY3kuZ2V0KCdbZGF0YS10ZXN0LWlkPVwidGVzdC1leGFtcGxlXCJdJylcbiAgICAgIC5pbnZva2UoJ2F0dHInLCAnZGF0YS10ZXN0LWlkJylcbiAgICAgIC5zaG91bGQoJ2VxdWFsJywgJ3Rlc3QtZXhhbXBsZScpXG5cbiAgICAvLyBvciB5b3UgY2FuIGdldCBlbGVtZW50J3MgQ1NTIHByb3BlcnR5XG4gICAgY3kuZ2V0KCdbZGF0YS10ZXN0LWlkPVwidGVzdC1leGFtcGxlXCJdJylcbiAgICAgIC5pbnZva2UoJ2NzcycsICdwb3NpdGlvbicpXG4gICAgICAuc2hvdWxkKCdlcXVhbCcsICdzdGF0aWMnKVxuXG4gICAgLy8gb3IgdXNlIGFzc2VydGlvbnMgZGlyZWN0bHkgZHVyaW5nICdjeS5nZXQoKSdcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vYXNzZXJ0aW9uc1xuICAgIGN5LmdldCgnW2RhdGEtdGVzdC1pZD1cInRlc3QtZXhhbXBsZVwiXScpXG4gICAgICAuc2hvdWxkKCdoYXZlLmF0dHInLCAnZGF0YS10ZXN0LWlkJywgJ3Rlc3QtZXhhbXBsZScpXG4gICAgICAuYW5kKCdoYXZlLmNzcycsICdwb3NpdGlvbicsICdzdGF0aWMnKVxuICB9KVxuXG4gIGl0KCdjeS5jb250YWlucygpIC0gcXVlcnkgRE9NIGVsZW1lbnRzIHdpdGggbWF0Y2hpbmcgY29udGVudCcsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vY29udGFpbnNcbiAgICBjeS5nZXQoJy5xdWVyeS1saXN0JylcbiAgICAgIC5jb250YWlucygnYmFuYW5hcycpXG4gICAgICAuc2hvdWxkKCdoYXZlLmNsYXNzJywgJ3RoaXJkJylcblxuICAgIC8vIHdlIGNhbiBwYXNzIGEgcmVnZXhwIHRvIGAuY29udGFpbnMoKWBcbiAgICBjeS5nZXQoJy5xdWVyeS1saXN0JylcbiAgICAgIC5jb250YWlucygvXmJcXHcrLylcbiAgICAgIC5zaG91bGQoJ2hhdmUuY2xhc3MnLCAndGhpcmQnKVxuXG4gICAgY3kuZ2V0KCcucXVlcnktbGlzdCcpXG4gICAgICAuY29udGFpbnMoJ2FwcGxlcycpXG4gICAgICAuc2hvdWxkKCdoYXZlLmNsYXNzJywgJ2ZpcnN0JylcblxuICAgIC8vIHBhc3NpbmcgYSBzZWxlY3RvciB0byBjb250YWlucyB3aWxsXG4gICAgLy8geWllbGQgdGhlIHNlbGVjdG9yIGNvbnRhaW5pbmcgdGhlIHRleHRcbiAgICBjeS5nZXQoJyNxdWVyeWluZycpXG4gICAgICAuY29udGFpbnMoJ3VsJywgJ29yYW5nZXMnKVxuICAgICAgLnNob3VsZCgnaGF2ZS5jbGFzcycsICdxdWVyeS1saXN0JylcblxuICAgIGN5LmdldCgnLnF1ZXJ5LWJ1dHRvbicpXG4gICAgICAuY29udGFpbnMoJ1NhdmUgRm9ybScpXG4gICAgICAuc2hvdWxkKCdoYXZlLmNsYXNzJywgJ2J0bicpXG4gIH0pXG5cbiAgaXQoJy53aXRoaW4oKSAtIHF1ZXJ5IERPTSBlbGVtZW50cyB3aXRoaW4gYSBzcGVjaWZpYyBlbGVtZW50JywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby93aXRoaW5cbiAgICBjeS5nZXQoJy5xdWVyeS1mb3JtJykud2l0aGluKCgpID0+IHtcbiAgICAgIGN5LmdldCgnaW5wdXQ6Zmlyc3QnKS5zaG91bGQoJ2hhdmUuYXR0cicsICdwbGFjZWhvbGRlcicsICdFbWFpbCcpXG4gICAgICBjeS5nZXQoJ2lucHV0Omxhc3QnKS5zaG91bGQoJ2hhdmUuYXR0cicsICdwbGFjZWhvbGRlcicsICdQYXNzd29yZCcpXG4gICAgfSlcbiAgfSlcblxuICBpdCgnY3kucm9vdCgpIC0gcXVlcnkgdGhlIHJvb3QgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3Jvb3RcblxuICAgIC8vIEJ5IGRlZmF1bHQsIHJvb3QgaXMgdGhlIGRvY3VtZW50XG4gICAgY3kucm9vdCgpLnNob3VsZCgnbWF0Y2gnLCAnaHRtbCcpXG5cbiAgICBjeS5nZXQoJy5xdWVyeS11bCcpLndpdGhpbigoKSA9PiB7XG4gICAgICAvLyBJbiB0aGlzIHdpdGhpbiwgdGhlIHJvb3QgaXMgbm93IHRoZSB1bCBET00gZWxlbWVudFxuICAgICAgY3kucm9vdCgpLnNob3VsZCgnaGF2ZS5jbGFzcycsICdxdWVyeS11bCcpXG4gICAgfSlcbiAgfSlcblxuICBpdCgnYmVzdCBwcmFjdGljZXMgLSBzZWxlY3RpbmcgZWxlbWVudHMnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2Jlc3QtcHJhY3RpY2VzI1NlbGVjdGluZy1FbGVtZW50c1xuICAgIGN5LmdldCgnW2RhdGEtY3k9YmVzdC1wcmFjdGljZXMtc2VsZWN0aW5nLWVsZW1lbnRzXScpLndpdGhpbigoKSA9PiB7XG4gICAgICAvLyBXb3JzdCAtIHRvbyBnZW5lcmljLCBubyBjb250ZXh0XG4gICAgICBjeS5nZXQoJ2J1dHRvbicpLmNsaWNrKClcblxuICAgICAgLy8gQmFkLiBDb3VwbGVkIHRvIHN0eWxpbmcuIEhpZ2hseSBzdWJqZWN0IHRvIGNoYW5nZS5cbiAgICAgIGN5LmdldCgnLmJ0bi5idG4tbGFyZ2UnKS5jbGljaygpXG5cbiAgICAgIC8vIEF2ZXJhZ2UuIENvdXBsZWQgdG8gdGhlIGBuYW1lYCBhdHRyaWJ1dGUgd2hpY2ggaGFzIEhUTUwgc2VtYW50aWNzLlxuICAgICAgY3kuZ2V0KCdbbmFtZT1zdWJtaXNzaW9uXScpLmNsaWNrKClcblxuICAgICAgLy8gQmV0dGVyLiBCdXQgc3RpbGwgY291cGxlZCB0byBzdHlsaW5nIG9yIEpTIGV2ZW50IGxpc3RlbmVycy5cbiAgICAgIGN5LmdldCgnI21haW4nKS5jbGljaygpXG5cbiAgICAgIC8vIFNsaWdodGx5IGJldHRlci4gVXNlcyBhbiBJRCBidXQgYWxzbyBlbnN1cmVzIHRoZSBlbGVtZW50XG4gICAgICAvLyBoYXMgYW4gQVJJQSByb2xlIGF0dHJpYnV0ZVxuICAgICAgY3kuZ2V0KCcjbWFpbltyb2xlPWJ1dHRvbl0nKS5jbGljaygpXG5cbiAgICAgIC8vIE11Y2ggYmV0dGVyLiBCdXQgc3RpbGwgY291cGxlZCB0byB0ZXh0IGNvbnRlbnQgdGhhdCBtYXkgY2hhbmdlLlxuICAgICAgY3kuY29udGFpbnMoJ1N1Ym1pdCcpLmNsaWNrKClcblxuICAgICAgLy8gQmVzdC4gSW5zdWxhdGVkIGZyb20gYWxsIGNoYW5nZXMuXG4gICAgICBjeS5nZXQoJ1tkYXRhLWN5PXN1Ym1pdF0nKS5jbGljaygpXG4gICAgfSlcbiAgfSlcbn0pXG4iXSwibmFtZXMiOlsiY29udGV4dCIsImJlZm9yZUVhY2giLCJjeSIsInZpc2l0IiwiaXQiLCJnZXQiLCJzaG91bGQiLCJpbnZva2UiLCJhbmQiLCJjb250YWlucyIsIndpdGhpbiIsInJvb3QiLCJjbGljayJdLCJzb3VyY2VSb290IjoiIn0=