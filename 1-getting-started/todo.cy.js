/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**************************************************!*\
  !*** ./cypress/e2e/1-getting-started/todo.cy.js ***!
  \**************************************************/


/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://example.cypress.io/todo');
  });
  it('displays two todo items by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('.todo-list li').should('have.length', 2);

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
  });
  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the cat';

    // Let's get the input element and use the `type` command to
    // input our new list item. After typing the content of our item,
    // we need to type the enter key as well in order to submit the input.
    // This input has a data-test attribute so we'll use that to select the
    // element in accordance with best practices:
    // https://on.cypress.io/selecting-elements
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);

    // Now that we've typed our new item, let's check that it actually was added to the list.
    // Since it's the newest item, it should exist as the last element in the list.
    // In addition, with the two default items, we should have a total of 3 elements in the list.
    // Since assertions yield the element that was asserted on,
    // we can chain both of these assertions together into a single statement.
    cy.get('.todo-list li').should('have.length', 3).last().should('have.text', newItem);
  });
  it('can check off an item as completed', () => {
    // In addition to using the `get` command to get an element by selector,
    // we can also use the `contains` command to get an element by its contents.
    // However, this will yield the <label>, which is lowest-level element that contains the text.
    // In order to check the item, we'll find the <input> element for this <label>
    // by traversing up the dom to the parent element. From there, we can `find`
    // the child checkbox <input> element and use the `check` command to check it.
    cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check();

    // Now that we've checked the button, we can go ahead and make sure
    // that the list element is now marked as completed.
    // Again we'll use `contains` to find the <label> element and then use the `parents` command
    // to traverse multiple levels up the dom until we find the corresponding <li> element.
    // Once we get that element, we can assert that it has the completed class.
    cy.contains('Pay electric bill').parents('li').should('have.class', 'completed');
  });
  context('with a checked task', () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.
      cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check();
    });
    it('can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      cy.contains('Active').click();

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      cy.get('.todo-list li').should('have.length', 1).first().should('have.text', 'Walk the dog');

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      cy.contains('Pay electric bill').should('not.exist');
    });
    it('can filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains('Completed').click();
      cy.get('.todo-list li').should('have.length', 1).first().should('have.text', 'Pay electric bill');
      cy.contains('Walk the dog').should('not.exist');
    });
    it('can delete all completed tasks', () => {
      // First, let's click the "Clear completed" button
      // `contains` is actually serving two purposes here.
      // First, it's ensuring that the button exists within the dom.
      // This button only appears when at least one task is checked
      // so this command is implicitly verifying that it does exist.
      // Second, it selects the button so we can click it.
      cy.contains('Clear completed').click();

      // Then we can make sure that there is only one element
      // in the list and our element does not exist
      cy.get('.todo-list li').should('have.length', 1).should('not.have.text', 'Pay electric bill');

      // Finally, make sure that the clear button no longer exists.
      cy.contains('Clear completed').should('not.exist');
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUZGLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxNQUFNO01BQ3pDO01BQ0E7TUFDQUYsRUFBRSxDQUFDUyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUNNLEtBQUssQ0FBQyxDQUFDO01BRWhDZixFQUFFLENBQUNHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FDcEJDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQ3hCQyxLQUFLLENBQUMsQ0FBQyxDQUNQRCxNQUFNLENBQUMsV0FBVyxFQUFFLG1CQUFtQixDQUFDO01BRTNDSixFQUFFLENBQUNTLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNqRCxDQUFDLENBQUM7SUFFRkYsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLE1BQU07TUFDekM7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0FGLEVBQUUsQ0FBQ1MsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUNNLEtBQUssQ0FBQyxDQUFDOztNQUV0QztNQUNBO01BQ0FmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUNwQkMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FDeEJBLE1BQU0sQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLENBQUM7O01BRS9DO01BQ0FKLEVBQUUsQ0FBQ1MsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDcEQsQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJhYmFuay1hdXRvbWF0aW9uLy4vY3lwcmVzcy9lMmUvMS1nZXR0aW5nLXN0YXJ0ZWQvdG9kby5jeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cImN5cHJlc3NcIiAvPlxuXG4vLyBXZWxjb21lIHRvIEN5cHJlc3MhXG4vL1xuLy8gVGhpcyBzcGVjIGZpbGUgY29udGFpbnMgYSB2YXJpZXR5IG9mIHNhbXBsZSB0ZXN0c1xuLy8gZm9yIGEgdG9kbyBsaXN0IGFwcCB0aGF0IGFyZSBkZXNpZ25lZCB0byBkZW1vbnN0cmF0ZVxuLy8gdGhlIHBvd2VyIG9mIHdyaXRpbmcgdGVzdHMgaW4gQ3lwcmVzcy5cbi8vXG4vLyBUbyBsZWFybiBtb3JlIGFib3V0IGhvdyBDeXByZXNzIHdvcmtzIGFuZFxuLy8gd2hhdCBtYWtlcyBpdCBzdWNoIGFuIGF3ZXNvbWUgdGVzdGluZyB0b29sLFxuLy8gcGxlYXNlIHJlYWQgb3VyIGdldHRpbmcgc3RhcnRlZCBndWlkZTpcbi8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9pbnRyb2R1Y3Rpb24tdG8tY3lwcmVzc1xuXG5kZXNjcmliZSgnZXhhbXBsZSB0by1kbyBhcHAnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIC8vIEN5cHJlc3Mgc3RhcnRzIG91dCB3aXRoIGEgYmxhbmsgc2xhdGUgZm9yIGVhY2ggdGVzdFxuICAgIC8vIHNvIHdlIG11c3QgdGVsbCBpdCB0byB2aXNpdCBvdXIgd2Vic2l0ZSB3aXRoIHRoZSBgY3kudmlzaXQoKWAgY29tbWFuZC5cbiAgICAvLyBTaW5jZSB3ZSB3YW50IHRvIHZpc2l0IHRoZSBzYW1lIFVSTCBhdCB0aGUgc3RhcnQgb2YgYWxsIG91ciB0ZXN0cyxcbiAgICAvLyB3ZSBpbmNsdWRlIGl0IGluIG91ciBiZWZvcmVFYWNoIGZ1bmN0aW9uIHNvIHRoYXQgaXQgcnVucyBiZWZvcmUgZWFjaCB0ZXN0XG4gICAgY3kudmlzaXQoJ2h0dHBzOi8vZXhhbXBsZS5jeXByZXNzLmlvL3RvZG8nKVxuICB9KVxuXG4gIGl0KCdkaXNwbGF5cyB0d28gdG9kbyBpdGVtcyBieSBkZWZhdWx0JywgKCkgPT4ge1xuICAgIC8vIFdlIHVzZSB0aGUgYGN5LmdldCgpYCBjb21tYW5kIHRvIGdldCBhbGwgZWxlbWVudHMgdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3IuXG4gICAgLy8gVGhlbiwgd2UgdXNlIGBzaG91bGRgIHRvIGFzc2VydCB0aGF0IHRoZXJlIGFyZSB0d28gbWF0Y2hlZCBpdGVtcyxcbiAgICAvLyB3aGljaCBhcmUgdGhlIHR3byBkZWZhdWx0IGl0ZW1zLlxuICAgIGN5LmdldCgnLnRvZG8tbGlzdCBsaScpLnNob3VsZCgnaGF2ZS5sZW5ndGgnLCAyKVxuXG4gICAgLy8gV2UgY2FuIGdvIGV2ZW4gZnVydGhlciBhbmQgY2hlY2sgdGhhdCB0aGUgZGVmYXVsdCB0b2RvcyBlYWNoIGNvbnRhaW5cbiAgICAvLyB0aGUgY29ycmVjdCB0ZXh0LiBXZSB1c2UgdGhlIGBmaXJzdGAgYW5kIGBsYXN0YCBmdW5jdGlvbnNcbiAgICAvLyB0byBnZXQganVzdCB0aGUgZmlyc3QgYW5kIGxhc3QgbWF0Y2hlZCBlbGVtZW50cyBpbmRpdmlkdWFsbHksXG4gICAgLy8gYW5kIHRoZW4gcGVyZm9ybSBhbiBhc3NlcnRpb24gd2l0aCBgc2hvdWxkYC5cbiAgICBjeS5nZXQoJy50b2RvLWxpc3QgbGknKS5maXJzdCgpLnNob3VsZCgnaGF2ZS50ZXh0JywgJ1BheSBlbGVjdHJpYyBiaWxsJylcbiAgICBjeS5nZXQoJy50b2RvLWxpc3QgbGknKS5sYXN0KCkuc2hvdWxkKCdoYXZlLnRleHQnLCAnV2FsayB0aGUgZG9nJylcbiAgfSlcblxuICBpdCgnY2FuIGFkZCBuZXcgdG9kbyBpdGVtcycsICgpID0+IHtcbiAgICAvLyBXZSdsbCBzdG9yZSBvdXIgaXRlbSB0ZXh0IGluIGEgdmFyaWFibGUgc28gd2UgY2FuIHJldXNlIGl0XG4gICAgY29uc3QgbmV3SXRlbSA9ICdGZWVkIHRoZSBjYXQnXG5cbiAgICAvLyBMZXQncyBnZXQgdGhlIGlucHV0IGVsZW1lbnQgYW5kIHVzZSB0aGUgYHR5cGVgIGNvbW1hbmQgdG9cbiAgICAvLyBpbnB1dCBvdXIgbmV3IGxpc3QgaXRlbS4gQWZ0ZXIgdHlwaW5nIHRoZSBjb250ZW50IG9mIG91ciBpdGVtLFxuICAgIC8vIHdlIG5lZWQgdG8gdHlwZSB0aGUgZW50ZXIga2V5IGFzIHdlbGwgaW4gb3JkZXIgdG8gc3VibWl0IHRoZSBpbnB1dC5cbiAgICAvLyBUaGlzIGlucHV0IGhhcyBhIGRhdGEtdGVzdCBhdHRyaWJ1dGUgc28gd2UnbGwgdXNlIHRoYXQgdG8gc2VsZWN0IHRoZVxuICAgIC8vIGVsZW1lbnQgaW4gYWNjb3JkYW5jZSB3aXRoIGJlc3QgcHJhY3RpY2VzOlxuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9zZWxlY3RpbmctZWxlbWVudHNcbiAgICBjeS5nZXQoJ1tkYXRhLXRlc3Q9bmV3LXRvZG9dJykudHlwZShgJHtuZXdJdGVtfXtlbnRlcn1gKVxuXG4gICAgLy8gTm93IHRoYXQgd2UndmUgdHlwZWQgb3VyIG5ldyBpdGVtLCBsZXQncyBjaGVjayB0aGF0IGl0IGFjdHVhbGx5IHdhcyBhZGRlZCB0byB0aGUgbGlzdC5cbiAgICAvLyBTaW5jZSBpdCdzIHRoZSBuZXdlc3QgaXRlbSwgaXQgc2hvdWxkIGV4aXN0IGFzIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3QuXG4gICAgLy8gSW4gYWRkaXRpb24sIHdpdGggdGhlIHR3byBkZWZhdWx0IGl0ZW1zLCB3ZSBzaG91bGQgaGF2ZSBhIHRvdGFsIG9mIDMgZWxlbWVudHMgaW4gdGhlIGxpc3QuXG4gICAgLy8gU2luY2UgYXNzZXJ0aW9ucyB5aWVsZCB0aGUgZWxlbWVudCB0aGF0IHdhcyBhc3NlcnRlZCBvbixcbiAgICAvLyB3ZSBjYW4gY2hhaW4gYm90aCBvZiB0aGVzZSBhc3NlcnRpb25zIHRvZ2V0aGVyIGludG8gYSBzaW5nbGUgc3RhdGVtZW50LlxuICAgIGN5LmdldCgnLnRvZG8tbGlzdCBsaScpXG4gICAgICAuc2hvdWxkKCdoYXZlLmxlbmd0aCcsIDMpXG4gICAgICAubGFzdCgpXG4gICAgICAuc2hvdWxkKCdoYXZlLnRleHQnLCBuZXdJdGVtKVxuICB9KVxuXG4gIGl0KCdjYW4gY2hlY2sgb2ZmIGFuIGl0ZW0gYXMgY29tcGxldGVkJywgKCkgPT4ge1xuICAgIC8vIEluIGFkZGl0aW9uIHRvIHVzaW5nIHRoZSBgZ2V0YCBjb21tYW5kIHRvIGdldCBhbiBlbGVtZW50IGJ5IHNlbGVjdG9yLFxuICAgIC8vIHdlIGNhbiBhbHNvIHVzZSB0aGUgYGNvbnRhaW5zYCBjb21tYW5kIHRvIGdldCBhbiBlbGVtZW50IGJ5IGl0cyBjb250ZW50cy5cbiAgICAvLyBIb3dldmVyLCB0aGlzIHdpbGwgeWllbGQgdGhlIDxsYWJlbD4sIHdoaWNoIGlzIGxvd2VzdC1sZXZlbCBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIHRleHQuXG4gICAgLy8gSW4gb3JkZXIgdG8gY2hlY2sgdGhlIGl0ZW0sIHdlJ2xsIGZpbmQgdGhlIDxpbnB1dD4gZWxlbWVudCBmb3IgdGhpcyA8bGFiZWw+XG4gICAgLy8gYnkgdHJhdmVyc2luZyB1cCB0aGUgZG9tIHRvIHRoZSBwYXJlbnQgZWxlbWVudC4gRnJvbSB0aGVyZSwgd2UgY2FuIGBmaW5kYFxuICAgIC8vIHRoZSBjaGlsZCBjaGVja2JveCA8aW5wdXQ+IGVsZW1lbnQgYW5kIHVzZSB0aGUgYGNoZWNrYCBjb21tYW5kIHRvIGNoZWNrIGl0LlxuICAgIGN5LmNvbnRhaW5zKCdQYXkgZWxlY3RyaWMgYmlsbCcpXG4gICAgICAucGFyZW50KClcbiAgICAgIC5maW5kKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpXG4gICAgICAuY2hlY2soKVxuXG4gICAgLy8gTm93IHRoYXQgd2UndmUgY2hlY2tlZCB0aGUgYnV0dG9uLCB3ZSBjYW4gZ28gYWhlYWQgYW5kIG1ha2Ugc3VyZVxuICAgIC8vIHRoYXQgdGhlIGxpc3QgZWxlbWVudCBpcyBub3cgbWFya2VkIGFzIGNvbXBsZXRlZC5cbiAgICAvLyBBZ2FpbiB3ZSdsbCB1c2UgYGNvbnRhaW5zYCB0byBmaW5kIHRoZSA8bGFiZWw+IGVsZW1lbnQgYW5kIHRoZW4gdXNlIHRoZSBgcGFyZW50c2AgY29tbWFuZFxuICAgIC8vIHRvIHRyYXZlcnNlIG11bHRpcGxlIGxldmVscyB1cCB0aGUgZG9tIHVudGlsIHdlIGZpbmQgdGhlIGNvcnJlc3BvbmRpbmcgPGxpPiBlbGVtZW50LlxuICAgIC8vIE9uY2Ugd2UgZ2V0IHRoYXQgZWxlbWVudCwgd2UgY2FuIGFzc2VydCB0aGF0IGl0IGhhcyB0aGUgY29tcGxldGVkIGNsYXNzLlxuICAgIGN5LmNvbnRhaW5zKCdQYXkgZWxlY3RyaWMgYmlsbCcpXG4gICAgICAucGFyZW50cygnbGknKVxuICAgICAgLnNob3VsZCgnaGF2ZS5jbGFzcycsICdjb21wbGV0ZWQnKVxuICB9KVxuXG4gIGNvbnRleHQoJ3dpdGggYSBjaGVja2VkIHRhc2snLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAvLyBXZSdsbCB0YWtlIHRoZSBjb21tYW5kIHdlIHVzZWQgYWJvdmUgdG8gY2hlY2sgb2ZmIGFuIGVsZW1lbnRcbiAgICAgIC8vIFNpbmNlIHdlIHdhbnQgdG8gcGVyZm9ybSBtdWx0aXBsZSB0ZXN0cyB0aGF0IHN0YXJ0IHdpdGggY2hlY2tpbmdcbiAgICAgIC8vIG9uZSBlbGVtZW50LCB3ZSBwdXQgaXQgaW4gdGhlIGJlZm9yZUVhY2ggaG9va1xuICAgICAgLy8gc28gdGhhdCBpdCBydW5zIGF0IHRoZSBzdGFydCBvZiBldmVyeSB0ZXN0LlxuICAgICAgY3kuY29udGFpbnMoJ1BheSBlbGVjdHJpYyBiaWxsJylcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpXG4gICAgICAgIC5jaGVjaygpXG4gICAgfSlcblxuICAgIGl0KCdjYW4gZmlsdGVyIGZvciB1bmNvbXBsZXRlZCB0YXNrcycsICgpID0+IHtcbiAgICAgIC8vIFdlJ2xsIGNsaWNrIG9uIHRoZSBcImFjdGl2ZVwiIGJ1dHRvbiBpbiBvcmRlciB0b1xuICAgICAgLy8gZGlzcGxheSBvbmx5IGluY29tcGxldGUgaXRlbXNcbiAgICAgIGN5LmNvbnRhaW5zKCdBY3RpdmUnKS5jbGljaygpXG5cbiAgICAgIC8vIEFmdGVyIGZpbHRlcmluZywgd2UgY2FuIGFzc2VydCB0aGF0IHRoZXJlIGlzIG9ubHkgdGhlIG9uZVxuICAgICAgLy8gaW5jb21wbGV0ZSBpdGVtIGluIHRoZSBsaXN0LlxuICAgICAgY3kuZ2V0KCcudG9kby1saXN0IGxpJylcbiAgICAgICAgLnNob3VsZCgnaGF2ZS5sZW5ndGgnLCAxKVxuICAgICAgICAuZmlyc3QoKVxuICAgICAgICAuc2hvdWxkKCdoYXZlLnRleHQnLCAnV2FsayB0aGUgZG9nJylcblxuICAgICAgLy8gRm9yIGdvb2QgbWVhc3VyZSwgbGV0J3MgYWxzbyBhc3NlcnQgdGhhdCB0aGUgdGFzayB3ZSBjaGVja2VkIG9mZlxuICAgICAgLy8gZG9lcyBub3QgZXhpc3Qgb24gdGhlIHBhZ2UuXG4gICAgICBjeS5jb250YWlucygnUGF5IGVsZWN0cmljIGJpbGwnKS5zaG91bGQoJ25vdC5leGlzdCcpXG4gICAgfSlcblxuICAgIGl0KCdjYW4gZmlsdGVyIGZvciBjb21wbGV0ZWQgdGFza3MnLCAoKSA9PiB7XG4gICAgICAvLyBXZSBjYW4gcGVyZm9ybSBzaW1pbGFyIHN0ZXBzIGFzIHRoZSB0ZXN0IGFib3ZlIHRvIGVuc3VyZVxuICAgICAgLy8gdGhhdCBvbmx5IGNvbXBsZXRlZCB0YXNrcyBhcmUgc2hvd25cbiAgICAgIGN5LmNvbnRhaW5zKCdDb21wbGV0ZWQnKS5jbGljaygpXG5cbiAgICAgIGN5LmdldCgnLnRvZG8tbGlzdCBsaScpXG4gICAgICAgIC5zaG91bGQoJ2hhdmUubGVuZ3RoJywgMSlcbiAgICAgICAgLmZpcnN0KClcbiAgICAgICAgLnNob3VsZCgnaGF2ZS50ZXh0JywgJ1BheSBlbGVjdHJpYyBiaWxsJylcblxuICAgICAgY3kuY29udGFpbnMoJ1dhbGsgdGhlIGRvZycpLnNob3VsZCgnbm90LmV4aXN0JylcbiAgICB9KVxuXG4gICAgaXQoJ2NhbiBkZWxldGUgYWxsIGNvbXBsZXRlZCB0YXNrcycsICgpID0+IHtcbiAgICAgIC8vIEZpcnN0LCBsZXQncyBjbGljayB0aGUgXCJDbGVhciBjb21wbGV0ZWRcIiBidXR0b25cbiAgICAgIC8vIGBjb250YWluc2AgaXMgYWN0dWFsbHkgc2VydmluZyB0d28gcHVycG9zZXMgaGVyZS5cbiAgICAgIC8vIEZpcnN0LCBpdCdzIGVuc3VyaW5nIHRoYXQgdGhlIGJ1dHRvbiBleGlzdHMgd2l0aGluIHRoZSBkb20uXG4gICAgICAvLyBUaGlzIGJ1dHRvbiBvbmx5IGFwcGVhcnMgd2hlbiBhdCBsZWFzdCBvbmUgdGFzayBpcyBjaGVja2VkXG4gICAgICAvLyBzbyB0aGlzIGNvbW1hbmQgaXMgaW1wbGljaXRseSB2ZXJpZnlpbmcgdGhhdCBpdCBkb2VzIGV4aXN0LlxuICAgICAgLy8gU2Vjb25kLCBpdCBzZWxlY3RzIHRoZSBidXR0b24gc28gd2UgY2FuIGNsaWNrIGl0LlxuICAgICAgY3kuY29udGFpbnMoJ0NsZWFyIGNvbXBsZXRlZCcpLmNsaWNrKClcblxuICAgICAgLy8gVGhlbiB3ZSBjYW4gbWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgb25seSBvbmUgZWxlbWVudFxuICAgICAgLy8gaW4gdGhlIGxpc3QgYW5kIG91ciBlbGVtZW50IGRvZXMgbm90IGV4aXN0XG4gICAgICBjeS5nZXQoJy50b2RvLWxpc3QgbGknKVxuICAgICAgICAuc2hvdWxkKCdoYXZlLmxlbmd0aCcsIDEpXG4gICAgICAgIC5zaG91bGQoJ25vdC5oYXZlLnRleHQnLCAnUGF5IGVsZWN0cmljIGJpbGwnKVxuXG4gICAgICAvLyBGaW5hbGx5LCBtYWtlIHN1cmUgdGhhdCB0aGUgY2xlYXIgYnV0dG9uIG5vIGxvbmdlciBleGlzdHMuXG4gICAgICBjeS5jb250YWlucygnQ2xlYXIgY29tcGxldGVkJykuc2hvdWxkKCdub3QuZXhpc3QnKVxuICAgIH0pXG4gIH0pXG59KVxuIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJpdCIsImdldCIsInNob3VsZCIsImZpcnN0IiwibGFzdCIsIm5ld0l0ZW0iLCJ0eXBlIiwiY29udGFpbnMiLCJwYXJlbnQiLCJmaW5kIiwiY2hlY2siLCJwYXJlbnRzIiwiY29udGV4dCIsImNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==