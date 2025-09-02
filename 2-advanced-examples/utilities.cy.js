/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/utilities.cy.js ***!
  \*********************************************************/


/// <reference types="cypress" />

context('Utilities', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/utilities');
  });
  it('Cypress._ - call a lodash method', () => {
    // https://on.cypress.io/_
    cy.request('https://jsonplaceholder.cypress.io/users').then(response => {
      let ids = Cypress._.chain(response.body).map('id').take(3).value();
      expect(ids).to.deep.eq([1, 2, 3]);
    });
  });
  it('Cypress.$ - call a jQuery method', () => {
    // https://on.cypress.io/$
    let $li = Cypress.$('.utility-jquery li:first');
    cy.wrap($li).should('not.have.class', 'active');
    cy.wrap($li).click();
    cy.wrap($li).should('have.class', 'active');
  });
  it('Cypress.Blob - blob utilities and base64 string conversion', () => {
    // https://on.cypress.io/blob
    cy.get('.utility-blob').then($div => {
      // https://github.com/nolanlawson/blob-util#imgSrcToDataURL
      // get the dataUrl string for the javascript-logo
      return Cypress.Blob.imgSrcToDataURL('https://example.cypress.io/assets/img/javascript-logo.png', undefined, 'anonymous').then(dataUrl => {
        // create an <img> element and set its src to the dataUrl
        let img = Cypress.$('<img />', {
          src: dataUrl
        });

        // need to explicitly return cy here since we are initially returning
        // the Cypress.Blob.imgSrcToDataURL promise to our test
        // append the image
        $div.append(img);
        cy.get('.utility-blob img').click();
        cy.get('.utility-blob img').should('have.attr', 'src', dataUrl);
      });
    });
  });
  it('Cypress.minimatch - test out glob patterns against strings', () => {
    // https://on.cypress.io/minimatch
    let matching = Cypress.minimatch('/users/1/comments', '/users/*/comments', {
      matchBase: true
    });
    expect(matching, 'matching wildcard').to.be.true;
    matching = Cypress.minimatch('/users/1/comments/2', '/users/*/comments', {
      matchBase: true
    });
    expect(matching, 'comments').to.be.false;

    // ** matches against all downstream path segments
    matching = Cypress.minimatch('/foo/bar/baz/123/quux?a=b&c=2', '/foo/**', {
      matchBase: true
    });
    expect(matching, 'comments').to.be.true;

    // whereas * matches only the next path segment

    matching = Cypress.minimatch('/foo/bar/baz/123/quux?a=b&c=2', '/foo/*', {
      matchBase: false
    });
    expect(matching, 'comments').to.be.false;
  });
  it('Cypress.Promise - instantiate a bluebird promise', () => {
    // https://on.cypress.io/promise
    let waited = false;

    /**
     * @return Bluebird<string>
     */
    function waitOneSecond() {
      // return a promise that resolves after 1 second
      return new Cypress.Promise((resolve, reject) => {
        setTimeout(() => {
          // set waited to true
          waited = true;

          // resolve with 'foo' string
          resolve('foo');
        }, 1000);
      });
    }
    cy.then(() => {
      // return a promise to cy.then() that
      // is awaited until it resolves
      return waitOneSecond().then(str => {
        expect(str).to.eq('foo');
        expect(waited).to.be.true;
      });
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkgsTUFBTSxDQUFDd0IsTUFBTSxDQUFDLENBQUN2QixFQUFFLENBQUNvQixFQUFFLENBQUNDLElBQUk7TUFDM0IsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJhYmFuay1hdXRvbWF0aW9uLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy91dGlsaXRpZXMuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjeXByZXNzXCIgLz5cblxuY29udGV4dCgnVXRpbGl0aWVzJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8vdXRpbGl0aWVzJylcbiAgfSlcblxuICBpdCgnQ3lwcmVzcy5fIC0gY2FsbCBhIGxvZGFzaCBtZXRob2QnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL19cbiAgICBjeS5yZXF1ZXN0KCdodHRwczovL2pzb25wbGFjZWhvbGRlci5jeXByZXNzLmlvL3VzZXJzJylcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgaWRzID0gQ3lwcmVzcy5fLmNoYWluKHJlc3BvbnNlLmJvZHkpLm1hcCgnaWQnKS50YWtlKDMpLnZhbHVlKClcblxuICAgICAgICBleHBlY3QoaWRzKS50by5kZWVwLmVxKFsxLCAyLCAzXSlcbiAgICAgIH0pXG4gIH0pXG5cbiAgaXQoJ0N5cHJlc3MuJCAtIGNhbGwgYSBqUXVlcnkgbWV0aG9kJywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby8kXG4gICAgbGV0ICRsaSA9IEN5cHJlc3MuJCgnLnV0aWxpdHktanF1ZXJ5IGxpOmZpcnN0JylcblxuICAgIGN5LndyYXAoJGxpKS5zaG91bGQoJ25vdC5oYXZlLmNsYXNzJywgJ2FjdGl2ZScpXG4gICAgY3kud3JhcCgkbGkpLmNsaWNrKClcbiAgICBjeS53cmFwKCRsaSkuc2hvdWxkKCdoYXZlLmNsYXNzJywgJ2FjdGl2ZScpXG4gIH0pXG5cbiAgaXQoJ0N5cHJlc3MuQmxvYiAtIGJsb2IgdXRpbGl0aWVzIGFuZCBiYXNlNjQgc3RyaW5nIGNvbnZlcnNpb24nLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2Jsb2JcbiAgICBjeS5nZXQoJy51dGlsaXR5LWJsb2InKS50aGVuKCgkZGl2KSA9PiB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9sYW5sYXdzb24vYmxvYi11dGlsI2ltZ1NyY1RvRGF0YVVSTFxuICAgICAgLy8gZ2V0IHRoZSBkYXRhVXJsIHN0cmluZyBmb3IgdGhlIGphdmFzY3JpcHQtbG9nb1xuICAgICAgcmV0dXJuIEN5cHJlc3MuQmxvYi5pbWdTcmNUb0RhdGFVUkwoJ2h0dHBzOi8vZXhhbXBsZS5jeXByZXNzLmlvL2Fzc2V0cy9pbWcvamF2YXNjcmlwdC1sb2dvLnBuZycsIHVuZGVmaW5lZCwgJ2Fub255bW91cycpXG4gICAgICAudGhlbigoZGF0YVVybCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgYW4gPGltZz4gZWxlbWVudCBhbmQgc2V0IGl0cyBzcmMgdG8gdGhlIGRhdGFVcmxcbiAgICAgICAgbGV0IGltZyA9IEN5cHJlc3MuJCgnPGltZyAvPicsIHsgc3JjOiBkYXRhVXJsIH0pXG5cbiAgICAgICAgLy8gbmVlZCB0byBleHBsaWNpdGx5IHJldHVybiBjeSBoZXJlIHNpbmNlIHdlIGFyZSBpbml0aWFsbHkgcmV0dXJuaW5nXG4gICAgICAgIC8vIHRoZSBDeXByZXNzLkJsb2IuaW1nU3JjVG9EYXRhVVJMIHByb21pc2UgdG8gb3VyIHRlc3RcbiAgICAgICAgLy8gYXBwZW5kIHRoZSBpbWFnZVxuICAgICAgICAkZGl2LmFwcGVuZChpbWcpXG5cbiAgICAgICAgY3kuZ2V0KCcudXRpbGl0eS1ibG9iIGltZycpLmNsaWNrKClcbiAgICAgICAgY3kuZ2V0KCcudXRpbGl0eS1ibG9iIGltZycpLnNob3VsZCgnaGF2ZS5hdHRyJywgJ3NyYycsIGRhdGFVcmwpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ0N5cHJlc3MubWluaW1hdGNoIC0gdGVzdCBvdXQgZ2xvYiBwYXR0ZXJucyBhZ2FpbnN0IHN0cmluZ3MnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL21pbmltYXRjaFxuICAgIGxldCBtYXRjaGluZyA9IEN5cHJlc3MubWluaW1hdGNoKCcvdXNlcnMvMS9jb21tZW50cycsICcvdXNlcnMvKi9jb21tZW50cycsIHtcbiAgICAgIG1hdGNoQmFzZTogdHJ1ZSxcbiAgICB9KVxuXG4gICAgZXhwZWN0KG1hdGNoaW5nLCAnbWF0Y2hpbmcgd2lsZGNhcmQnKS50by5iZS50cnVlXG5cbiAgICBtYXRjaGluZyA9IEN5cHJlc3MubWluaW1hdGNoKCcvdXNlcnMvMS9jb21tZW50cy8yJywgJy91c2Vycy8qL2NvbW1lbnRzJywge1xuICAgICAgbWF0Y2hCYXNlOiB0cnVlLFxuICAgIH0pXG5cbiAgICBleHBlY3QobWF0Y2hpbmcsICdjb21tZW50cycpLnRvLmJlLmZhbHNlXG5cbiAgICAvLyAqKiBtYXRjaGVzIGFnYWluc3QgYWxsIGRvd25zdHJlYW0gcGF0aCBzZWdtZW50c1xuICAgIG1hdGNoaW5nID0gQ3lwcmVzcy5taW5pbWF0Y2goJy9mb28vYmFyL2Jhei8xMjMvcXV1eD9hPWImYz0yJywgJy9mb28vKionLCB7XG4gICAgICBtYXRjaEJhc2U6IHRydWUsXG4gICAgfSlcblxuICAgIGV4cGVjdChtYXRjaGluZywgJ2NvbW1lbnRzJykudG8uYmUudHJ1ZVxuXG4gICAgLy8gd2hlcmVhcyAqIG1hdGNoZXMgb25seSB0aGUgbmV4dCBwYXRoIHNlZ21lbnRcblxuICAgIG1hdGNoaW5nID0gQ3lwcmVzcy5taW5pbWF0Y2goJy9mb28vYmFyL2Jhei8xMjMvcXV1eD9hPWImYz0yJywgJy9mb28vKicsIHtcbiAgICAgIG1hdGNoQmFzZTogZmFsc2UsXG4gICAgfSlcblxuICAgIGV4cGVjdChtYXRjaGluZywgJ2NvbW1lbnRzJykudG8uYmUuZmFsc2VcbiAgfSlcblxuICBpdCgnQ3lwcmVzcy5Qcm9taXNlIC0gaW5zdGFudGlhdGUgYSBibHVlYmlyZCBwcm9taXNlJywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9wcm9taXNlXG4gICAgbGV0IHdhaXRlZCA9IGZhbHNlXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIEJsdWViaXJkPHN0cmluZz5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3YWl0T25lU2Vjb25kICgpIHtcbiAgICAgIC8vIHJldHVybiBhIHByb21pc2UgdGhhdCByZXNvbHZlcyBhZnRlciAxIHNlY29uZFxuICAgICAgcmV0dXJuIG5ldyBDeXByZXNzLlByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAvLyBzZXQgd2FpdGVkIHRvIHRydWVcbiAgICAgICAgICB3YWl0ZWQgPSB0cnVlXG5cbiAgICAgICAgICAvLyByZXNvbHZlIHdpdGggJ2Zvbycgc3RyaW5nXG4gICAgICAgICAgcmVzb2x2ZSgnZm9vJylcbiAgICAgICAgfSwgMTAwMClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY3kudGhlbigoKSA9PiB7XG4gICAgICAvLyByZXR1cm4gYSBwcm9taXNlIHRvIGN5LnRoZW4oKSB0aGF0XG4gICAgICAvLyBpcyBhd2FpdGVkIHVudGlsIGl0IHJlc29sdmVzXG4gICAgICByZXR1cm4gd2FpdE9uZVNlY29uZCgpLnRoZW4oKHN0cikgPT4ge1xuICAgICAgICBleHBlY3Qoc3RyKS50by5lcSgnZm9vJylcbiAgICAgICAgZXhwZWN0KHdhaXRlZCkudG8uYmUudHJ1ZVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufSlcbiJdLCJuYW1lcyI6WyJjb250ZXh0IiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJpdCIsInJlcXVlc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJpZHMiLCJDeXByZXNzIiwiXyIsImNoYWluIiwiYm9keSIsIm1hcCIsInRha2UiLCJ2YWx1ZSIsImV4cGVjdCIsInRvIiwiZGVlcCIsImVxIiwiJGxpIiwiJCIsIndyYXAiLCJzaG91bGQiLCJjbGljayIsImdldCIsIiRkaXYiLCJCbG9iIiwiaW1nU3JjVG9EYXRhVVJMIiwidW5kZWZpbmVkIiwiZGF0YVVybCIsImltZyIsInNyYyIsImFwcGVuZCIsIm1hdGNoaW5nIiwibWluaW1hdGNoIiwibWF0Y2hCYXNlIiwiYmUiLCJ0cnVlIiwiZmFsc2UiLCJ3YWl0ZWQiLCJ3YWl0T25lU2Vjb25kIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic3RyIl0sInNvdXJjZVJvb3QiOiIifQ==