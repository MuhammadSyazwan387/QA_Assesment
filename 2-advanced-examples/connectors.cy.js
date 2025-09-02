/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/connectors.cy.js ***!
  \**********************************************************/


/// <reference types="cypress" />

context('Connectors', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/connectors');
  });
  it('.each() - iterate over an array of elements', () => {
    // https://on.cypress.io/each
    cy.get('.connectors-each-ul>li').each(($el, index, $list) => {
      console.log($el, index, $list);
    });
  });
  it('.its() - get properties on the current subject', () => {
    // https://on.cypress.io/its
    cy.get('.connectors-its-ul>li')
    // calls the 'length' property yielding that value
    .its('length').should('be.gt', 2);
  });
  it('.invoke() - invoke a function on the current subject', () => {
    // our div is hidden in our script.js
    // $('.connectors-div').hide()
    cy.get('.connectors-div').should('be.hidden');

    // https://on.cypress.io/invoke
    // call the jquery method 'show' on the 'div.container'
    cy.get('.connectors-div').invoke('show');
    cy.get('.connectors-div').should('be.visible');
  });
  it('.spread() - spread an array as individual args to callback function', () => {
    // https://on.cypress.io/spread
    const arr = ['foo', 'bar', 'baz'];
    cy.wrap(arr).spread((foo, bar, baz) => {
      expect(foo).to.eq('foo');
      expect(bar).to.eq('bar');
      expect(baz).to.eq('baz');
    });
  });
  describe('.then()', () => {
    it('invokes a callback function with the current subject', () => {
      // https://on.cypress.io/then
      cy.get('.connectors-list > li').then($lis => {
        expect($lis, '3 items').to.have.length(3);
        expect($lis.eq(0), 'first item').to.contain('Walk the dog');
        expect($lis.eq(1), 'second item').to.contain('Feed the cat');
        expect($lis.eq(2), 'third item').to.contain('Write JavaScript');
      });
    });
    it('yields the returned value to the next command', () => {
      cy.wrap(1).then(num => {
        expect(num).to.equal(1);
        return 2;
      }).then(num => {
        expect(num).to.equal(2);
      });
    });
    it('yields the original subject without return', () => {
      cy.wrap(1).then(num => {
        expect(num).to.equal(1);
        // note that nothing is returned from this callback
      }).then(num => {
        // this callback receives the original unchanged value 1
        expect(num).to.equal(1);
      });
    });
    it('yields the value yielded by the last Cypress command inside', () => {
      cy.wrap(1).then(num => {
        expect(num).to.equal(1);
        // note how we run a Cypress command
        // the result yielded by this Cypress command
        // will be passed to the second ".then"
        cy.wrap(2);
      }).then(num => {
        // this callback receives the value yielded by "cy.wrap(2)"
        expect(num).to.equal(2);
      });
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLENBQUNTLEdBQUcsQ0FBQyxDQUFDUixFQUFFLENBQUNTLEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDekIsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJhYmFuay1hdXRvbWF0aW9uLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy9jb25uZWN0b3JzLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY3lwcmVzc1wiIC8+XG5cbmNvbnRleHQoJ0Nvbm5lY3RvcnMnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGN5LnZpc2l0KCdodHRwczovL2V4YW1wbGUuY3lwcmVzcy5pby9jb21tYW5kcy9jb25uZWN0b3JzJylcbiAgfSlcblxuICBpdCgnLmVhY2goKSAtIGl0ZXJhdGUgb3ZlciBhbiBhcnJheSBvZiBlbGVtZW50cycsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vZWFjaFxuICAgIGN5LmdldCgnLmNvbm5lY3RvcnMtZWFjaC11bD5saScpXG4gICAgICAuZWFjaCgoJGVsLCBpbmRleCwgJGxpc3QpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJGVsLCBpbmRleCwgJGxpc3QpXG4gICAgICB9KVxuICB9KVxuXG4gIGl0KCcuaXRzKCkgLSBnZXQgcHJvcGVydGllcyBvbiB0aGUgY3VycmVudCBzdWJqZWN0JywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9pdHNcbiAgICBjeS5nZXQoJy5jb25uZWN0b3JzLWl0cy11bD5saScpXG4gICAgICAvLyBjYWxscyB0aGUgJ2xlbmd0aCcgcHJvcGVydHkgeWllbGRpbmcgdGhhdCB2YWx1ZVxuICAgICAgLml0cygnbGVuZ3RoJylcbiAgICAgIC5zaG91bGQoJ2JlLmd0JywgMilcbiAgfSlcblxuICBpdCgnLmludm9rZSgpIC0gaW52b2tlIGEgZnVuY3Rpb24gb24gdGhlIGN1cnJlbnQgc3ViamVjdCcsICgpID0+IHtcbiAgICAvLyBvdXIgZGl2IGlzIGhpZGRlbiBpbiBvdXIgc2NyaXB0LmpzXG4gICAgLy8gJCgnLmNvbm5lY3RvcnMtZGl2JykuaGlkZSgpXG4gICAgY3kuZ2V0KCcuY29ubmVjdG9ycy1kaXYnKS5zaG91bGQoJ2JlLmhpZGRlbicpXG5cbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vaW52b2tlXG4gICAgLy8gY2FsbCB0aGUganF1ZXJ5IG1ldGhvZCAnc2hvdycgb24gdGhlICdkaXYuY29udGFpbmVyJ1xuICAgIGN5LmdldCgnLmNvbm5lY3RvcnMtZGl2JykuaW52b2tlKCdzaG93JylcblxuICAgIGN5LmdldCgnLmNvbm5lY3RvcnMtZGl2Jykuc2hvdWxkKCdiZS52aXNpYmxlJylcbiAgfSlcblxuICBpdCgnLnNwcmVhZCgpIC0gc3ByZWFkIGFuIGFycmF5IGFzIGluZGl2aWR1YWwgYXJncyB0byBjYWxsYmFjayBmdW5jdGlvbicsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vc3ByZWFkXG4gICAgY29uc3QgYXJyID0gWydmb28nLCAnYmFyJywgJ2JheiddXG5cbiAgICBjeS53cmFwKGFycikuc3ByZWFkKChmb28sIGJhciwgYmF6KSA9PiB7XG4gICAgICBleHBlY3QoZm9vKS50by5lcSgnZm9vJylcbiAgICAgIGV4cGVjdChiYXIpLnRvLmVxKCdiYXInKVxuICAgICAgZXhwZWN0KGJheikudG8uZXEoJ2JheicpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnLnRoZW4oKScsICgpID0+IHtcbiAgICBpdCgnaW52b2tlcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIGN1cnJlbnQgc3ViamVjdCcsICgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby90aGVuXG4gICAgICBjeS5nZXQoJy5jb25uZWN0b3JzLWxpc3QgPiBsaScpXG4gICAgICAgIC50aGVuKCgkbGlzKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KCRsaXMsICczIGl0ZW1zJykudG8uaGF2ZS5sZW5ndGgoMylcbiAgICAgICAgICBleHBlY3QoJGxpcy5lcSgwKSwgJ2ZpcnN0IGl0ZW0nKS50by5jb250YWluKCdXYWxrIHRoZSBkb2cnKVxuICAgICAgICAgIGV4cGVjdCgkbGlzLmVxKDEpLCAnc2Vjb25kIGl0ZW0nKS50by5jb250YWluKCdGZWVkIHRoZSBjYXQnKVxuICAgICAgICAgIGV4cGVjdCgkbGlzLmVxKDIpLCAndGhpcmQgaXRlbScpLnRvLmNvbnRhaW4oJ1dyaXRlIEphdmFTY3JpcHQnKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBpdCgneWllbGRzIHRoZSByZXR1cm5lZCB2YWx1ZSB0byB0aGUgbmV4dCBjb21tYW5kJywgKCkgPT4ge1xuICAgICAgY3kud3JhcCgxKVxuICAgICAgICAudGhlbigobnVtKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG51bSkudG8uZXF1YWwoMSlcblxuICAgICAgICAgIHJldHVybiAyXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChudW0pID0+IHtcbiAgICAgICAgICBleHBlY3QobnVtKS50by5lcXVhbCgyKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBpdCgneWllbGRzIHRoZSBvcmlnaW5hbCBzdWJqZWN0IHdpdGhvdXQgcmV0dXJuJywgKCkgPT4ge1xuICAgICAgY3kud3JhcCgxKVxuICAgICAgICAudGhlbigobnVtKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG51bSkudG8uZXF1YWwoMSlcbiAgICAgICAgICAvLyBub3RlIHRoYXQgbm90aGluZyBpcyByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbGJhY2tcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKG51bSkgPT4ge1xuICAgICAgICAgIC8vIHRoaXMgY2FsbGJhY2sgcmVjZWl2ZXMgdGhlIG9yaWdpbmFsIHVuY2hhbmdlZCB2YWx1ZSAxXG4gICAgICAgICAgZXhwZWN0KG51bSkudG8uZXF1YWwoMSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgaXQoJ3lpZWxkcyB0aGUgdmFsdWUgeWllbGRlZCBieSB0aGUgbGFzdCBDeXByZXNzIGNvbW1hbmQgaW5zaWRlJywgKCkgPT4ge1xuICAgICAgY3kud3JhcCgxKVxuICAgICAgICAudGhlbigobnVtKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG51bSkudG8uZXF1YWwoMSlcbiAgICAgICAgICAvLyBub3RlIGhvdyB3ZSBydW4gYSBDeXByZXNzIGNvbW1hbmRcbiAgICAgICAgICAvLyB0aGUgcmVzdWx0IHlpZWxkZWQgYnkgdGhpcyBDeXByZXNzIGNvbW1hbmRcbiAgICAgICAgICAvLyB3aWxsIGJlIHBhc3NlZCB0byB0aGUgc2Vjb25kIFwiLnRoZW5cIlxuICAgICAgICAgIGN5LndyYXAoMilcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKG51bSkgPT4ge1xuICAgICAgICAgIC8vIHRoaXMgY2FsbGJhY2sgcmVjZWl2ZXMgdGhlIHZhbHVlIHlpZWxkZWQgYnkgXCJjeS53cmFwKDIpXCJcbiAgICAgICAgICBleHBlY3QobnVtKS50by5lcXVhbCgyKVxuICAgICAgICB9KVxuICAgIH0pXG4gIH0pXG59KVxuIl0sIm5hbWVzIjpbImNvbnRleHQiLCJiZWZvcmVFYWNoIiwiY3kiLCJ2aXNpdCIsIml0IiwiZ2V0IiwiZWFjaCIsIiRlbCIsImluZGV4IiwiJGxpc3QiLCJjb25zb2xlIiwibG9nIiwiaXRzIiwic2hvdWxkIiwiaW52b2tlIiwiYXJyIiwid3JhcCIsInNwcmVhZCIsImZvbyIsImJhciIsImJheiIsImV4cGVjdCIsInRvIiwiZXEiLCJkZXNjcmliZSIsInRoZW4iLCIkbGlzIiwiaGF2ZSIsImxlbmd0aCIsImNvbnRhaW4iLCJudW0iLCJlcXVhbCJdLCJzb3VyY2VSb290IjoiIn0=