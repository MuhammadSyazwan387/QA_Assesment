/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!****************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/misc.cy.js ***!
  \****************************************************/


/// <reference types="cypress" />

context('Misc', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/misc');
  });
  it('cy.exec() - execute a system command', () => {
    // execute a system command.
    // so you can take actions necessary for
    // your test outside the scope of Cypress.
    // https://on.cypress.io/exec

    // we can use Cypress.platform string to
    // select appropriate command
    // https://on.cypress/io/platform
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`);

    // on CircleCI Windows build machines we have a failure to run bash shell
    // https://github.com/cypress-io/cypress/issues/5169
    // so skip some of the tests by passing flag "--env circle=true"
    const isCircleOnWindows = Cypress.platform === 'win32' && Cypress.env('circle');
    if (isCircleOnWindows) {
      cy.log('Skipping test on CircleCI');
      return;
    }

    // cy.exec problem on Shippable CI
    // https://github.com/cypress-io/cypress/issues/6718
    const isShippable = Cypress.platform === 'linux' && Cypress.env('shippable');
    if (isShippable) {
      cy.log('Skipping test on ShippableCI');
      return;
    }
    cy.exec('echo Jane Lane').its('stdout').should('contain', 'Jane Lane');
    if (Cypress.platform === 'win32') {
      cy.exec(`print ${Cypress.config('configFile')}`).its('stderr').should('be.empty');
    } else {
      cy.exec(`cat ${Cypress.config('configFile')}`).its('stderr').should('be.empty');
      cy.log(`Cypress version ${Cypress.version}`);
      if (Cypress.version.split('.').map(Number)[0] < 15) {
        cy.exec('pwd').its('code').should('eq', 0);
      } else {
        cy.exec('pwd').its('exitCode').should('eq', 0);
      }
    }
  });
  it('cy.focused() - get the DOM element that has focus', () => {
    // https://on.cypress.io/focused
    cy.get('.misc-form').find('#name').click();
    cy.focused().should('have.id', 'name');
    cy.get('.misc-form').find('#description').click();
    cy.focused().should('have.id', 'description');
  });
  context('Cypress.Screenshot', function () {
    it('cy.screenshot() - take a screenshot', () => {
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image');
    });
    it('Cypress.Screenshot.defaults() - change default config of screenshots', function () {
      Cypress.Screenshot.defaults({
        blackout: ['.foo'],
        capture: 'viewport',
        clip: {
          x: 0,
          y: 0,
          width: 200,
          height: 200
        },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        onBeforeScreenshot() {},
        onAfterScreenshot() {}
      });
    });
  });
  it('cy.wrap() - wrap an object', () => {
    // https://on.cypress.io/wrap
    cy.wrap({
      foo: 'bar'
    }).should('have.property', 'foo').and('include', 'bar');
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzYy5jeS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUFBLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTTtFQUNwQkMsVUFBVSxDQUFDLE1BQU07SUFDZkMsRUFBRSxDQUFDQyxLQUFLLENBQUMsMENBQTBDLENBQUM7RUFDdEQsQ0FBQyxDQUFDO0VBRUZDLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxNQUFNO0lBQy9DO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBRixFQUFFLENBQUNHLEdBQUcsQ0FBQyxZQUFZQyxPQUFPLENBQUNDLFFBQVEsaUJBQWlCRCxPQUFPLENBQUNFLElBQUksRUFBRSxDQUFDOztJQUVuRTtJQUNBO0lBQ0E7SUFDQSxNQUFNQyxpQkFBaUIsR0FBR0gsT0FBTyxDQUFDQyxRQUFRLEtBQUssT0FBTyxJQUFJRCxPQUFPLENBQUNJLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFFL0UsSUFBSUQsaUJBQWlCLEVBQUU7TUFDckJQLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLDJCQUEyQixDQUFDO01BRW5DO0lBQ0Y7O0lBRUE7SUFDQTtJQUNBLE1BQU1NLFdBQVcsR0FBR0wsT0FBTyxDQUFDQyxRQUFRLEtBQUssT0FBTyxJQUFJRCxPQUFPLENBQUNJLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFFNUUsSUFBSUMsV0FBVyxFQUFFO01BQ2ZULEVBQUUsQ0FBQ0csR0FBRyxDQUFDLDhCQUE4QixDQUFDO01BRXRDO0lBQ0Y7SUFFQUgsRUFBRSxDQUFDVSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FDdEJDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7SUFFL0MsSUFBSVIsT0FBTyxDQUFDQyxRQUFRLEtBQUssT0FBTyxFQUFFO01BQ2hDTCxFQUFFLENBQUNVLElBQUksQ0FBQyxTQUFTTixPQUFPLENBQUNTLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQzdDRixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDckMsQ0FBQyxNQUNJO01BQ0haLEVBQUUsQ0FBQ1UsSUFBSSxDQUFDLE9BQU9OLE9BQU8sQ0FBQ1MsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FDM0NGLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLFVBQVUsQ0FBQztNQUVuQ1osRUFBRSxDQUFDRyxHQUFHLENBQUMsbUJBQW1CQyxPQUFPLENBQUNVLE9BQU8sRUFBRSxDQUFDO01BQzVDLElBQUlWLE9BQU8sQ0FBQ1UsT0FBTyxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2xEakIsRUFBRSxDQUFDVSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ1hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7TUFDaEMsQ0FBQyxNQUNJO1FBQ0haLEVBQUUsQ0FBQ1UsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNYQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO01BQ3BDO0lBQ0Y7RUFDRixDQUFDLENBQUM7RUFFRlYsRUFBRSxDQUFDLG1EQUFtRCxFQUFFLE1BQU07SUFDNUQ7SUFDQUYsRUFBRSxDQUFDa0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQzFDcEIsRUFBRSxDQUFDcUIsT0FBTyxDQUFDLENBQUMsQ0FBQ1QsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7SUFFdENaLEVBQUUsQ0FBQ2tCLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FBQztJQUNqRHBCLEVBQUUsQ0FBQ3FCLE9BQU8sQ0FBQyxDQUFDLENBQUNULE1BQU0sQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDO0VBQy9DLENBQUMsQ0FBQztFQUVGZCxPQUFPLENBQUMsb0JBQW9CLEVBQUUsWUFBWTtJQUN4Q0ksRUFBRSxDQUFDLHFDQUFxQyxFQUFFLE1BQU07TUFDOUM7TUFDQUYsRUFBRSxDQUFDc0IsVUFBVSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRnBCLEVBQUUsQ0FBQyxzRUFBc0UsRUFBRSxZQUFZO01BQ3JGRSxPQUFPLENBQUNtQixVQUFVLENBQUNDLFFBQVEsQ0FBQztRQUMxQkMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2xCQyxPQUFPLEVBQUUsVUFBVTtRQUNuQkMsSUFBSSxFQUFFO1VBQUVDLENBQUMsRUFBRSxDQUFDO1VBQUVDLENBQUMsRUFBRSxDQUFDO1VBQUVDLEtBQUssRUFBRSxHQUFHO1VBQUVDLE1BQU0sRUFBRTtRQUFJLENBQUM7UUFDN0NDLEtBQUssRUFBRSxLQUFLO1FBQ1pDLDBCQUEwQixFQUFFLElBQUk7UUFDaENDLHNCQUFzQixFQUFFLElBQUk7UUFDNUJDLGtCQUFrQkEsQ0FBQSxFQUFJLENBQUUsQ0FBQztRQUN6QkMsaUJBQWlCQSxDQUFBLEVBQUksQ0FBRTtNQUN6QixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFFRmxDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNO0lBQ3JDO0lBQ0FGLEVBQUUsQ0FBQ3FDLElBQUksQ0FBQztNQUFFQyxHQUFHLEVBQUU7SUFBTSxDQUFDLENBQUMsQ0FDcEIxQixNQUFNLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUM5QjJCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO0VBQzFCLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFyYWJhbmstYXV0b21hdGlvbi8uL2N5cHJlc3MvZTJlLzItYWR2YW5jZWQtZXhhbXBsZXMvbWlzYy5jeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cImN5cHJlc3NcIiAvPlxuXG5jb250ZXh0KCdNaXNjJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8vY29tbWFuZHMvbWlzYycpXG4gIH0pXG5cbiAgaXQoJ2N5LmV4ZWMoKSAtIGV4ZWN1dGUgYSBzeXN0ZW0gY29tbWFuZCcsICgpID0+IHtcbiAgICAvLyBleGVjdXRlIGEgc3lzdGVtIGNvbW1hbmQuXG4gICAgLy8gc28geW91IGNhbiB0YWtlIGFjdGlvbnMgbmVjZXNzYXJ5IGZvclxuICAgIC8vIHlvdXIgdGVzdCBvdXRzaWRlIHRoZSBzY29wZSBvZiBDeXByZXNzLlxuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9leGVjXG5cbiAgICAvLyB3ZSBjYW4gdXNlIEN5cHJlc3MucGxhdGZvcm0gc3RyaW5nIHRvXG4gICAgLy8gc2VsZWN0IGFwcHJvcHJpYXRlIGNvbW1hbmRcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MvaW8vcGxhdGZvcm1cbiAgICBjeS5sb2coYFBsYXRmb3JtICR7Q3lwcmVzcy5wbGF0Zm9ybX0gYXJjaGl0ZWN0dXJlICR7Q3lwcmVzcy5hcmNofWApXG5cbiAgICAvLyBvbiBDaXJjbGVDSSBXaW5kb3dzIGJ1aWxkIG1hY2hpbmVzIHdlIGhhdmUgYSBmYWlsdXJlIHRvIHJ1biBiYXNoIHNoZWxsXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2N5cHJlc3MtaW8vY3lwcmVzcy9pc3N1ZXMvNTE2OVxuICAgIC8vIHNvIHNraXAgc29tZSBvZiB0aGUgdGVzdHMgYnkgcGFzc2luZyBmbGFnIFwiLS1lbnYgY2lyY2xlPXRydWVcIlxuICAgIGNvbnN0IGlzQ2lyY2xlT25XaW5kb3dzID0gQ3lwcmVzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyAmJiBDeXByZXNzLmVudignY2lyY2xlJylcblxuICAgIGlmIChpc0NpcmNsZU9uV2luZG93cykge1xuICAgICAgY3kubG9nKCdTa2lwcGluZyB0ZXN0IG9uIENpcmNsZUNJJylcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY3kuZXhlYyBwcm9ibGVtIG9uIFNoaXBwYWJsZSBDSVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jeXByZXNzLWlvL2N5cHJlc3MvaXNzdWVzLzY3MThcbiAgICBjb25zdCBpc1NoaXBwYWJsZSA9IEN5cHJlc3MucGxhdGZvcm0gPT09ICdsaW51eCcgJiYgQ3lwcmVzcy5lbnYoJ3NoaXBwYWJsZScpXG5cbiAgICBpZiAoaXNTaGlwcGFibGUpIHtcbiAgICAgIGN5LmxvZygnU2tpcHBpbmcgdGVzdCBvbiBTaGlwcGFibGVDSScpXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGN5LmV4ZWMoJ2VjaG8gSmFuZSBMYW5lJylcbiAgICAgIC5pdHMoJ3N0ZG91dCcpLnNob3VsZCgnY29udGFpbicsICdKYW5lIExhbmUnKVxuXG4gICAgaWYgKEN5cHJlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgIGN5LmV4ZWMoYHByaW50ICR7Q3lwcmVzcy5jb25maWcoJ2NvbmZpZ0ZpbGUnKX1gKVxuICAgICAgICAuaXRzKCdzdGRlcnInKS5zaG91bGQoJ2JlLmVtcHR5JylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjeS5leGVjKGBjYXQgJHtDeXByZXNzLmNvbmZpZygnY29uZmlnRmlsZScpfWApXG4gICAgICAgIC5pdHMoJ3N0ZGVycicpLnNob3VsZCgnYmUuZW1wdHknKVxuXG4gICAgICBjeS5sb2coYEN5cHJlc3MgdmVyc2lvbiAke0N5cHJlc3MudmVyc2lvbn1gKVxuICAgICAgaWYgKEN5cHJlc3MudmVyc2lvbi5zcGxpdCgnLicpLm1hcChOdW1iZXIpWzBdIDwgMTUpIHtcbiAgICAgICAgY3kuZXhlYygncHdkJylcbiAgICAgICAgICAuaXRzKCdjb2RlJykuc2hvdWxkKCdlcScsIDApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY3kuZXhlYygncHdkJylcbiAgICAgICAgICAuaXRzKCdleGl0Q29kZScpLnNob3VsZCgnZXEnLCAwKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBpdCgnY3kuZm9jdXNlZCgpIC0gZ2V0IHRoZSBET00gZWxlbWVudCB0aGF0IGhhcyBmb2N1cycsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vZm9jdXNlZFxuICAgIGN5LmdldCgnLm1pc2MtZm9ybScpLmZpbmQoJyNuYW1lJykuY2xpY2soKVxuICAgIGN5LmZvY3VzZWQoKS5zaG91bGQoJ2hhdmUuaWQnLCAnbmFtZScpXG5cbiAgICBjeS5nZXQoJy5taXNjLWZvcm0nKS5maW5kKCcjZGVzY3JpcHRpb24nKS5jbGljaygpXG4gICAgY3kuZm9jdXNlZCgpLnNob3VsZCgnaGF2ZS5pZCcsICdkZXNjcmlwdGlvbicpXG4gIH0pXG5cbiAgY29udGV4dCgnQ3lwcmVzcy5TY3JlZW5zaG90JywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdjeS5zY3JlZW5zaG90KCkgLSB0YWtlIGEgc2NyZWVuc2hvdCcsICgpID0+IHtcbiAgICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9zY3JlZW5zaG90XG4gICAgICBjeS5zY3JlZW5zaG90KCdteS1pbWFnZScpXG4gICAgfSlcblxuICAgIGl0KCdDeXByZXNzLlNjcmVlbnNob3QuZGVmYXVsdHMoKSAtIGNoYW5nZSBkZWZhdWx0IGNvbmZpZyBvZiBzY3JlZW5zaG90cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIEN5cHJlc3MuU2NyZWVuc2hvdC5kZWZhdWx0cyh7XG4gICAgICAgIGJsYWNrb3V0OiBbJy5mb28nXSxcbiAgICAgICAgY2FwdHVyZTogJ3ZpZXdwb3J0JyxcbiAgICAgICAgY2xpcDogeyB4OiAwLCB5OiAwLCB3aWR0aDogMjAwLCBoZWlnaHQ6IDIwMCB9LFxuICAgICAgICBzY2FsZTogZmFsc2UsXG4gICAgICAgIGRpc2FibGVUaW1lcnNBbmRBbmltYXRpb25zOiB0cnVlLFxuICAgICAgICBzY3JlZW5zaG90T25SdW5GYWlsdXJlOiB0cnVlLFxuICAgICAgICBvbkJlZm9yZVNjcmVlbnNob3QgKCkgeyB9LFxuICAgICAgICBvbkFmdGVyU2NyZWVuc2hvdCAoKSB7IH0sXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ2N5LndyYXAoKSAtIHdyYXAgYW4gb2JqZWN0JywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby93cmFwXG4gICAgY3kud3JhcCh7IGZvbzogJ2JhcicgfSlcbiAgICAgIC5zaG91bGQoJ2hhdmUucHJvcGVydHknLCAnZm9vJylcbiAgICAgIC5hbmQoJ2luY2x1ZGUnLCAnYmFyJylcbiAgfSlcbn0pXG4iXSwibmFtZXMiOlsiY29udGV4dCIsImJlZm9yZUVhY2giLCJjeSIsInZpc2l0IiwiaXQiLCJsb2ciLCJDeXByZXNzIiwicGxhdGZvcm0iLCJhcmNoIiwiaXNDaXJjbGVPbldpbmRvd3MiLCJlbnYiLCJpc1NoaXBwYWJsZSIsImV4ZWMiLCJpdHMiLCJzaG91bGQiLCJjb25maWciLCJ2ZXJzaW9uIiwic3BsaXQiLCJtYXAiLCJOdW1iZXIiLCJnZXQiLCJmaW5kIiwiY2xpY2siLCJmb2N1c2VkIiwic2NyZWVuc2hvdCIsIlNjcmVlbnNob3QiLCJkZWZhdWx0cyIsImJsYWNrb3V0IiwiY2FwdHVyZSIsImNsaXAiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0Iiwic2NhbGUiLCJkaXNhYmxlVGltZXJzQW5kQW5pbWF0aW9ucyIsInNjcmVlbnNob3RPblJ1bkZhaWx1cmUiLCJvbkJlZm9yZVNjcmVlbnNob3QiLCJvbkFmdGVyU2NyZWVuc2hvdCIsIndyYXAiLCJmb28iLCJhbmQiXSwic291cmNlUm9vdCI6IiJ9