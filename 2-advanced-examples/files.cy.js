/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./cypress/fixtures/example.json":
/*!***************************************!*\
  !*** ./cypress/fixtures/example.json ***!
  \***************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"Using fixtures to represent data","email":"hello@cypress.io","body":"Fixtures are a great way to mock data for responses to routes"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/files.cy.js ***!
  \*****************************************************/


/// <reference types="cypress" />

/// JSON fixture file can be loaded directly using
// the built-in JavaScript bundler
const requiredExample = __webpack_require__(/*! ../../fixtures/example */ "./cypress/fixtures/example.json");
context('Files', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/files');

    // load example.json fixture file and store
    // in the test context object
    cy.fixture('example.json').as('example');
  });
  it('cy.fixture() - load a fixture', () => {
    // https://on.cypress.io/fixture

    // Instead of writing a response inline you can
    // use a fixture file's content.

    // when application makes an Ajax request matching "GET **/comments/*"
    // Cypress will intercept it and reply with the object in `example.json` fixture
    cy.intercept('GET', '**/comments/*', {
      fixture: 'example.json'
    }).as('getComment');

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.fixture-btn').click();
    cy.wait('@getComment').its('response.body').should('have.property', 'name').and('include', 'Using fixtures to represent data');
  });
  it('cy.fixture() or require - load a fixture', function () {
    // we are inside the "function () { ... }"
    // callback and can use test context object "this"
    // "this.example" was loaded in "beforeEach" function callback
    expect(this.example, 'fixture in the test context').to.deep.equal(requiredExample);

    // or use "cy.wrap" and "should('deep.equal', ...)" assertion
    cy.wrap(this.example).should('deep.equal', requiredExample);
  });
  it('cy.readFile() - read file contents', () => {
    // https://on.cypress.io/readfile

    // You can read a file and yield its contents
    // The filePath is relative to your project's root.
    cy.readFile(Cypress.config('configFile')).then(config => {
      expect(config).to.be.an('string');
    });
  });
  it('cy.writeFile() - write to a file', () => {
    // https://on.cypress.io/writefile

    // You can write to a file

    // Use a response from a request to automatically
    // generate a fixture file for use later
    cy.request('https://jsonplaceholder.cypress.io/users').then(response => {
      cy.writeFile('cypress/fixtures/users.json', response.body);
    });
    cy.fixture('users').should(users => {
      expect(users[0].name).to.exist;
    });

    // JavaScript arrays and objects are stringified
    // and formatted into text.
    cy.writeFile('cypress/fixtures/profile.json', {
      id: 8739,
      name: 'Jane',
      email: 'jane@example.com'
    });
    cy.fixture('profile').should(profile => {
      expect(profile.name).to.eq('Jane');
    });
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztJQUVGaEMsRUFBRSxDQUFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUNRLE1BQU0sQ0FBRXVCLE9BQU8sSUFBSztNQUN4Q3JCLE1BQU0sQ0FBQ3FCLE9BQU8sQ0FBQ0osSUFBSSxDQUFDLENBQUNmLEVBQUUsQ0FBQ29CLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJhYmFuay1hdXRvbWF0aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BhcmFiYW5rLWF1dG9tYXRpb24vLi9jeXByZXNzL2UyZS8yLWFkdmFuY2VkLWV4YW1wbGVzL2ZpbGVzLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cImN5cHJlc3NcIiAvPlxuXG4vLy8gSlNPTiBmaXh0dXJlIGZpbGUgY2FuIGJlIGxvYWRlZCBkaXJlY3RseSB1c2luZ1xuLy8gdGhlIGJ1aWx0LWluIEphdmFTY3JpcHQgYnVuZGxlclxuY29uc3QgcmVxdWlyZWRFeGFtcGxlID0gcmVxdWlyZSgnLi4vLi4vZml4dHVyZXMvZXhhbXBsZScpXG5cbmNvbnRleHQoJ0ZpbGVzJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8vY29tbWFuZHMvZmlsZXMnKVxuXG4gICAgLy8gbG9hZCBleGFtcGxlLmpzb24gZml4dHVyZSBmaWxlIGFuZCBzdG9yZVxuICAgIC8vIGluIHRoZSB0ZXN0IGNvbnRleHQgb2JqZWN0XG4gICAgY3kuZml4dHVyZSgnZXhhbXBsZS5qc29uJykuYXMoJ2V4YW1wbGUnKVxuICB9KVxuXG4gIGl0KCdjeS5maXh0dXJlKCkgLSBsb2FkIGEgZml4dHVyZScsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vZml4dHVyZVxuXG4gICAgLy8gSW5zdGVhZCBvZiB3cml0aW5nIGEgcmVzcG9uc2UgaW5saW5lIHlvdSBjYW5cbiAgICAvLyB1c2UgYSBmaXh0dXJlIGZpbGUncyBjb250ZW50LlxuXG4gICAgLy8gd2hlbiBhcHBsaWNhdGlvbiBtYWtlcyBhbiBBamF4IHJlcXVlc3QgbWF0Y2hpbmcgXCJHRVQgKiovY29tbWVudHMvKlwiXG4gICAgLy8gQ3lwcmVzcyB3aWxsIGludGVyY2VwdCBpdCBhbmQgcmVwbHkgd2l0aCB0aGUgb2JqZWN0IGluIGBleGFtcGxlLmpzb25gIGZpeHR1cmVcbiAgICBjeS5pbnRlcmNlcHQoJ0dFVCcsICcqKi9jb21tZW50cy8qJywgeyBmaXh0dXJlOiAnZXhhbXBsZS5qc29uJyB9KS5hcygnZ2V0Q29tbWVudCcpXG5cbiAgICAvLyB3ZSBoYXZlIGNvZGUgdGhhdCBnZXRzIGEgY29tbWVudCB3aGVuXG4gICAgLy8gdGhlIGJ1dHRvbiBpcyBjbGlja2VkIGluIHNjcmlwdHMuanNcbiAgICBjeS5nZXQoJy5maXh0dXJlLWJ0bicpLmNsaWNrKClcblxuICAgIGN5LndhaXQoJ0BnZXRDb21tZW50JykuaXRzKCdyZXNwb25zZS5ib2R5JylcbiAgICAgIC5zaG91bGQoJ2hhdmUucHJvcGVydHknLCAnbmFtZScpXG4gICAgICAuYW5kKCdpbmNsdWRlJywgJ1VzaW5nIGZpeHR1cmVzIHRvIHJlcHJlc2VudCBkYXRhJylcbiAgfSlcblxuICBpdCgnY3kuZml4dHVyZSgpIG9yIHJlcXVpcmUgLSBsb2FkIGEgZml4dHVyZScsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyB3ZSBhcmUgaW5zaWRlIHRoZSBcImZ1bmN0aW9uICgpIHsgLi4uIH1cIlxuICAgIC8vIGNhbGxiYWNrIGFuZCBjYW4gdXNlIHRlc3QgY29udGV4dCBvYmplY3QgXCJ0aGlzXCJcbiAgICAvLyBcInRoaXMuZXhhbXBsZVwiIHdhcyBsb2FkZWQgaW4gXCJiZWZvcmVFYWNoXCIgZnVuY3Rpb24gY2FsbGJhY2tcbiAgICBleHBlY3QodGhpcy5leGFtcGxlLCAnZml4dHVyZSBpbiB0aGUgdGVzdCBjb250ZXh0JylcbiAgICAgIC50by5kZWVwLmVxdWFsKHJlcXVpcmVkRXhhbXBsZSlcblxuICAgIC8vIG9yIHVzZSBcImN5LndyYXBcIiBhbmQgXCJzaG91bGQoJ2RlZXAuZXF1YWwnLCAuLi4pXCIgYXNzZXJ0aW9uXG4gICAgY3kud3JhcCh0aGlzLmV4YW1wbGUpXG4gICAgICAuc2hvdWxkKCdkZWVwLmVxdWFsJywgcmVxdWlyZWRFeGFtcGxlKVxuICB9KVxuXG4gIGl0KCdjeS5yZWFkRmlsZSgpIC0gcmVhZCBmaWxlIGNvbnRlbnRzJywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9yZWFkZmlsZVxuXG4gICAgLy8gWW91IGNhbiByZWFkIGEgZmlsZSBhbmQgeWllbGQgaXRzIGNvbnRlbnRzXG4gICAgLy8gVGhlIGZpbGVQYXRoIGlzIHJlbGF0aXZlIHRvIHlvdXIgcHJvamVjdCdzIHJvb3QuXG4gICAgY3kucmVhZEZpbGUoQ3lwcmVzcy5jb25maWcoJ2NvbmZpZ0ZpbGUnKSkudGhlbigoY29uZmlnKSA9PiB7XG4gICAgICBleHBlY3QoY29uZmlnKS50by5iZS5hbignc3RyaW5nJylcbiAgICB9KVxuICB9KVxuXG4gIGl0KCdjeS53cml0ZUZpbGUoKSAtIHdyaXRlIHRvIGEgZmlsZScsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vd3JpdGVmaWxlXG5cbiAgICAvLyBZb3UgY2FuIHdyaXRlIHRvIGEgZmlsZVxuXG4gICAgLy8gVXNlIGEgcmVzcG9uc2UgZnJvbSBhIHJlcXVlc3QgdG8gYXV0b21hdGljYWxseVxuICAgIC8vIGdlbmVyYXRlIGEgZml4dHVyZSBmaWxlIGZvciB1c2UgbGF0ZXJcbiAgICBjeS5yZXF1ZXN0KCdodHRwczovL2pzb25wbGFjZWhvbGRlci5jeXByZXNzLmlvL3VzZXJzJylcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjeS53cml0ZUZpbGUoJ2N5cHJlc3MvZml4dHVyZXMvdXNlcnMuanNvbicsIHJlc3BvbnNlLmJvZHkpXG4gICAgICB9KVxuXG4gICAgY3kuZml4dHVyZSgndXNlcnMnKS5zaG91bGQoKHVzZXJzKSA9PiB7XG4gICAgICBleHBlY3QodXNlcnNbMF0ubmFtZSkudG8uZXhpc3RcbiAgICB9KVxuXG4gICAgLy8gSmF2YVNjcmlwdCBhcnJheXMgYW5kIG9iamVjdHMgYXJlIHN0cmluZ2lmaWVkXG4gICAgLy8gYW5kIGZvcm1hdHRlZCBpbnRvIHRleHQuXG4gICAgY3kud3JpdGVGaWxlKCdjeXByZXNzL2ZpeHR1cmVzL3Byb2ZpbGUuanNvbicsIHtcbiAgICAgIGlkOiA4NzM5LFxuICAgICAgbmFtZTogJ0phbmUnLFxuICAgICAgZW1haWw6ICdqYW5lQGV4YW1wbGUuY29tJyxcbiAgICB9KVxuXG4gICAgY3kuZml4dHVyZSgncHJvZmlsZScpLnNob3VsZCgocHJvZmlsZSkgPT4ge1xuICAgICAgZXhwZWN0KHByb2ZpbGUubmFtZSkudG8uZXEoJ0phbmUnKVxuICAgIH0pXG4gIH0pXG59KVxuIl0sIm5hbWVzIjpbInJlcXVpcmVkRXhhbXBsZSIsInJlcXVpcmUiLCJjb250ZXh0IiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJmaXh0dXJlIiwiYXMiLCJpdCIsImludGVyY2VwdCIsImdldCIsImNsaWNrIiwid2FpdCIsIml0cyIsInNob3VsZCIsImFuZCIsImV4cGVjdCIsImV4YW1wbGUiLCJ0byIsImRlZXAiLCJlcXVhbCIsIndyYXAiLCJyZWFkRmlsZSIsIkN5cHJlc3MiLCJjb25maWciLCJ0aGVuIiwiYmUiLCJhbiIsInJlcXVlc3QiLCJyZXNwb25zZSIsIndyaXRlRmlsZSIsImJvZHkiLCJ1c2VycyIsIm5hbWUiLCJleGlzdCIsImlkIiwiZW1haWwiLCJwcm9maWxlIiwiZXEiXSwic291cmNlUm9vdCI6IiJ9