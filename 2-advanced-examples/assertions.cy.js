/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/assertions.cy.js ***!
  \**********************************************************/


/// <reference types="cypress" />

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/assertions');
  });
  describe('Implicit Assertions', () => {
    it('.should() - make an assertion about the current subject', () => {
      // https://on.cypress.io/should
      cy.get('.assertion-table').find('tbody tr:last').should('have.class', 'success').find('td').first()
      // checking the text of the <td> element in various ways
      .should('have.text', 'Column content').should('contain', 'Column content').should('have.html', 'Column content')
      // chai-jquery uses "is()" to check if element matches selector
      .should('match', 'td')
      // to match text content against a regular expression
      // first need to invoke jQuery method text()
      // and then match using regular expression
      .invoke('text').should('match', /column content/i);

      // a better way to check element's text content against a regular expression
      // is to use "cy.contains"
      // https://on.cypress.io/contains
      cy.get('.assertion-table').find('tbody tr:last')
      // finds first <td> element with text content matching regular expression
      .contains('td', /column content/i).should('be.visible');

      // for more information about asserting element's text
      // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
    });
    it('.and() - chain multiple assertions together', () => {
      // https://on.cypress.io/and
      cy.get('.assertions-link').should('have.class', 'active').and('have.attr', 'href').and('include', 'cypress.io');
    });
  });
  describe('Explicit Assertions', () => {
    // https://on.cypress.io/assertions
    it('expect - make an assertion about a specified subject', () => {
      // We can use Chai's BDD style assertions
      expect(true).to.be.true;
      const o = {
        foo: 'bar'
      };
      expect(o).to.equal(o);
      expect(o).to.deep.equal({
        foo: 'bar'
      });
      // matching text using regular expression
      expect('FooBar').to.match(/bar$/i);
    });
    it('pass your own callback function to should()', () => {
      // Pass a function to should that can have any number
      // of explicit assertions within it.
      // The ".should(cb)" function will be retried
      // automatically until it passes all your explicit assertions or times out.
      cy.get('.assertions-p').find('p').should($p => {
        // https://on.cypress.io/$
        // return an array of texts from all of the p's
        const texts = $p.map((i, el) => Cypress.$(el).text());

        // jquery map returns jquery object
        // and .get() convert this to simple array
        const paragraphs = texts.get();

        // array should have length of 3
        expect(paragraphs, 'has 3 paragraphs').to.have.length(3);

        // use second argument to expect(...) to provide clear
        // message with each assertion
        expect(paragraphs, 'has expected text in each paragraph').to.deep.eq(['Some text from first p', 'More text from second p', 'And even more text from third p']);
      });
    });
    it('finds element by class name regex', () => {
      cy.get('.docs-header').find('div')
      // .should(cb) callback function will be retried
      .should($div => {
        expect($div).to.have.length(1);
        const className = $div[0].className;
        expect(className).to.match(/heading-/);
      })
      // .then(cb) callback is not retried,
      // it either passes or fails
      .then($div => {
        expect($div, 'text content').to.have.text('Introduction');
      });
    });
    it('can throw any error', () => {
      cy.get('.docs-header').find('div').should($div => {
        if ($div.length !== 1) {
          // you can throw your own errors
          throw new Error('Did not find 1 element');
        }
        const className = $div[0].className;
        if (!className.match(/heading-/)) {
          throw new Error(`Could not find class "heading-" in ${className}`);
        }
      });
    });
    it('matches unknown text between two elements', () => {
      /**
       * Text from the first element.
       * @type {string}
      */
      let text;

      /**
       * Normalizes passed text,
       * useful before comparing text with spaces and different capitalization.
       * @param {string} s Text to normalize
      */
      const normalizeText = s => s.replace(/\s/g, '').toLowerCase();
      cy.get('.two-elements').find('.first').then($first => {
        // save text from the first element
        text = normalizeText($first.text());
      });
      cy.get('.two-elements').find('.second').should($div => {
        // we can massage text before comparing
        const secondText = normalizeText($div.text());
        expect(secondText, 'second text').to.equal(text);
      });
    });
    it('assert - assert shape of an object', () => {
      const person = {
        name: 'Joe',
        age: 20
      };
      assert.isObject(person, 'value is object');
    });
    it('retries the should callback until assertions pass', () => {
      cy.get('#random-number').should($div => {
        const n = parseFloat($div.text());
        expect(n).to.be.gte(1).and.be.lte(10);
      });
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxDQUFDVSxJQUFJLENBQUM7TUFDbEQsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0lBRUZ4QixFQUFFLENBQUMsb0NBQW9DLEVBQUUsTUFBTTtNQUM3QyxNQUFNdUMsTUFBTSxHQUFHO1FBQ2JDLElBQUksRUFBRSxLQUFLO1FBQ1hDLEdBQUcsRUFBRTtNQUNQLENBQUM7TUFFREMsTUFBTSxDQUFDQyxRQUFRLENBQUNKLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQztJQUM1QyxDQUFDLENBQUM7SUFFRnZDLEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxNQUFNO01BQzVESCxFQUFFLENBQUNJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUNyQkUsTUFBTSxDQUFFMEIsSUFBSSxJQUFLO1FBQ2hCLE1BQU1lLENBQUMsR0FBR0MsVUFBVSxDQUFDaEIsSUFBSSxDQUFDTCxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWpDaEIsTUFBTSxDQUFDb0MsQ0FBQyxDQUFDLENBQUNuQyxFQUFFLENBQUNDLEVBQUUsQ0FBQ29DLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQ3ZDLEdBQUcsQ0FBQ0csRUFBRSxDQUFDcUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztNQUN2QyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhcmFiYW5rLWF1dG9tYXRpb24vLi9jeXByZXNzL2UyZS8yLWFkdmFuY2VkLWV4YW1wbGVzL2Fzc2VydGlvbnMuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjeXByZXNzXCIgLz5cblxuY29udGV4dCgnQXNzZXJ0aW9ucycsICgpID0+IHtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY3kudmlzaXQoJ2h0dHBzOi8vZXhhbXBsZS5jeXByZXNzLmlvL2NvbW1hbmRzL2Fzc2VydGlvbnMnKVxuICB9KVxuXG4gIGRlc2NyaWJlKCdJbXBsaWNpdCBBc3NlcnRpb25zJywgKCkgPT4ge1xuICAgIGl0KCcuc2hvdWxkKCkgLSBtYWtlIGFuIGFzc2VydGlvbiBhYm91dCB0aGUgY3VycmVudCBzdWJqZWN0JywgKCkgPT4ge1xuICAgICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3Nob3VsZFxuICAgICAgY3kuZ2V0KCcuYXNzZXJ0aW9uLXRhYmxlJylcbiAgICAgICAgLmZpbmQoJ3Rib2R5IHRyOmxhc3QnKVxuICAgICAgICAuc2hvdWxkKCdoYXZlLmNsYXNzJywgJ3N1Y2Nlc3MnKVxuICAgICAgICAuZmluZCgndGQnKVxuICAgICAgICAuZmlyc3QoKVxuICAgICAgICAvLyBjaGVja2luZyB0aGUgdGV4dCBvZiB0aGUgPHRkPiBlbGVtZW50IGluIHZhcmlvdXMgd2F5c1xuICAgICAgICAuc2hvdWxkKCdoYXZlLnRleHQnLCAnQ29sdW1uIGNvbnRlbnQnKVxuICAgICAgICAuc2hvdWxkKCdjb250YWluJywgJ0NvbHVtbiBjb250ZW50JylcbiAgICAgICAgLnNob3VsZCgnaGF2ZS5odG1sJywgJ0NvbHVtbiBjb250ZW50JylcbiAgICAgICAgLy8gY2hhaS1qcXVlcnkgdXNlcyBcImlzKClcIiB0byBjaGVjayBpZiBlbGVtZW50IG1hdGNoZXMgc2VsZWN0b3JcbiAgICAgICAgLnNob3VsZCgnbWF0Y2gnLCAndGQnKVxuICAgICAgICAvLyB0byBtYXRjaCB0ZXh0IGNvbnRlbnQgYWdhaW5zdCBhIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgICAvLyBmaXJzdCBuZWVkIHRvIGludm9rZSBqUXVlcnkgbWV0aG9kIHRleHQoKVxuICAgICAgICAvLyBhbmQgdGhlbiBtYXRjaCB1c2luZyByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAgICAgLmludm9rZSgndGV4dCcpXG4gICAgICAgIC5zaG91bGQoJ21hdGNoJywgL2NvbHVtbiBjb250ZW50L2kpXG5cbiAgICAgIC8vIGEgYmV0dGVyIHdheSB0byBjaGVjayBlbGVtZW50J3MgdGV4dCBjb250ZW50IGFnYWluc3QgYSByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAgIC8vIGlzIHRvIHVzZSBcImN5LmNvbnRhaW5zXCJcbiAgICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9jb250YWluc1xuICAgICAgY3kuZ2V0KCcuYXNzZXJ0aW9uLXRhYmxlJylcbiAgICAgICAgLmZpbmQoJ3Rib2R5IHRyOmxhc3QnKVxuICAgICAgICAvLyBmaW5kcyBmaXJzdCA8dGQ+IGVsZW1lbnQgd2l0aCB0ZXh0IGNvbnRlbnQgbWF0Y2hpbmcgcmVndWxhciBleHByZXNzaW9uXG4gICAgICAgIC5jb250YWlucygndGQnLCAvY29sdW1uIGNvbnRlbnQvaSlcbiAgICAgICAgLnNob3VsZCgnYmUudmlzaWJsZScpXG5cbiAgICAgIC8vIGZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGFzc2VydGluZyBlbGVtZW50J3MgdGV4dFxuICAgICAgLy8gc2VlIGh0dHBzOi8vb24uY3lwcmVzcy5pby91c2luZy1jeXByZXNzLWZhcSNIb3ctZG8tSS1nZXQtYW4tZWxlbWVudOKAmXMtdGV4dC1jb250ZW50c1xuICAgIH0pXG5cbiAgICBpdCgnLmFuZCgpIC0gY2hhaW4gbXVsdGlwbGUgYXNzZXJ0aW9ucyB0b2dldGhlcicsICgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9hbmRcbiAgICAgIGN5LmdldCgnLmFzc2VydGlvbnMtbGluaycpXG4gICAgICAgIC5zaG91bGQoJ2hhdmUuY2xhc3MnLCAnYWN0aXZlJylcbiAgICAgICAgLmFuZCgnaGF2ZS5hdHRyJywgJ2hyZWYnKVxuICAgICAgICAuYW5kKCdpbmNsdWRlJywgJ2N5cHJlc3MuaW8nKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ0V4cGxpY2l0IEFzc2VydGlvbnMnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2Fzc2VydGlvbnNcbiAgICBpdCgnZXhwZWN0IC0gbWFrZSBhbiBhc3NlcnRpb24gYWJvdXQgYSBzcGVjaWZpZWQgc3ViamVjdCcsICgpID0+IHtcbiAgICAgIC8vIFdlIGNhbiB1c2UgQ2hhaSdzIEJERCBzdHlsZSBhc3NlcnRpb25zXG4gICAgICBleHBlY3QodHJ1ZSkudG8uYmUudHJ1ZVxuICAgICAgY29uc3QgbyA9IHsgZm9vOiAnYmFyJyB9XG5cbiAgICAgIGV4cGVjdChvKS50by5lcXVhbChvKVxuICAgICAgZXhwZWN0KG8pLnRvLmRlZXAuZXF1YWwoeyBmb286ICdiYXInIH0pXG4gICAgICAvLyBtYXRjaGluZyB0ZXh0IHVzaW5nIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgZXhwZWN0KCdGb29CYXInKS50by5tYXRjaCgvYmFyJC9pKVxuICAgIH0pXG5cbiAgICBpdCgncGFzcyB5b3VyIG93biBjYWxsYmFjayBmdW5jdGlvbiB0byBzaG91bGQoKScsICgpID0+IHtcbiAgICAgIC8vIFBhc3MgYSBmdW5jdGlvbiB0byBzaG91bGQgdGhhdCBjYW4gaGF2ZSBhbnkgbnVtYmVyXG4gICAgICAvLyBvZiBleHBsaWNpdCBhc3NlcnRpb25zIHdpdGhpbiBpdC5cbiAgICAgIC8vIFRoZSBcIi5zaG91bGQoY2IpXCIgZnVuY3Rpb24gd2lsbCBiZSByZXRyaWVkXG4gICAgICAvLyBhdXRvbWF0aWNhbGx5IHVudGlsIGl0IHBhc3NlcyBhbGwgeW91ciBleHBsaWNpdCBhc3NlcnRpb25zIG9yIHRpbWVzIG91dC5cbiAgICAgIGN5LmdldCgnLmFzc2VydGlvbnMtcCcpXG4gICAgICAgIC5maW5kKCdwJylcbiAgICAgICAgLnNob3VsZCgoJHApID0+IHtcbiAgICAgICAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vJFxuICAgICAgICAgIC8vIHJldHVybiBhbiBhcnJheSBvZiB0ZXh0cyBmcm9tIGFsbCBvZiB0aGUgcCdzXG4gICAgICAgICAgY29uc3QgdGV4dHMgPSAkcC5tYXAoKGksIGVsKSA9PiBDeXByZXNzLiQoZWwpLnRleHQoKSlcblxuICAgICAgICAgIC8vIGpxdWVyeSBtYXAgcmV0dXJucyBqcXVlcnkgb2JqZWN0XG4gICAgICAgICAgLy8gYW5kIC5nZXQoKSBjb252ZXJ0IHRoaXMgdG8gc2ltcGxlIGFycmF5XG4gICAgICAgICAgY29uc3QgcGFyYWdyYXBocyA9IHRleHRzLmdldCgpXG5cbiAgICAgICAgICAvLyBhcnJheSBzaG91bGQgaGF2ZSBsZW5ndGggb2YgM1xuICAgICAgICAgIGV4cGVjdChwYXJhZ3JhcGhzLCAnaGFzIDMgcGFyYWdyYXBocycpLnRvLmhhdmUubGVuZ3RoKDMpXG5cbiAgICAgICAgICAvLyB1c2Ugc2Vjb25kIGFyZ3VtZW50IHRvIGV4cGVjdCguLi4pIHRvIHByb3ZpZGUgY2xlYXJcbiAgICAgICAgICAvLyBtZXNzYWdlIHdpdGggZWFjaCBhc3NlcnRpb25cbiAgICAgICAgICBleHBlY3QocGFyYWdyYXBocywgJ2hhcyBleHBlY3RlZCB0ZXh0IGluIGVhY2ggcGFyYWdyYXBoJykudG8uZGVlcC5lcShbXG4gICAgICAgICAgICAnU29tZSB0ZXh0IGZyb20gZmlyc3QgcCcsXG4gICAgICAgICAgICAnTW9yZSB0ZXh0IGZyb20gc2Vjb25kIHAnLFxuICAgICAgICAgICAgJ0FuZCBldmVuIG1vcmUgdGV4dCBmcm9tIHRoaXJkIHAnLFxuICAgICAgICAgIF0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGl0KCdmaW5kcyBlbGVtZW50IGJ5IGNsYXNzIG5hbWUgcmVnZXgnLCAoKSA9PiB7XG4gICAgICBjeS5nZXQoJy5kb2NzLWhlYWRlcicpXG4gICAgICAgIC5maW5kKCdkaXYnKVxuICAgICAgICAvLyAuc2hvdWxkKGNiKSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIGJlIHJldHJpZWRcbiAgICAgICAgLnNob3VsZCgoJGRpdikgPT4ge1xuICAgICAgICAgIGV4cGVjdCgkZGl2KS50by5oYXZlLmxlbmd0aCgxKVxuXG4gICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gJGRpdlswXS5jbGFzc05hbWVcblxuICAgICAgICAgIGV4cGVjdChjbGFzc05hbWUpLnRvLm1hdGNoKC9oZWFkaW5nLS8pXG4gICAgICAgIH0pXG4gICAgICAgIC8vIC50aGVuKGNiKSBjYWxsYmFjayBpcyBub3QgcmV0cmllZCxcbiAgICAgICAgLy8gaXQgZWl0aGVyIHBhc3NlcyBvciBmYWlsc1xuICAgICAgICAudGhlbigoJGRpdikgPT4ge1xuICAgICAgICAgIGV4cGVjdCgkZGl2LCAndGV4dCBjb250ZW50JykudG8uaGF2ZS50ZXh0KCdJbnRyb2R1Y3Rpb24nKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBpdCgnY2FuIHRocm93IGFueSBlcnJvcicsICgpID0+IHtcbiAgICAgIGN5LmdldCgnLmRvY3MtaGVhZGVyJylcbiAgICAgICAgLmZpbmQoJ2RpdicpXG4gICAgICAgIC5zaG91bGQoKCRkaXYpID0+IHtcbiAgICAgICAgICBpZiAoJGRpdi5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIC8vIHlvdSBjYW4gdGhyb3cgeW91ciBvd24gZXJyb3JzXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpZCBub3QgZmluZCAxIGVsZW1lbnQnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9ICRkaXZbMF0uY2xhc3NOYW1lXG5cbiAgICAgICAgICBpZiAoIWNsYXNzTmFtZS5tYXRjaCgvaGVhZGluZy0vKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBjbGFzcyBcImhlYWRpbmctXCIgaW4gJHtjbGFzc05hbWV9YClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGl0KCdtYXRjaGVzIHVua25vd24gdGV4dCBiZXR3ZWVuIHR3byBlbGVtZW50cycsICgpID0+IHtcbiAgICAgIC8qKlxuICAgICAgICogVGV4dCBmcm9tIHRoZSBmaXJzdCBlbGVtZW50LlxuICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICovXG4gICAgICBsZXQgdGV4dFxuXG4gICAgICAvKipcbiAgICAgICAqIE5vcm1hbGl6ZXMgcGFzc2VkIHRleHQsXG4gICAgICAgKiB1c2VmdWwgYmVmb3JlIGNvbXBhcmluZyB0ZXh0IHdpdGggc3BhY2VzIGFuZCBkaWZmZXJlbnQgY2FwaXRhbGl6YXRpb24uXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcyBUZXh0IHRvIG5vcm1hbGl6ZVxuICAgICAgKi9cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAocykgPT4gcy5yZXBsYWNlKC9cXHMvZywgJycpLnRvTG93ZXJDYXNlKClcblxuICAgICAgY3kuZ2V0KCcudHdvLWVsZW1lbnRzJylcbiAgICAgICAgLmZpbmQoJy5maXJzdCcpXG4gICAgICAgIC50aGVuKCgkZmlyc3QpID0+IHtcbiAgICAgICAgICAvLyBzYXZlIHRleHQgZnJvbSB0aGUgZmlyc3QgZWxlbWVudFxuICAgICAgICAgIHRleHQgPSBub3JtYWxpemVUZXh0KCRmaXJzdC50ZXh0KCkpXG4gICAgICAgIH0pXG5cbiAgICAgIGN5LmdldCgnLnR3by1lbGVtZW50cycpXG4gICAgICAgIC5maW5kKCcuc2Vjb25kJylcbiAgICAgICAgLnNob3VsZCgoJGRpdikgPT4ge1xuICAgICAgICAgIC8vIHdlIGNhbiBtYXNzYWdlIHRleHQgYmVmb3JlIGNvbXBhcmluZ1xuICAgICAgICAgIGNvbnN0IHNlY29uZFRleHQgPSBub3JtYWxpemVUZXh0KCRkaXYudGV4dCgpKVxuXG4gICAgICAgICAgZXhwZWN0KHNlY29uZFRleHQsICdzZWNvbmQgdGV4dCcpLnRvLmVxdWFsKHRleHQpXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGl0KCdhc3NlcnQgLSBhc3NlcnQgc2hhcGUgb2YgYW4gb2JqZWN0JywgKCkgPT4ge1xuICAgICAgY29uc3QgcGVyc29uID0ge1xuICAgICAgICBuYW1lOiAnSm9lJyxcbiAgICAgICAgYWdlOiAyMCxcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0LmlzT2JqZWN0KHBlcnNvbiwgJ3ZhbHVlIGlzIG9iamVjdCcpXG4gICAgfSlcblxuICAgIGl0KCdyZXRyaWVzIHRoZSBzaG91bGQgY2FsbGJhY2sgdW50aWwgYXNzZXJ0aW9ucyBwYXNzJywgKCkgPT4ge1xuICAgICAgY3kuZ2V0KCcjcmFuZG9tLW51bWJlcicpXG4gICAgICAgIC5zaG91bGQoKCRkaXYpID0+IHtcbiAgICAgICAgICBjb25zdCBuID0gcGFyc2VGbG9hdCgkZGl2LnRleHQoKSlcblxuICAgICAgICAgIGV4cGVjdChuKS50by5iZS5ndGUoMSkuYW5kLmJlLmx0ZSgxMClcbiAgICAgICAgfSlcbiAgICB9KVxuICB9KVxufSlcbiJdLCJuYW1lcyI6WyJjb250ZXh0IiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJkZXNjcmliZSIsIml0IiwiZ2V0IiwiZmluZCIsInNob3VsZCIsImZpcnN0IiwiaW52b2tlIiwiY29udGFpbnMiLCJhbmQiLCJleHBlY3QiLCJ0byIsImJlIiwidHJ1ZSIsIm8iLCJmb28iLCJlcXVhbCIsImRlZXAiLCJtYXRjaCIsIiRwIiwidGV4dHMiLCJtYXAiLCJpIiwiZWwiLCJDeXByZXNzIiwiJCIsInRleHQiLCJwYXJhZ3JhcGhzIiwiaGF2ZSIsImxlbmd0aCIsImVxIiwiJGRpdiIsImNsYXNzTmFtZSIsInRoZW4iLCJFcnJvciIsIm5vcm1hbGl6ZVRleHQiLCJzIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwiJGZpcnN0Iiwic2Vjb25kVGV4dCIsInBlcnNvbiIsIm5hbWUiLCJhZ2UiLCJhc3NlcnQiLCJpc09iamVjdCIsIm4iLCJwYXJzZUZsb2F0IiwiZ3RlIiwibHRlIl0sInNvdXJjZVJvb3QiOiIifQ==