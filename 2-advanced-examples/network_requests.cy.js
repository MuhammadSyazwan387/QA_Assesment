/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!****************************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/network_requests.cy.js ***!
  \****************************************************************/


/// <reference types="cypress" />

context('Network Requests', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests');
  });

  // Manage HTTP requests in your app

  it('cy.request() - make an XHR request', () => {
    // https://on.cypress.io/request
    cy.request('https://jsonplaceholder.cypress.io/comments').should(response => {
      expect(response.status).to.eq(200);
      // the server sometimes gets an extra comment posted from another machine
      // which gets returned as 1 extra object
      expect(response.body).to.have.property('length').and.be.oneOf([500, 501]);
      expect(response).to.have.property('headers');
      expect(response).to.have.property('duration');
    });
  });
  it('cy.request() - verify response using BDD syntax', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments').then(response => {
      // https://on.cypress.io/assertions
      expect(response).property('status').to.equal(200);
      expect(response).property('body').to.have.property('length').and.be.oneOf([500, 501]);
      expect(response).to.include.keys('headers', 'duration');
    });
  });
  it('cy.request() with query parameters', () => {
    // will execute request
    // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
    cy.request({
      url: 'https://jsonplaceholder.cypress.io/comments',
      qs: {
        postId: 1,
        id: 3
      }
    }).its('body').should('be.an', 'array').and('have.length', 1).its('0') // yields first element of the array
    .should('contain', {
      postId: 1,
      id: 3
    });
  });
  it('cy.request() - pass result to the second request', () => {
    // first, let's find out the userId of the first user we have
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1').its('body') // yields the response object
    .its('0') // yields the first element of the returned list
    // the above two commands its('body').its('0')
    // can be written as its('body.0')
    // if you do not care about TypeScript checks
    .then(user => {
      expect(user).property('id').to.be.a('number');
      // make a new post on behalf of the user
      cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
        userId: user.id,
        title: 'Cypress Test Runner',
        body: 'Fast, easy and reliable testing for anything that runs in a browser.'
      });
    })
    // note that the value here is the returned value of the 2nd request
    // which is the new post object
    .then(response => {
      expect(response).property('status').to.equal(201); // new entity created
      expect(response).property('body').to.contain({
        title: 'Cypress Test Runner'
      });

      // we don't know the exact post id - only that it will be > 100
      // since JSONPlaceholder has built-in 100 posts
      expect(response.body).property('id').to.be.a('number').and.to.be.gt(100);

      // we don't know the user id here - since it was in above closure
      // so in this test just confirm that the property is there
      expect(response.body).property('userId').to.be.a('number');
    });
  });
  it('cy.request() - save response in the shared test context', () => {
    // https://on.cypress.io/variables-and-aliases
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1').its('body').its('0') // yields the first element of the returned list
    .as('user') // saves the object in the test context
    .then(function () {
      // NOTE 👀
      //  By the time this callback runs the "as('user')" command
      //  has saved the user object in the test context.
      //  To access the test context we need to use
      //  the "function () { ... }" callback form,
      //  otherwise "this" points at a wrong or undefined object!
      cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
        userId: this.user.id,
        title: 'Cypress Test Runner',
        body: 'Fast, easy and reliable testing for anything that runs in a browser.'
      }).its('body').as('post'); // save the new post from the response
    }).then(function () {
      // When this callback runs, both "cy.request" API commands have finished
      // and the test context has "user" and "post" objects set.
      // Let's verify them.
      expect(this.post, 'post has the right user id').property('userId').to.equal(this.user.id);
    });
  });
  it('cy.intercept() - route responses to matching requests', () => {
    // https://on.cypress.io/intercept

    let message = 'whoa, this comment does not exist';

    // Listen to GET to comments/1
    cy.intercept('GET', '**/comments/*').as('getComment');

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click();

    // https://on.cypress.io/wait
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304]);

    // Listen to POST to comments
    cy.intercept('POST', '**/comments').as('postComment');

    // we have code that posts a comment when
    // the button is clicked in scripts.js
    cy.get('.network-post').click();
    cy.wait('@postComment').should(({
      request,
      response
    }) => {
      expect(request.body).to.include('email');
      expect(request.headers).to.have.property('content-type');
      expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()');
    });

    // Stub a response to PUT comments/ ****
    cy.intercept({
      method: 'PUT',
      url: '**/comments/*'
    }, {
      statusCode: 404,
      body: {
        error: message
      },
      headers: {
        'access-control-allow-origin': '*'
      },
      delayMs: 500
    }).as('putComment');

    // we have code that puts a comment when
    // the button is clicked in scripts.js
    cy.get('.network-put').click();
    cy.wait('@putComment');

    // our 404 statusCode logic in scripts.js executed
    cy.get('.network-put-comment').should('contain', message);
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsY0FBYyxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBRTlCcEMsRUFBRSxDQUFDcUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7SUFFdEI7SUFDQXJDLEVBQUUsQ0FBQ21DLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDL0IsTUFBTSxDQUFDLFNBQVMsRUFBRTZCLE9BQU8sQ0FBQztFQUMzRCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3BhcmFiYW5rLWF1dG9tYXRpb24vLi9jeXByZXNzL2UyZS8yLWFkdmFuY2VkLWV4YW1wbGVzL25ldHdvcmtfcmVxdWVzdHMuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjeXByZXNzXCIgLz5cblxuY29udGV4dCgnTmV0d29yayBSZXF1ZXN0cycsICgpID0+IHtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY3kudmlzaXQoJ2h0dHBzOi8vZXhhbXBsZS5jeXByZXNzLmlvL2NvbW1hbmRzL25ldHdvcmstcmVxdWVzdHMnKVxuICB9KVxuXG4gIC8vIE1hbmFnZSBIVFRQIHJlcXVlc3RzIGluIHlvdXIgYXBwXG5cbiAgaXQoJ2N5LnJlcXVlc3QoKSAtIG1ha2UgYW4gWEhSIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3JlcXVlc3RcbiAgICBjeS5yZXF1ZXN0KCdodHRwczovL2pzb25wbGFjZWhvbGRlci5jeXByZXNzLmlvL2NvbW1lbnRzJylcbiAgICAgIC5zaG91bGQoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvLmVxKDIwMClcbiAgICAgICAgLy8gdGhlIHNlcnZlciBzb21ldGltZXMgZ2V0cyBhbiBleHRyYSBjb21tZW50IHBvc3RlZCBmcm9tIGFub3RoZXIgbWFjaGluZVxuICAgICAgICAvLyB3aGljaCBnZXRzIHJldHVybmVkIGFzIDEgZXh0cmEgb2JqZWN0XG4gICAgICAgIGV4cGVjdChyZXNwb25zZS5ib2R5KS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKS5hbmQuYmUub25lT2YoWzUwMCwgNTAxXSlcbiAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50by5oYXZlLnByb3BlcnR5KCdoZWFkZXJzJylcbiAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50by5oYXZlLnByb3BlcnR5KCdkdXJhdGlvbicpXG4gICAgICB9KVxuICB9KVxuXG4gIGl0KCdjeS5yZXF1ZXN0KCkgLSB2ZXJpZnkgcmVzcG9uc2UgdXNpbmcgQkREIHN5bnRheCcsICgpID0+IHtcbiAgICBjeS5yZXF1ZXN0KCdodHRwczovL2pzb25wbGFjZWhvbGRlci5jeXByZXNzLmlvL2NvbW1lbnRzJylcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9hc3NlcnRpb25zXG4gICAgICBleHBlY3QocmVzcG9uc2UpLnByb3BlcnR5KCdzdGF0dXMnKS50by5lcXVhbCgyMDApXG4gICAgICBleHBlY3QocmVzcG9uc2UpLnByb3BlcnR5KCdib2R5JykudG8uaGF2ZS5wcm9wZXJ0eSgnbGVuZ3RoJykuYW5kLmJlLm9uZU9mKFs1MDAsIDUwMV0pXG4gICAgICBleHBlY3QocmVzcG9uc2UpLnRvLmluY2x1ZGUua2V5cygnaGVhZGVycycsICdkdXJhdGlvbicpXG4gICAgfSlcbiAgfSlcblxuICBpdCgnY3kucmVxdWVzdCgpIHdpdGggcXVlcnkgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAvLyB3aWxsIGV4ZWN1dGUgcmVxdWVzdFxuICAgIC8vIGh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLmN5cHJlc3MuaW8vY29tbWVudHM/cG9zdElkPTEmaWQ9M1xuICAgIGN5LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIuY3lwcmVzcy5pby9jb21tZW50cycsXG4gICAgICBxczoge1xuICAgICAgICBwb3N0SWQ6IDEsXG4gICAgICAgIGlkOiAzLFxuICAgICAgfSxcbiAgICB9KVxuICAgIC5pdHMoJ2JvZHknKVxuICAgIC5zaG91bGQoJ2JlLmFuJywgJ2FycmF5JylcbiAgICAuYW5kKCdoYXZlLmxlbmd0aCcsIDEpXG4gICAgLml0cygnMCcpIC8vIHlpZWxkcyBmaXJzdCBlbGVtZW50IG9mIHRoZSBhcnJheVxuICAgIC5zaG91bGQoJ2NvbnRhaW4nLCB7XG4gICAgICBwb3N0SWQ6IDEsXG4gICAgICBpZDogMyxcbiAgICB9KVxuICB9KVxuXG4gIGl0KCdjeS5yZXF1ZXN0KCkgLSBwYXNzIHJlc3VsdCB0byB0aGUgc2Vjb25kIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgLy8gZmlyc3QsIGxldCdzIGZpbmQgb3V0IHRoZSB1c2VySWQgb2YgdGhlIGZpcnN0IHVzZXIgd2UgaGF2ZVxuICAgIGN5LnJlcXVlc3QoJ2h0dHBzOi8vanNvbnBsYWNlaG9sZGVyLmN5cHJlc3MuaW8vdXNlcnM/X2xpbWl0PTEnKVxuICAgICAgLml0cygnYm9keScpIC8vIHlpZWxkcyB0aGUgcmVzcG9uc2Ugb2JqZWN0XG4gICAgICAuaXRzKCcwJykgLy8geWllbGRzIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSByZXR1cm5lZCBsaXN0XG4gICAgICAvLyB0aGUgYWJvdmUgdHdvIGNvbW1hbmRzIGl0cygnYm9keScpLml0cygnMCcpXG4gICAgICAvLyBjYW4gYmUgd3JpdHRlbiBhcyBpdHMoJ2JvZHkuMCcpXG4gICAgICAvLyBpZiB5b3UgZG8gbm90IGNhcmUgYWJvdXQgVHlwZVNjcmlwdCBjaGVja3NcbiAgICAgIC50aGVuKCh1c2VyKSA9PiB7XG4gICAgICAgIGV4cGVjdCh1c2VyKS5wcm9wZXJ0eSgnaWQnKS50by5iZS5hKCdudW1iZXInKVxuICAgICAgICAvLyBtYWtlIGEgbmV3IHBvc3Qgb24gYmVoYWxmIG9mIHRoZSB1c2VyXG4gICAgICAgIGN5LnJlcXVlc3QoJ1BPU1QnLCAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIuY3lwcmVzcy5pby9wb3N0cycsIHtcbiAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgICAgdGl0bGU6ICdDeXByZXNzIFRlc3QgUnVubmVyJyxcbiAgICAgICAgICBib2R5OiAnRmFzdCwgZWFzeSBhbmQgcmVsaWFibGUgdGVzdGluZyBmb3IgYW55dGhpbmcgdGhhdCBydW5zIGluIGEgYnJvd3Nlci4nLFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC8vIG5vdGUgdGhhdCB0aGUgdmFsdWUgaGVyZSBpcyB0aGUgcmV0dXJuZWQgdmFsdWUgb2YgdGhlIDJuZCByZXF1ZXN0XG4gICAgICAvLyB3aGljaCBpcyB0aGUgbmV3IHBvc3Qgb2JqZWN0XG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5wcm9wZXJ0eSgnc3RhdHVzJykudG8uZXF1YWwoMjAxKSAvLyBuZXcgZW50aXR5IGNyZWF0ZWRcbiAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5wcm9wZXJ0eSgnYm9keScpLnRvLmNvbnRhaW4oe1xuICAgICAgICAgIHRpdGxlOiAnQ3lwcmVzcyBUZXN0IFJ1bm5lcicsXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gd2UgZG9uJ3Qga25vdyB0aGUgZXhhY3QgcG9zdCBpZCAtIG9ubHkgdGhhdCBpdCB3aWxsIGJlID4gMTAwXG4gICAgICAgIC8vIHNpbmNlIEpTT05QbGFjZWhvbGRlciBoYXMgYnVpbHQtaW4gMTAwIHBvc3RzXG4gICAgICAgIGV4cGVjdChyZXNwb25zZS5ib2R5KS5wcm9wZXJ0eSgnaWQnKS50by5iZS5hKCdudW1iZXInKVxuICAgICAgICAgIC5hbmQudG8uYmUuZ3QoMTAwKVxuXG4gICAgICAgIC8vIHdlIGRvbid0IGtub3cgdGhlIHVzZXIgaWQgaGVyZSAtIHNpbmNlIGl0IHdhcyBpbiBhYm92ZSBjbG9zdXJlXG4gICAgICAgIC8vIHNvIGluIHRoaXMgdGVzdCBqdXN0IGNvbmZpcm0gdGhhdCB0aGUgcHJvcGVydHkgaXMgdGhlcmVcbiAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmJvZHkpLnByb3BlcnR5KCd1c2VySWQnKS50by5iZS5hKCdudW1iZXInKVxuICAgICAgfSlcbiAgfSlcblxuICBpdCgnY3kucmVxdWVzdCgpIC0gc2F2ZSByZXNwb25zZSBpbiB0aGUgc2hhcmVkIHRlc3QgY29udGV4dCcsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vdmFyaWFibGVzLWFuZC1hbGlhc2VzXG4gICAgY3kucmVxdWVzdCgnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIuY3lwcmVzcy5pby91c2Vycz9fbGltaXQ9MScpXG4gICAgICAuaXRzKCdib2R5JykuaXRzKCcwJykgLy8geWllbGRzIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSByZXR1cm5lZCBsaXN0XG4gICAgICAuYXMoJ3VzZXInKSAvLyBzYXZlcyB0aGUgb2JqZWN0IGluIHRoZSB0ZXN0IGNvbnRleHRcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gTk9URSDwn5GAXG4gICAgICAgIC8vICBCeSB0aGUgdGltZSB0aGlzIGNhbGxiYWNrIHJ1bnMgdGhlIFwiYXMoJ3VzZXInKVwiIGNvbW1hbmRcbiAgICAgICAgLy8gIGhhcyBzYXZlZCB0aGUgdXNlciBvYmplY3QgaW4gdGhlIHRlc3QgY29udGV4dC5cbiAgICAgICAgLy8gIFRvIGFjY2VzcyB0aGUgdGVzdCBjb250ZXh0IHdlIG5lZWQgdG8gdXNlXG4gICAgICAgIC8vICB0aGUgXCJmdW5jdGlvbiAoKSB7IC4uLiB9XCIgY2FsbGJhY2sgZm9ybSxcbiAgICAgICAgLy8gIG90aGVyd2lzZSBcInRoaXNcIiBwb2ludHMgYXQgYSB3cm9uZyBvciB1bmRlZmluZWQgb2JqZWN0IVxuICAgICAgICBjeS5yZXF1ZXN0KCdQT1NUJywgJ2h0dHBzOi8vanNvbnBsYWNlaG9sZGVyLmN5cHJlc3MuaW8vcG9zdHMnLCB7XG4gICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXIuaWQsXG4gICAgICAgICAgdGl0bGU6ICdDeXByZXNzIFRlc3QgUnVubmVyJyxcbiAgICAgICAgICBib2R5OiAnRmFzdCwgZWFzeSBhbmQgcmVsaWFibGUgdGVzdGluZyBmb3IgYW55dGhpbmcgdGhhdCBydW5zIGluIGEgYnJvd3Nlci4nLFxuICAgICAgICB9KVxuICAgICAgICAuaXRzKCdib2R5JykuYXMoJ3Bvc3QnKSAvLyBzYXZlIHRoZSBuZXcgcG9zdCBmcm9tIHRoZSByZXNwb25zZVxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gV2hlbiB0aGlzIGNhbGxiYWNrIHJ1bnMsIGJvdGggXCJjeS5yZXF1ZXN0XCIgQVBJIGNvbW1hbmRzIGhhdmUgZmluaXNoZWRcbiAgICAgICAgLy8gYW5kIHRoZSB0ZXN0IGNvbnRleHQgaGFzIFwidXNlclwiIGFuZCBcInBvc3RcIiBvYmplY3RzIHNldC5cbiAgICAgICAgLy8gTGV0J3MgdmVyaWZ5IHRoZW0uXG4gICAgICAgIGV4cGVjdCh0aGlzLnBvc3QsICdwb3N0IGhhcyB0aGUgcmlnaHQgdXNlciBpZCcpLnByb3BlcnR5KCd1c2VySWQnKS50by5lcXVhbCh0aGlzLnVzZXIuaWQpXG4gICAgICB9KVxuICB9KVxuXG4gIGl0KCdjeS5pbnRlcmNlcHQoKSAtIHJvdXRlIHJlc3BvbnNlcyB0byBtYXRjaGluZyByZXF1ZXN0cycsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vaW50ZXJjZXB0XG5cbiAgICBsZXQgbWVzc2FnZSA9ICd3aG9hLCB0aGlzIGNvbW1lbnQgZG9lcyBub3QgZXhpc3QnXG5cbiAgICAvLyBMaXN0ZW4gdG8gR0VUIHRvIGNvbW1lbnRzLzFcbiAgICBjeS5pbnRlcmNlcHQoJ0dFVCcsICcqKi9jb21tZW50cy8qJykuYXMoJ2dldENvbW1lbnQnKVxuXG4gICAgLy8gd2UgaGF2ZSBjb2RlIHRoYXQgZ2V0cyBhIGNvbW1lbnQgd2hlblxuICAgIC8vIHRoZSBidXR0b24gaXMgY2xpY2tlZCBpbiBzY3JpcHRzLmpzXG4gICAgY3kuZ2V0KCcubmV0d29yay1idG4nKS5jbGljaygpXG5cbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vd2FpdFxuICAgIGN5LndhaXQoJ0BnZXRDb21tZW50JykuaXRzKCdyZXNwb25zZS5zdGF0dXNDb2RlJykuc2hvdWxkKCdiZS5vbmVPZicsIFsyMDAsIDMwNF0pXG5cbiAgICAvLyBMaXN0ZW4gdG8gUE9TVCB0byBjb21tZW50c1xuICAgIGN5LmludGVyY2VwdCgnUE9TVCcsICcqKi9jb21tZW50cycpLmFzKCdwb3N0Q29tbWVudCcpXG5cbiAgICAvLyB3ZSBoYXZlIGNvZGUgdGhhdCBwb3N0cyBhIGNvbW1lbnQgd2hlblxuICAgIC8vIHRoZSBidXR0b24gaXMgY2xpY2tlZCBpbiBzY3JpcHRzLmpzXG4gICAgY3kuZ2V0KCcubmV0d29yay1wb3N0JykuY2xpY2soKVxuICAgIGN5LndhaXQoJ0Bwb3N0Q29tbWVudCcpLnNob3VsZCgoeyByZXF1ZXN0LCByZXNwb25zZSB9KSA9PiB7XG4gICAgICBleHBlY3QocmVxdWVzdC5ib2R5KS50by5pbmNsdWRlKCdlbWFpbCcpXG4gICAgICBleHBlY3QocmVxdWVzdC5oZWFkZXJzKS50by5oYXZlLnByb3BlcnR5KCdjb250ZW50LXR5cGUnKVxuICAgICAgZXhwZWN0KHJlc3BvbnNlICYmIHJlc3BvbnNlLmJvZHkpLnRvLmhhdmUucHJvcGVydHkoJ25hbWUnLCAnVXNpbmcgUE9TVCBpbiBjeS5pbnRlcmNlcHQoKScpXG4gICAgfSlcblxuICAgIC8vIFN0dWIgYSByZXNwb25zZSB0byBQVVQgY29tbWVudHMvICoqKipcbiAgICBjeS5pbnRlcmNlcHQoe1xuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHVybDogJyoqL2NvbW1lbnRzLyonLFxuICAgIH0sIHtcbiAgICAgIHN0YXR1c0NvZGU6IDQwNCxcbiAgICAgIGJvZHk6IHsgZXJyb3I6IG1lc3NhZ2UgfSxcbiAgICAgIGhlYWRlcnM6IHsgJ2FjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbic6ICcqJyB9LFxuICAgICAgZGVsYXlNczogNTAwLFxuICAgIH0pLmFzKCdwdXRDb21tZW50JylcblxuICAgIC8vIHdlIGhhdmUgY29kZSB0aGF0IHB1dHMgYSBjb21tZW50IHdoZW5cbiAgICAvLyB0aGUgYnV0dG9uIGlzIGNsaWNrZWQgaW4gc2NyaXB0cy5qc1xuICAgIGN5LmdldCgnLm5ldHdvcmstcHV0JykuY2xpY2soKVxuXG4gICAgY3kud2FpdCgnQHB1dENvbW1lbnQnKVxuXG4gICAgLy8gb3VyIDQwNCBzdGF0dXNDb2RlIGxvZ2ljIGluIHNjcmlwdHMuanMgZXhlY3V0ZWRcbiAgICBjeS5nZXQoJy5uZXR3b3JrLXB1dC1jb21tZW50Jykuc2hvdWxkKCdjb250YWluJywgbWVzc2FnZSlcbiAgfSlcbn0pXG4iXSwibmFtZXMiOlsiY29udGV4dCIsImJlZm9yZUVhY2giLCJjeSIsInZpc2l0IiwiaXQiLCJyZXF1ZXN0Iiwic2hvdWxkIiwicmVzcG9uc2UiLCJleHBlY3QiLCJzdGF0dXMiLCJ0byIsImVxIiwiYm9keSIsImhhdmUiLCJwcm9wZXJ0eSIsImFuZCIsImJlIiwib25lT2YiLCJ0aGVuIiwiZXF1YWwiLCJpbmNsdWRlIiwia2V5cyIsInVybCIsInFzIiwicG9zdElkIiwiaWQiLCJpdHMiLCJ1c2VyIiwiYSIsInVzZXJJZCIsInRpdGxlIiwiY29udGFpbiIsImd0IiwiYXMiLCJwb3N0IiwibWVzc2FnZSIsImludGVyY2VwdCIsImdldCIsImNsaWNrIiwid2FpdCIsImhlYWRlcnMiLCJtZXRob2QiLCJzdGF0dXNDb2RlIiwiZXJyb3IiLCJkZWxheU1zIl0sInNvdXJjZVJvb3QiOiIifQ==