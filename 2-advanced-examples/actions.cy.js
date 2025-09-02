/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/actions.cy.js ***!
  \*******************************************************/


/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions');
  });

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.action-email').type('fake@email.com');
    cy.get('.action-email').should('have.value', 'fake@email.com');

    // .type() with special character sequences
    cy.get('.action-email').type('{leftarrow}{rightarrow}{uparrow}{downarrow}');
    cy.get('.action-email').type('{del}{selectall}{backspace}');

    // .type() with key modifiers
    cy.get('.action-email').type('{alt}{option}'); // these are equivalent
    cy.get('.action-email').type('{ctrl}{control}'); // these are equivalent
    cy.get('.action-email').type('{meta}{command}{cmd}'); // these are equivalent
    cy.get('.action-email').type('{shift}');

    // Delay each keypress by 0.1 sec
    cy.get('.action-email').type('slow.typing@email.com', {
      delay: 100
    });
    cy.get('.action-email').should('have.value', 'slow.typing@email.com');
    cy.get('.action-disabled')
    // Ignore error checking prior to type
    // like whether the input is visible or disabled
    .type('disabled error checking', {
      force: true
    });
    cy.get('.action-disabled').should('have.value', 'disabled error checking');
  });
  it('.focus() - focus on a DOM element', () => {
    // https://on.cypress.io/focus
    cy.get('.action-focus').focus();
    cy.get('.action-focus').should('have.class', 'focus').prev().should('have.attr', 'style', 'color: orange;');
  });
  it('.blur() - blur off a DOM element', () => {
    // https://on.cypress.io/blur
    cy.get('.action-blur').type('About to blur');
    cy.get('.action-blur').blur();
    cy.get('.action-blur').should('have.class', 'error').prev().should('have.attr', 'style', 'color: red;');
  });
  it('.clear() - clears an input or textarea element', () => {
    // https://on.cypress.io/clear
    cy.get('.action-clear').type('Clear this text');
    cy.get('.action-clear').should('have.value', 'Clear this text');
    cy.get('.action-clear').clear();
    cy.get('.action-clear').should('have.value', '');
  });
  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.action-form').find('[type="text"]').type('HALFOFF');
    cy.get('.action-form').submit();
    cy.get('.action-form').next().should('contain', 'Your form has been submitted!');
  });
  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    cy.get('.action-btn').click();

    // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // clicking in the center of the element is the default
    cy.get('#action-canvas').click();
    cy.get('#action-canvas').click('topLeft');
    cy.get('#action-canvas').click('top');
    cy.get('#action-canvas').click('topRight');
    cy.get('#action-canvas').click('left');
    cy.get('#action-canvas').click('right');
    cy.get('#action-canvas').click('bottomLeft');
    cy.get('#action-canvas').click('bottom');
    cy.get('#action-canvas').click('bottomRight');

    // .click() accepts an x and y coordinate
    // that controls where the click occurs :)

    cy.get('#action-canvas');
    cy.get('#action-canvas').click(80, 75); // click 80px on x coord and 75px on y coord
    cy.get('#action-canvas').click(170, 75);
    cy.get('#action-canvas').click(80, 165);
    cy.get('#action-canvas').click(100, 185);
    cy.get('#action-canvas').click(125, 190);
    cy.get('#action-canvas').click(150, 185);
    cy.get('#action-canvas').click(170, 165);

    // click multiple elements by passing multiple: true
    cy.get('.action-labels>.label').click({
      multiple: true
    });

    // Ignore error checking prior to clicking
    cy.get('.action-opacity>.btn').click({
      force: true
    });
  });
  it('.dblclick() - double click on a DOM element', () => {
    // https://on.cypress.io/dblclick

    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    cy.get('.action-div').dblclick();
    cy.get('.action-div').should('not.be.visible');
    cy.get('.action-input-hidden').should('be.visible');
  });
  it('.rightclick() - right click on a DOM element', () => {
    // https://on.cypress.io/rightclick

    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    cy.get('.rightclick-action-div').rightclick();
    cy.get('.rightclick-action-div').should('not.be.visible');
    cy.get('.rightclick-action-input-hidden').should('be.visible');
  });
  it('.check() - check a checkbox or radio element', () => {
    // https://on.cypress.io/check

    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check();
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').should('be.checked');
    cy.get('.action-radios [type="radio"]').not('[disabled]').check();
    cy.get('.action-radios [type="radio"]').not('[disabled]').should('be.checked');

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]').check('radio1');
    cy.get('.action-radios [type="radio"]').should('be.checked');

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2']);
    cy.get('.action-multiple-checkboxes [type="checkbox"]').should('be.checked');

    // Ignore error checking prior to checking
    cy.get('.action-checkboxes [disabled]').check({
      force: true
    });
    cy.get('.action-checkboxes [disabled]').should('be.checked');
    cy.get('.action-radios [type="radio"]').check('radio3', {
      force: true
    });
    cy.get('.action-radios [type="radio"]').should('be.checked');
  });
  it('.uncheck() - uncheck a checkbox element', () => {
    // https://on.cypress.io/uncheck

    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck();
    cy.get('.action-check [type="checkbox"]').not('[disabled]').should('not.be.checked');

    // .uncheck() accepts a value argument
    cy.get('.action-check [type="checkbox"]').check('checkbox1');
    cy.get('.action-check [type="checkbox"]').uncheck('checkbox1');
    cy.get('.action-check [type="checkbox"][value="checkbox1"]').should('not.be.checked');

    // .uncheck() accepts an array of values
    cy.get('.action-check [type="checkbox"]').check(['checkbox1', 'checkbox3']);
    cy.get('.action-check [type="checkbox"]').uncheck(['checkbox1', 'checkbox3']);
    cy.get('.action-check [type="checkbox"][value="checkbox1"]').should('not.be.checked');
    cy.get('.action-check [type="checkbox"][value="checkbox3"]').should('not.be.checked');

    // Ignore error checking prior to unchecking
    cy.get('.action-check [disabled]').uncheck({
      force: true
    });
    cy.get('.action-check [disabled]').should('not.be.checked');
  });
  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select

    // at first, no option should be selected
    cy.get('.action-select').should('have.value', '--Select a fruit--');

    // Select option(s) with matching text content
    cy.get('.action-select').select('apples');
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get('.action-select').should('have.value', 'fr-apples');
    cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas']);
    cy.get('.action-select-multiple')
    // when getting multiple values, invoke "val" method first
    .invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);

    // Select option(s) with matching value
    cy.get('.action-select').select('fr-bananas');
    cy.get('.action-select')
    // can attach an assertion right away to the element
    .should('have.value', 'fr-bananas');
    cy.get('.action-select-multiple').select(['fr-apples', 'fr-oranges', 'fr-bananas']);
    cy.get('.action-select-multiple').invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);

    // assert the selected values include oranges
    cy.get('.action-select-multiple').invoke('val').should('include', 'fr-oranges');
  });
  it('.scrollIntoView() - scroll an element into view', () => {
    // https://on.cypress.io/scrollintoview

    // normally all of these buttons are hidden,
    // because they're not within
    // the viewable area of their parent
    // (we need to scroll to see them)
    cy.get('#scroll-horizontal button').should('not.be.visible');

    // scroll the button into view, as if the user had scrolled
    cy.get('#scroll-horizontal button').scrollIntoView();
    cy.get('#scroll-horizontal button').should('be.visible');
    cy.get('#scroll-vertical button').should('not.be.visible');

    // Cypress handles the scroll direction needed
    cy.get('#scroll-vertical button').scrollIntoView();
    cy.get('#scroll-vertical button').should('be.visible');
    cy.get('#scroll-both button').should('not.be.visible');

    // Cypress knows to scroll to the right and down
    cy.get('#scroll-both button').scrollIntoView();
    cy.get('#scroll-both button').should('be.visible');
  });
  it('.trigger() - trigger an event on a DOM element', () => {
    // https://on.cypress.io/trigger

    // To interact with a range input (slider)
    // we need to set its value & trigger the
    // event to signal it changed

    // Here, we invoke jQuery's val() method to set
    // the value and trigger the 'change' event
    cy.get('.trigger-input-range').invoke('val', 25);
    cy.get('.trigger-input-range').trigger('change');
    cy.get('.trigger-input-range').get('input[type=range]').siblings('p').should('have.text', '25');
  });
  it('cy.scrollTo() - scroll the window or element to a position', () => {
    // https://on.cypress.io/scrollto

    // You can scroll to 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // if you chain .scrollTo() off of cy, we will
    // scroll the entire window
    cy.scrollTo('bottom');
    cy.get('#scrollable-horizontal').scrollTo('right');

    // or you can scroll to a specific coordinate:
    // (x axis, y axis) in pixels
    cy.get('#scrollable-vertical').scrollTo(250, 250);

    // or you can scroll to a specific percentage
    // of the (width, height) of the element
    cy.get('#scrollable-both').scrollTo('75%', '25%');

    // control the easing of the scroll (default is 'swing')
    cy.get('#scrollable-vertical').scrollTo('center', {
      easing: 'linear'
    });

    // control the duration of the scroll (in ms)
    cy.get('#scrollable-both').scrollTo('center', {
      duration: 2000
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5jeS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUFBLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTTtFQUN2QkMsVUFBVSxDQUFDLE1BQU07SUFDZkMsRUFBRSxDQUFDQyxLQUFLLENBQUMsNkNBQTZDLENBQUM7RUFDekQsQ0FBQyxDQUFDOztFQUVGOztFQUVBQyxFQUFFLENBQUMsbUNBQW1DLEVBQUUsTUFBTTtJQUM1QztJQUNBRixFQUFFLENBQUNHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQzlDSixFQUFFLENBQUNHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQzs7SUFFOUQ7SUFDQUwsRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQztJQUMzRUosRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQzs7SUFFM0Q7SUFDQUosRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBQztJQUM5Q0osRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDO0lBQ2hESixFQUFFLENBQUNHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUM7SUFDckRKLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDQyxJQUFJLENBQUMsU0FBUyxDQUFDOztJQUV2QztJQUNBSixFQUFFLENBQUNHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLHVCQUF1QixFQUFFO01BQUVFLEtBQUssRUFBRTtJQUFJLENBQUMsQ0FBQztJQUNyRU4sRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsdUJBQXVCLENBQUM7SUFFckVMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGtCQUFrQjtJQUN2QjtJQUNBO0lBQUEsQ0FDQ0MsSUFBSSxDQUFDLHlCQUF5QixFQUFFO01BQUVHLEtBQUssRUFBRTtJQUFLLENBQUMsQ0FBQztJQUNuRFAsRUFBRSxDQUFDRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLFlBQVksRUFBRSx5QkFBeUIsQ0FBQztFQUM1RSxDQUFDLENBQUM7RUFFRkgsRUFBRSxDQUFDLG1DQUFtQyxFQUFFLE1BQU07SUFDNUM7SUFDQUYsRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNLLEtBQUssQ0FBQyxDQUFDO0lBQy9CUixFQUFFLENBQUNHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FDbERJLElBQUksQ0FBQyxDQUFDLENBQUNKLE1BQU0sQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixDQUFDO0VBQzFELENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMsa0NBQWtDLEVBQUUsTUFBTTtJQUMzQztJQUNBRixFQUFFLENBQUNHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM1Q0osRUFBRSxDQUFDRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUNPLElBQUksQ0FBQyxDQUFDO0lBQzdCVixFQUFFLENBQUNHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FDakRJLElBQUksQ0FBQyxDQUFDLENBQUNKLE1BQU0sQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQztFQUN2RCxDQUFDLENBQUM7RUFFRkgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLE1BQU07SUFDekQ7SUFDQUYsRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQ0osRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7SUFDL0RMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDUSxLQUFLLENBQUMsQ0FBQztJQUMvQlgsRUFBRSxDQUFDRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDO0VBQ2xELENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsTUFBTTtJQUNwQztJQUNBRixFQUFFLENBQUNHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FDbkJTLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUV4Q0osRUFBRSxDQUFDRyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUNVLE1BQU0sQ0FBQyxDQUFDO0lBQy9CYixFQUFFLENBQUNHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQ1csSUFBSSxDQUFDLENBQUMsQ0FBQ1QsTUFBTSxDQUFDLFNBQVMsRUFBRSwrQkFBK0IsQ0FBQztFQUNsRixDQUFDLENBQUM7RUFFRkgsRUFBRSxDQUFDLG1DQUFtQyxFQUFFLE1BQU07SUFDNUM7SUFDQUYsRUFBRSxDQUFDRyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUNZLEtBQUssQ0FBQyxDQUFDOztJQUU3QjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQWYsRUFBRSxDQUFDRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ1ksS0FBSyxDQUFDLENBQUM7SUFFaENmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDekNmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckNmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDMUNmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDdENmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDdkNmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDNUNmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDeENmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxhQUFhLENBQUM7O0lBRTdDO0lBQ0E7O0lBRUFmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDO0lBQ3hCSCxFQUFFLENBQUNHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDWSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO0lBQ3ZDZixFQUFFLENBQUNHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDWSxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUN2Q2YsRUFBRSxDQUFDRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ1ksS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUM7SUFDdkNmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDZixFQUFFLENBQUNHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDWSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4Q2YsRUFBRSxDQUFDRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ1ksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeENmLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNZLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOztJQUV4QztJQUNBZixFQUFFLENBQUNHLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDWSxLQUFLLENBQUM7TUFBRUMsUUFBUSxFQUFFO0lBQUssQ0FBQyxDQUFDOztJQUV6RDtJQUNBaEIsRUFBRSxDQUFDRyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQ1ksS0FBSyxDQUFDO01BQUVSLEtBQUssRUFBRTtJQUFLLENBQUMsQ0FBQztFQUN2RCxDQUFDLENBQUM7RUFFRkwsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLE1BQU07SUFDdEQ7O0lBRUE7SUFDQTtJQUNBRixFQUFFLENBQUNHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQ2MsUUFBUSxDQUFDLENBQUM7SUFDaENqQixFQUFFLENBQUNHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQzlDTCxFQUFFLENBQUNHLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDRSxNQUFNLENBQUMsWUFBWSxDQUFDO0VBQ3JELENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMsOENBQThDLEVBQUUsTUFBTTtJQUN2RDs7SUFFQTtJQUNBO0lBQ0FGLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUNlLFVBQVUsQ0FBQyxDQUFDO0lBQzdDbEIsRUFBRSxDQUFDRyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQ3pETCxFQUFFLENBQUNHLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDRSxNQUFNLENBQUMsWUFBWSxDQUFDO0VBQ2hFLENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMsOENBQThDLEVBQUUsTUFBTTtJQUN2RDs7SUFFQTtJQUNBO0lBQ0FGLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUNnQixHQUFHLENBQUMsWUFBWSxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDO0lBQ3hFcEIsRUFBRSxDQUFDRyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQ2dCLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQ2QsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUVyRkwsRUFBRSxDQUFDRyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQ2dCLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDakVwQixFQUFFLENBQUNHLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDZ0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDZCxNQUFNLENBQUMsWUFBWSxDQUFDOztJQUU5RTtJQUNBTCxFQUFFLENBQUNHLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUN2RHBCLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUNFLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0lBRTVEO0lBQ0FMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLCtDQUErQyxDQUFDLENBQUNpQixLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekZwQixFQUFFLENBQUNHLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDRSxNQUFNLENBQUMsWUFBWSxDQUFDOztJQUU1RTtJQUNBTCxFQUFFLENBQUNHLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDO01BQUViLEtBQUssRUFBRTtJQUFLLENBQUMsQ0FBQztJQUM5RFAsRUFBRSxDQUFDRyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUU1REwsRUFBRSxDQUFDRyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQ2lCLEtBQUssQ0FBQyxRQUFRLEVBQUU7TUFBRWIsS0FBSyxFQUFFO0lBQUssQ0FBQyxDQUFDO0lBQ3hFUCxFQUFFLENBQUNHLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDRSxNQUFNLENBQUMsWUFBWSxDQUFDO0VBQzlELENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMseUNBQXlDLEVBQUUsTUFBTTtJQUNsRDs7SUFFQTtJQUNBO0lBQ0FGLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQ3RDZ0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUNqQkUsT0FBTyxDQUFDLENBQUM7SUFDWnJCLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQ3RDZ0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUNqQmQsTUFBTSxDQUFDLGdCQUFnQixDQUFDOztJQUUzQjtJQUNBTCxFQUFFLENBQUNHLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUN0Q2lCLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDckJwQixFQUFFLENBQUNHLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUN0Q2tCLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDdkJyQixFQUFFLENBQUNHLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUN6REUsTUFBTSxDQUFDLGdCQUFnQixDQUFDOztJQUUzQjtJQUNBTCxFQUFFLENBQUNHLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUN0Q2lCLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNwQ3BCLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQ3RDa0IsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDckIsRUFBRSxDQUFDRyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FDekRFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUMzQkwsRUFBRSxDQUFDRyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FDekRFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7SUFFM0I7SUFDQUwsRUFBRSxDQUFDRyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQ2tCLE9BQU8sQ0FBQztNQUFFZCxLQUFLLEVBQUU7SUFBSyxDQUFDLENBQUM7SUFDM0RQLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUNFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztFQUM3RCxDQUFDLENBQUM7RUFFRkgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLE1BQU07SUFDN0Q7O0lBRUE7SUFDQUYsRUFBRSxDQUFDRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FDckJFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7O0lBRTdDO0lBQ0FMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNtQixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3pDO0lBQ0E7SUFDQXRCLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO0lBRTFETCxFQUFFLENBQUNHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUM5Qm1CLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0N0QixFQUFFLENBQUNHLEdBQUcsQ0FBQyx5QkFBeUI7SUFDOUI7SUFBQSxDQUNDb0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNibEIsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7O0lBRWxFO0lBQ0FMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUNtQixNQUFNLENBQUMsWUFBWSxDQUFDO0lBQzdDdEIsRUFBRSxDQUFDRyxHQUFHLENBQUMsZ0JBQWdCO0lBQ3JCO0lBQUEsQ0FDQ0UsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7SUFFckNMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQzlCbUIsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwRHRCLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQzlCb0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNibEIsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7O0lBRWxFO0lBQ0FMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQzlCb0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDbEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7RUFDbEQsQ0FBQyxDQUFDO0VBRUZILEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxNQUFNO0lBQzFEOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0FGLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQ2hDRSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7O0lBRTNCO0lBQ0FMLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUNxQixjQUFjLENBQUMsQ0FBQztJQUNwRHhCLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQ2hDRSxNQUFNLENBQUMsWUFBWSxDQUFDO0lBRXZCTCxFQUFFLENBQUNHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUM5QkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDOztJQUUzQjtJQUNBTCxFQUFFLENBQUNHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDcUIsY0FBYyxDQUFDLENBQUM7SUFDbER4QixFQUFFLENBQUNHLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUM5QkUsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUV2QkwsRUFBRSxDQUFDRyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FDMUJFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7SUFFM0I7SUFDQUwsRUFBRSxDQUFDRyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQ3FCLGNBQWMsQ0FBQyxDQUFDO0lBQzlDeEIsRUFBRSxDQUFDRyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FDMUJFLE1BQU0sQ0FBQyxZQUFZLENBQUM7RUFDekIsQ0FBQyxDQUFDO0VBRUZILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxNQUFNO0lBQ3pEOztJQUVBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0FGLEVBQUUsQ0FBQ0csR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQzNCb0IsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7SUFDcEJ2QixFQUFFLENBQUNHLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUMzQnNCLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDcEJ6QixFQUFFLENBQUNHLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUMzQkEsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUN1QixRQUFRLENBQUMsR0FBRyxDQUFDLENBQ3RDckIsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7RUFDOUIsQ0FBQyxDQUFDO0VBRUZILEVBQUUsQ0FBQyw0REFBNEQsRUFBRSxNQUFNO0lBQ3JFOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0FGLEVBQUUsQ0FBQzJCLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFckIzQixFQUFFLENBQUNHLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDd0IsUUFBUSxDQUFDLE9BQU8sQ0FBQzs7SUFFbEQ7SUFDQTtJQUNBM0IsRUFBRSxDQUFDRyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQ3dCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOztJQUVqRDtJQUNBO0lBQ0EzQixFQUFFLENBQUNHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDd0IsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7O0lBRWpEO0lBQ0EzQixFQUFFLENBQUNHLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDd0IsUUFBUSxDQUFDLFFBQVEsRUFBRTtNQUFFQyxNQUFNLEVBQUU7SUFBUyxDQUFDLENBQUM7O0lBRXZFO0lBQ0E1QixFQUFFLENBQUNHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDd0IsUUFBUSxDQUFDLFFBQVEsRUFBRTtNQUFFRSxRQUFRLEVBQUU7SUFBSyxDQUFDLENBQUM7RUFDbkUsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXJhYmFuay1hdXRvbWF0aW9uLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy9hY3Rpb25zLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY3lwcmVzc1wiIC8+XG5cbmNvbnRleHQoJ0FjdGlvbnMnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGN5LnZpc2l0KCdodHRwczovL2V4YW1wbGUuY3lwcmVzcy5pby9jb21tYW5kcy9hY3Rpb25zJylcbiAgfSlcblxuICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vaW50ZXJhY3Rpbmctd2l0aC1lbGVtZW50c1xuXG4gIGl0KCcudHlwZSgpIC0gdHlwZSBpbnRvIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3R5cGVcbiAgICBjeS5nZXQoJy5hY3Rpb24tZW1haWwnKS50eXBlKCdmYWtlQGVtYWlsLmNvbScpXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWVtYWlsJykuc2hvdWxkKCdoYXZlLnZhbHVlJywgJ2Zha2VAZW1haWwuY29tJylcblxuICAgIC8vIC50eXBlKCkgd2l0aCBzcGVjaWFsIGNoYXJhY3RlciBzZXF1ZW5jZXNcbiAgICBjeS5nZXQoJy5hY3Rpb24tZW1haWwnKS50eXBlKCd7bGVmdGFycm93fXtyaWdodGFycm93fXt1cGFycm93fXtkb3duYXJyb3d9JylcbiAgICBjeS5nZXQoJy5hY3Rpb24tZW1haWwnKS50eXBlKCd7ZGVsfXtzZWxlY3RhbGx9e2JhY2tzcGFjZX0nKVxuXG4gICAgLy8gLnR5cGUoKSB3aXRoIGtleSBtb2RpZmllcnNcbiAgICBjeS5nZXQoJy5hY3Rpb24tZW1haWwnKS50eXBlKCd7YWx0fXtvcHRpb259JykgLy8gdGhlc2UgYXJlIGVxdWl2YWxlbnRcbiAgICBjeS5nZXQoJy5hY3Rpb24tZW1haWwnKS50eXBlKCd7Y3RybH17Y29udHJvbH0nKSAvLyB0aGVzZSBhcmUgZXF1aXZhbGVudFxuICAgIGN5LmdldCgnLmFjdGlvbi1lbWFpbCcpLnR5cGUoJ3ttZXRhfXtjb21tYW5kfXtjbWR9JykgLy8gdGhlc2UgYXJlIGVxdWl2YWxlbnRcbiAgICBjeS5nZXQoJy5hY3Rpb24tZW1haWwnKS50eXBlKCd7c2hpZnR9JylcblxuICAgIC8vIERlbGF5IGVhY2gga2V5cHJlc3MgYnkgMC4xIHNlY1xuICAgIGN5LmdldCgnLmFjdGlvbi1lbWFpbCcpLnR5cGUoJ3Nsb3cudHlwaW5nQGVtYWlsLmNvbScsIHsgZGVsYXk6IDEwMCB9KVxuICAgIGN5LmdldCgnLmFjdGlvbi1lbWFpbCcpLnNob3VsZCgnaGF2ZS52YWx1ZScsICdzbG93LnR5cGluZ0BlbWFpbC5jb20nKVxuXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWRpc2FibGVkJylcbiAgICAgIC8vIElnbm9yZSBlcnJvciBjaGVja2luZyBwcmlvciB0byB0eXBlXG4gICAgICAvLyBsaWtlIHdoZXRoZXIgdGhlIGlucHV0IGlzIHZpc2libGUgb3IgZGlzYWJsZWRcbiAgICAgIC50eXBlKCdkaXNhYmxlZCBlcnJvciBjaGVja2luZycsIHsgZm9yY2U6IHRydWUgfSlcbiAgICBjeS5nZXQoJy5hY3Rpb24tZGlzYWJsZWQnKS5zaG91bGQoJ2hhdmUudmFsdWUnLCAnZGlzYWJsZWQgZXJyb3IgY2hlY2tpbmcnKVxuICB9KVxuXG4gIGl0KCcuZm9jdXMoKSAtIGZvY3VzIG9uIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2ZvY3VzXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWZvY3VzJykuZm9jdXMoKVxuICAgIGN5LmdldCgnLmFjdGlvbi1mb2N1cycpLnNob3VsZCgnaGF2ZS5jbGFzcycsICdmb2N1cycpXG4gICAgICAucHJldigpLnNob3VsZCgnaGF2ZS5hdHRyJywgJ3N0eWxlJywgJ2NvbG9yOiBvcmFuZ2U7JylcbiAgfSlcblxuICBpdCgnLmJsdXIoKSAtIGJsdXIgb2ZmIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2JsdXJcbiAgICBjeS5nZXQoJy5hY3Rpb24tYmx1cicpLnR5cGUoJ0Fib3V0IHRvIGJsdXInKVxuICAgIGN5LmdldCgnLmFjdGlvbi1ibHVyJykuYmx1cigpXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWJsdXInKS5zaG91bGQoJ2hhdmUuY2xhc3MnLCAnZXJyb3InKVxuICAgICAgLnByZXYoKS5zaG91bGQoJ2hhdmUuYXR0cicsICdzdHlsZScsICdjb2xvcjogcmVkOycpXG4gIH0pXG5cbiAgaXQoJy5jbGVhcigpIC0gY2xlYXJzIGFuIGlucHV0IG9yIHRleHRhcmVhIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2NsZWFyXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNsZWFyJykudHlwZSgnQ2xlYXIgdGhpcyB0ZXh0JylcbiAgICBjeS5nZXQoJy5hY3Rpb24tY2xlYXInKS5zaG91bGQoJ2hhdmUudmFsdWUnLCAnQ2xlYXIgdGhpcyB0ZXh0JylcbiAgICBjeS5nZXQoJy5hY3Rpb24tY2xlYXInKS5jbGVhcigpXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNsZWFyJykuc2hvdWxkKCdoYXZlLnZhbHVlJywgJycpXG4gIH0pXG5cbiAgaXQoJy5zdWJtaXQoKSAtIHN1Ym1pdCBhIGZvcm0nLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3N1Ym1pdFxuICAgIGN5LmdldCgnLmFjdGlvbi1mb3JtJylcbiAgICAgIC5maW5kKCdbdHlwZT1cInRleHRcIl0nKS50eXBlKCdIQUxGT0ZGJylcblxuICAgIGN5LmdldCgnLmFjdGlvbi1mb3JtJykuc3VibWl0KClcbiAgICBjeS5nZXQoJy5hY3Rpb24tZm9ybScpLm5leHQoKS5zaG91bGQoJ2NvbnRhaW4nLCAnWW91ciBmb3JtIGhhcyBiZWVuIHN1Ym1pdHRlZCEnKVxuICB9KVxuXG4gIGl0KCcuY2xpY2soKSAtIGNsaWNrIG9uIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2NsaWNrXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWJ0bicpLmNsaWNrKClcblxuICAgIC8vIFlvdSBjYW4gY2xpY2sgb24gOSBzcGVjaWZpYyBwb3NpdGlvbnMgb2YgYW4gZWxlbWVudDpcbiAgICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyB8IHRvcExlZnQgICAgICAgIHRvcCAgICAgICB0b3BSaWdodCB8XG4gICAgLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgIC8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAvLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgLy8gfCBsZWZ0ICAgICAgICAgIGNlbnRlciAgICAgICAgcmlnaHQgfFxuICAgIC8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAvLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgIC8vIHwgYm90dG9tTGVmdCAgIGJvdHRvbSAgIGJvdHRvbVJpZ2h0IHxcbiAgICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGNsaWNraW5nIGluIHRoZSBjZW50ZXIgb2YgdGhlIGVsZW1lbnQgaXMgdGhlIGRlZmF1bHRcbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJykuY2xpY2soKVxuXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKCd0b3BMZWZ0JylcbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJykuY2xpY2soJ3RvcCcpXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKCd0b3BSaWdodCcpXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKCdsZWZ0JylcbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJykuY2xpY2soJ3JpZ2h0JylcbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJykuY2xpY2soJ2JvdHRvbUxlZnQnKVxuICAgIGN5LmdldCgnI2FjdGlvbi1jYW52YXMnKS5jbGljaygnYm90dG9tJylcbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJykuY2xpY2soJ2JvdHRvbVJpZ2h0JylcblxuICAgIC8vIC5jbGljaygpIGFjY2VwdHMgYW4geCBhbmQgeSBjb29yZGluYXRlXG4gICAgLy8gdGhhdCBjb250cm9scyB3aGVyZSB0aGUgY2xpY2sgb2NjdXJzIDopXG5cbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJylcbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJykuY2xpY2soODAsIDc1KSAvLyBjbGljayA4MHB4IG9uIHggY29vcmQgYW5kIDc1cHggb24geSBjb29yZFxuICAgIGN5LmdldCgnI2FjdGlvbi1jYW52YXMnKS5jbGljaygxNzAsIDc1KVxuICAgIGN5LmdldCgnI2FjdGlvbi1jYW52YXMnKS5jbGljayg4MCwgMTY1KVxuICAgIGN5LmdldCgnI2FjdGlvbi1jYW52YXMnKS5jbGljaygxMDAsIDE4NSlcbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJykuY2xpY2soMTI1LCAxOTApXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKDE1MCwgMTg1KVxuICAgIGN5LmdldCgnI2FjdGlvbi1jYW52YXMnKS5jbGljaygxNzAsIDE2NSlcblxuICAgIC8vIGNsaWNrIG11bHRpcGxlIGVsZW1lbnRzIGJ5IHBhc3NpbmcgbXVsdGlwbGU6IHRydWVcbiAgICBjeS5nZXQoJy5hY3Rpb24tbGFiZWxzPi5sYWJlbCcpLmNsaWNrKHsgbXVsdGlwbGU6IHRydWUgfSlcblxuICAgIC8vIElnbm9yZSBlcnJvciBjaGVja2luZyBwcmlvciB0byBjbGlja2luZ1xuICAgIGN5LmdldCgnLmFjdGlvbi1vcGFjaXR5Pi5idG4nKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pXG4gIH0pXG5cbiAgaXQoJy5kYmxjbGljaygpIC0gZG91YmxlIGNsaWNrIG9uIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2RibGNsaWNrXG5cbiAgICAvLyBPdXIgYXBwIGhhcyBhIGxpc3RlbmVyIG9uICdkYmxjbGljaycgZXZlbnQgaW4gb3VyICdzY3JpcHRzLmpzJ1xuICAgIC8vIHRoYXQgaGlkZXMgdGhlIGRpdiBhbmQgc2hvd3MgYW4gaW5wdXQgb24gZG91YmxlIGNsaWNrXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWRpdicpLmRibGNsaWNrKClcbiAgICBjeS5nZXQoJy5hY3Rpb24tZGl2Jykuc2hvdWxkKCdub3QuYmUudmlzaWJsZScpXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWlucHV0LWhpZGRlbicpLnNob3VsZCgnYmUudmlzaWJsZScpXG4gIH0pXG5cbiAgaXQoJy5yaWdodGNsaWNrKCkgLSByaWdodCBjbGljayBvbiBhIERPTSBlbGVtZW50JywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9yaWdodGNsaWNrXG5cbiAgICAvLyBPdXIgYXBwIGhhcyBhIGxpc3RlbmVyIG9uICdjb250ZXh0bWVudScgZXZlbnQgaW4gb3VyICdzY3JpcHRzLmpzJ1xuICAgIC8vIHRoYXQgaGlkZXMgdGhlIGRpdiBhbmQgc2hvd3MgYW4gaW5wdXQgb24gcmlnaHQgY2xpY2tcbiAgICBjeS5nZXQoJy5yaWdodGNsaWNrLWFjdGlvbi1kaXYnKS5yaWdodGNsaWNrKClcbiAgICBjeS5nZXQoJy5yaWdodGNsaWNrLWFjdGlvbi1kaXYnKS5zaG91bGQoJ25vdC5iZS52aXNpYmxlJylcbiAgICBjeS5nZXQoJy5yaWdodGNsaWNrLWFjdGlvbi1pbnB1dC1oaWRkZW4nKS5zaG91bGQoJ2JlLnZpc2libGUnKVxuICB9KVxuXG4gIGl0KCcuY2hlY2soKSAtIGNoZWNrIGEgY2hlY2tib3ggb3IgcmFkaW8gZWxlbWVudCcsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vY2hlY2tcblxuICAgIC8vIEJ5IGRlZmF1bHQsIC5jaGVjaygpIHdpbGwgY2hlY2sgYWxsXG4gICAgLy8gbWF0Y2hpbmcgY2hlY2tib3ggb3IgcmFkaW8gZWxlbWVudHMgaW4gc3VjY2Vzc2lvbiwgb25lIGFmdGVyIGFub3RoZXJcbiAgICBjeS5nZXQoJy5hY3Rpb24tY2hlY2tib3hlcyBbdHlwZT1cImNoZWNrYm94XCJdJykubm90KCdbZGlzYWJsZWRdJykuY2hlY2soKVxuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVja2JveGVzIFt0eXBlPVwiY2hlY2tib3hcIl0nKS5ub3QoJ1tkaXNhYmxlZF0nKS5zaG91bGQoJ2JlLmNoZWNrZWQnKVxuXG4gICAgY3kuZ2V0KCcuYWN0aW9uLXJhZGlvcyBbdHlwZT1cInJhZGlvXCJdJykubm90KCdbZGlzYWJsZWRdJykuY2hlY2soKVxuICAgIGN5LmdldCgnLmFjdGlvbi1yYWRpb3MgW3R5cGU9XCJyYWRpb1wiXScpLm5vdCgnW2Rpc2FibGVkXScpLnNob3VsZCgnYmUuY2hlY2tlZCcpXG5cbiAgICAvLyAuY2hlY2soKSBhY2NlcHRzIGEgdmFsdWUgYXJndW1lbnRcbiAgICBjeS5nZXQoJy5hY3Rpb24tcmFkaW9zIFt0eXBlPVwicmFkaW9cIl0nKS5jaGVjaygncmFkaW8xJylcbiAgICBjeS5nZXQoJy5hY3Rpb24tcmFkaW9zIFt0eXBlPVwicmFkaW9cIl0nKS5zaG91bGQoJ2JlLmNoZWNrZWQnKVxuXG4gICAgLy8gLmNoZWNrKCkgYWNjZXB0cyBhbiBhcnJheSBvZiB2YWx1ZXNcbiAgICBjeS5nZXQoJy5hY3Rpb24tbXVsdGlwbGUtY2hlY2tib3hlcyBbdHlwZT1cImNoZWNrYm94XCJdJykuY2hlY2soWydjaGVja2JveDEnLCAnY2hlY2tib3gyJ10pXG4gICAgY3kuZ2V0KCcuYWN0aW9uLW11bHRpcGxlLWNoZWNrYm94ZXMgW3R5cGU9XCJjaGVja2JveFwiXScpLnNob3VsZCgnYmUuY2hlY2tlZCcpXG5cbiAgICAvLyBJZ25vcmUgZXJyb3IgY2hlY2tpbmcgcHJpb3IgdG8gY2hlY2tpbmdcbiAgICBjeS5nZXQoJy5hY3Rpb24tY2hlY2tib3hlcyBbZGlzYWJsZWRdJykuY2hlY2soeyBmb3JjZTogdHJ1ZSB9KVxuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVja2JveGVzIFtkaXNhYmxlZF0nKS5zaG91bGQoJ2JlLmNoZWNrZWQnKVxuXG4gICAgY3kuZ2V0KCcuYWN0aW9uLXJhZGlvcyBbdHlwZT1cInJhZGlvXCJdJykuY2hlY2soJ3JhZGlvMycsIHsgZm9yY2U6IHRydWUgfSlcbiAgICBjeS5nZXQoJy5hY3Rpb24tcmFkaW9zIFt0eXBlPVwicmFkaW9cIl0nKS5zaG91bGQoJ2JlLmNoZWNrZWQnKVxuICB9KVxuXG4gIGl0KCcudW5jaGVjaygpIC0gdW5jaGVjayBhIGNoZWNrYm94IGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3VuY2hlY2tcblxuICAgIC8vIEJ5IGRlZmF1bHQsIC51bmNoZWNrKCkgd2lsbCB1bmNoZWNrIGFsbCBtYXRjaGluZ1xuICAgIC8vIGNoZWNrYm94IGVsZW1lbnRzIGluIHN1Y2Nlc3Npb24sIG9uZSBhZnRlciBhbm90aGVyXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNoZWNrIFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgLm5vdCgnW2Rpc2FibGVkXScpXG4gICAgICAudW5jaGVjaygpXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNoZWNrIFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgLm5vdCgnW2Rpc2FibGVkXScpXG4gICAgICAuc2hvdWxkKCdub3QuYmUuY2hlY2tlZCcpXG5cbiAgICAvLyAudW5jaGVjaygpIGFjY2VwdHMgYSB2YWx1ZSBhcmd1bWVudFxuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVjayBbdHlwZT1cImNoZWNrYm94XCJdJylcbiAgICAgIC5jaGVjaygnY2hlY2tib3gxJylcbiAgICBjeS5nZXQoJy5hY3Rpb24tY2hlY2sgW3R5cGU9XCJjaGVja2JveFwiXScpXG4gICAgICAudW5jaGVjaygnY2hlY2tib3gxJylcbiAgICBjeS5nZXQoJy5hY3Rpb24tY2hlY2sgW3R5cGU9XCJjaGVja2JveFwiXVt2YWx1ZT1cImNoZWNrYm94MVwiXScpXG4gICAgICAuc2hvdWxkKCdub3QuYmUuY2hlY2tlZCcpXG5cbiAgICAvLyAudW5jaGVjaygpIGFjY2VwdHMgYW4gYXJyYXkgb2YgdmFsdWVzXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNoZWNrIFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgLmNoZWNrKFsnY2hlY2tib3gxJywgJ2NoZWNrYm94MyddKVxuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVjayBbdHlwZT1cImNoZWNrYm94XCJdJylcbiAgICAgIC51bmNoZWNrKFsnY2hlY2tib3gxJywgJ2NoZWNrYm94MyddKVxuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVjayBbdHlwZT1cImNoZWNrYm94XCJdW3ZhbHVlPVwiY2hlY2tib3gxXCJdJylcbiAgICAgIC5zaG91bGQoJ25vdC5iZS5jaGVja2VkJylcbiAgICBjeS5nZXQoJy5hY3Rpb24tY2hlY2sgW3R5cGU9XCJjaGVja2JveFwiXVt2YWx1ZT1cImNoZWNrYm94M1wiXScpXG4gICAgICAuc2hvdWxkKCdub3QuYmUuY2hlY2tlZCcpXG5cbiAgICAvLyBJZ25vcmUgZXJyb3IgY2hlY2tpbmcgcHJpb3IgdG8gdW5jaGVja2luZ1xuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVjayBbZGlzYWJsZWRdJykudW5jaGVjayh7IGZvcmNlOiB0cnVlIH0pXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNoZWNrIFtkaXNhYmxlZF0nKS5zaG91bGQoJ25vdC5iZS5jaGVja2VkJylcbiAgfSlcblxuICBpdCgnLnNlbGVjdCgpIC0gc2VsZWN0IGFuIG9wdGlvbiBpbiBhIDxzZWxlY3Q+IGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3NlbGVjdFxuXG4gICAgLy8gYXQgZmlyc3QsIG5vIG9wdGlvbiBzaG91bGQgYmUgc2VsZWN0ZWRcbiAgICBjeS5nZXQoJy5hY3Rpb24tc2VsZWN0JylcbiAgICAgIC5zaG91bGQoJ2hhdmUudmFsdWUnLCAnLS1TZWxlY3QgYSBmcnVpdC0tJylcblxuICAgIC8vIFNlbGVjdCBvcHRpb24ocykgd2l0aCBtYXRjaGluZyB0ZXh0IGNvbnRlbnRcbiAgICBjeS5nZXQoJy5hY3Rpb24tc2VsZWN0Jykuc2VsZWN0KCdhcHBsZXMnKVxuICAgIC8vIGNvbmZpcm0gdGhlIGFwcGxlcyB3ZXJlIHNlbGVjdGVkXG4gICAgLy8gbm90ZSB0aGF0IGVhY2ggdmFsdWUgc3RhcnRzIHdpdGggXCJmci1cIiBpbiBvdXIgSFRNTFxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QnKS5zaG91bGQoJ2hhdmUudmFsdWUnLCAnZnItYXBwbGVzJylcblxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QtbXVsdGlwbGUnKVxuICAgICAgLnNlbGVjdChbJ2FwcGxlcycsICdvcmFuZ2VzJywgJ2JhbmFuYXMnXSlcbiAgICBjeS5nZXQoJy5hY3Rpb24tc2VsZWN0LW11bHRpcGxlJylcbiAgICAgIC8vIHdoZW4gZ2V0dGluZyBtdWx0aXBsZSB2YWx1ZXMsIGludm9rZSBcInZhbFwiIG1ldGhvZCBmaXJzdFxuICAgICAgLmludm9rZSgndmFsJylcbiAgICAgIC5zaG91bGQoJ2RlZXAuZXF1YWwnLCBbJ2ZyLWFwcGxlcycsICdmci1vcmFuZ2VzJywgJ2ZyLWJhbmFuYXMnXSlcblxuICAgIC8vIFNlbGVjdCBvcHRpb24ocykgd2l0aCBtYXRjaGluZyB2YWx1ZVxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QnKS5zZWxlY3QoJ2ZyLWJhbmFuYXMnKVxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QnKVxuICAgICAgLy8gY2FuIGF0dGFjaCBhbiBhc3NlcnRpb24gcmlnaHQgYXdheSB0byB0aGUgZWxlbWVudFxuICAgICAgLnNob3VsZCgnaGF2ZS52YWx1ZScsICdmci1iYW5hbmFzJylcblxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QtbXVsdGlwbGUnKVxuICAgICAgLnNlbGVjdChbJ2ZyLWFwcGxlcycsICdmci1vcmFuZ2VzJywgJ2ZyLWJhbmFuYXMnXSlcbiAgICBjeS5nZXQoJy5hY3Rpb24tc2VsZWN0LW11bHRpcGxlJylcbiAgICAgIC5pbnZva2UoJ3ZhbCcpXG4gICAgICAuc2hvdWxkKCdkZWVwLmVxdWFsJywgWydmci1hcHBsZXMnLCAnZnItb3JhbmdlcycsICdmci1iYW5hbmFzJ10pXG5cbiAgICAvLyBhc3NlcnQgdGhlIHNlbGVjdGVkIHZhbHVlcyBpbmNsdWRlIG9yYW5nZXNcbiAgICBjeS5nZXQoJy5hY3Rpb24tc2VsZWN0LW11bHRpcGxlJylcbiAgICAgIC5pbnZva2UoJ3ZhbCcpLnNob3VsZCgnaW5jbHVkZScsICdmci1vcmFuZ2VzJylcbiAgfSlcblxuICBpdCgnLnNjcm9sbEludG9WaWV3KCkgLSBzY3JvbGwgYW4gZWxlbWVudCBpbnRvIHZpZXcnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3Njcm9sbGludG92aWV3XG5cbiAgICAvLyBub3JtYWxseSBhbGwgb2YgdGhlc2UgYnV0dG9ucyBhcmUgaGlkZGVuLFxuICAgIC8vIGJlY2F1c2UgdGhleSdyZSBub3Qgd2l0aGluXG4gICAgLy8gdGhlIHZpZXdhYmxlIGFyZWEgb2YgdGhlaXIgcGFyZW50XG4gICAgLy8gKHdlIG5lZWQgdG8gc2Nyb2xsIHRvIHNlZSB0aGVtKVxuICAgIGN5LmdldCgnI3Njcm9sbC1ob3Jpem9udGFsIGJ1dHRvbicpXG4gICAgICAuc2hvdWxkKCdub3QuYmUudmlzaWJsZScpXG5cbiAgICAvLyBzY3JvbGwgdGhlIGJ1dHRvbiBpbnRvIHZpZXcsIGFzIGlmIHRoZSB1c2VyIGhhZCBzY3JvbGxlZFxuICAgIGN5LmdldCgnI3Njcm9sbC1ob3Jpem9udGFsIGJ1dHRvbicpLnNjcm9sbEludG9WaWV3KClcbiAgICBjeS5nZXQoJyNzY3JvbGwtaG9yaXpvbnRhbCBidXR0b24nKVxuICAgICAgLnNob3VsZCgnYmUudmlzaWJsZScpXG5cbiAgICBjeS5nZXQoJyNzY3JvbGwtdmVydGljYWwgYnV0dG9uJylcbiAgICAgIC5zaG91bGQoJ25vdC5iZS52aXNpYmxlJylcblxuICAgIC8vIEN5cHJlc3MgaGFuZGxlcyB0aGUgc2Nyb2xsIGRpcmVjdGlvbiBuZWVkZWRcbiAgICBjeS5nZXQoJyNzY3JvbGwtdmVydGljYWwgYnV0dG9uJykuc2Nyb2xsSW50b1ZpZXcoKVxuICAgIGN5LmdldCgnI3Njcm9sbC12ZXJ0aWNhbCBidXR0b24nKVxuICAgICAgLnNob3VsZCgnYmUudmlzaWJsZScpXG5cbiAgICBjeS5nZXQoJyNzY3JvbGwtYm90aCBidXR0b24nKVxuICAgICAgLnNob3VsZCgnbm90LmJlLnZpc2libGUnKVxuXG4gICAgLy8gQ3lwcmVzcyBrbm93cyB0byBzY3JvbGwgdG8gdGhlIHJpZ2h0IGFuZCBkb3duXG4gICAgY3kuZ2V0KCcjc2Nyb2xsLWJvdGggYnV0dG9uJykuc2Nyb2xsSW50b1ZpZXcoKVxuICAgIGN5LmdldCgnI3Njcm9sbC1ib3RoIGJ1dHRvbicpXG4gICAgICAuc2hvdWxkKCdiZS52aXNpYmxlJylcbiAgfSlcblxuICBpdCgnLnRyaWdnZXIoKSAtIHRyaWdnZXIgYW4gZXZlbnQgb24gYSBET00gZWxlbWVudCcsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vdHJpZ2dlclxuXG4gICAgLy8gVG8gaW50ZXJhY3Qgd2l0aCBhIHJhbmdlIGlucHV0IChzbGlkZXIpXG4gICAgLy8gd2UgbmVlZCB0byBzZXQgaXRzIHZhbHVlICYgdHJpZ2dlciB0aGVcbiAgICAvLyBldmVudCB0byBzaWduYWwgaXQgY2hhbmdlZFxuXG4gICAgLy8gSGVyZSwgd2UgaW52b2tlIGpRdWVyeSdzIHZhbCgpIG1ldGhvZCB0byBzZXRcbiAgICAvLyB0aGUgdmFsdWUgYW5kIHRyaWdnZXIgdGhlICdjaGFuZ2UnIGV2ZW50XG4gICAgY3kuZ2V0KCcudHJpZ2dlci1pbnB1dC1yYW5nZScpXG4gICAgICAuaW52b2tlKCd2YWwnLCAyNSlcbiAgICBjeS5nZXQoJy50cmlnZ2VyLWlucHV0LXJhbmdlJylcbiAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKVxuICAgIGN5LmdldCgnLnRyaWdnZXItaW5wdXQtcmFuZ2UnKVxuICAgICAgLmdldCgnaW5wdXRbdHlwZT1yYW5nZV0nKS5zaWJsaW5ncygncCcpXG4gICAgICAuc2hvdWxkKCdoYXZlLnRleHQnLCAnMjUnKVxuICB9KVxuXG4gIGl0KCdjeS5zY3JvbGxUbygpIC0gc2Nyb2xsIHRoZSB3aW5kb3cgb3IgZWxlbWVudCB0byBhIHBvc2l0aW9uJywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9zY3JvbGx0b1xuXG4gICAgLy8gWW91IGNhbiBzY3JvbGwgdG8gOSBzcGVjaWZpYyBwb3NpdGlvbnMgb2YgYW4gZWxlbWVudDpcbiAgICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyB8IHRvcExlZnQgICAgICAgIHRvcCAgICAgICB0b3BSaWdodCB8XG4gICAgLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgIC8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAvLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgLy8gfCBsZWZ0ICAgICAgICAgIGNlbnRlciAgICAgICAgcmlnaHQgfFxuICAgIC8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAvLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgIC8vIHwgYm90dG9tTGVmdCAgIGJvdHRvbSAgIGJvdHRvbVJpZ2h0IHxcbiAgICAvLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGlmIHlvdSBjaGFpbiAuc2Nyb2xsVG8oKSBvZmYgb2YgY3ksIHdlIHdpbGxcbiAgICAvLyBzY3JvbGwgdGhlIGVudGlyZSB3aW5kb3dcbiAgICBjeS5zY3JvbGxUbygnYm90dG9tJylcblxuICAgIGN5LmdldCgnI3Njcm9sbGFibGUtaG9yaXpvbnRhbCcpLnNjcm9sbFRvKCdyaWdodCcpXG5cbiAgICAvLyBvciB5b3UgY2FuIHNjcm9sbCB0byBhIHNwZWNpZmljIGNvb3JkaW5hdGU6XG4gICAgLy8gKHggYXhpcywgeSBheGlzKSBpbiBwaXhlbHNcbiAgICBjeS5nZXQoJyNzY3JvbGxhYmxlLXZlcnRpY2FsJykuc2Nyb2xsVG8oMjUwLCAyNTApXG5cbiAgICAvLyBvciB5b3UgY2FuIHNjcm9sbCB0byBhIHNwZWNpZmljIHBlcmNlbnRhZ2VcbiAgICAvLyBvZiB0aGUgKHdpZHRoLCBoZWlnaHQpIG9mIHRoZSBlbGVtZW50XG4gICAgY3kuZ2V0KCcjc2Nyb2xsYWJsZS1ib3RoJykuc2Nyb2xsVG8oJzc1JScsICcyNSUnKVxuXG4gICAgLy8gY29udHJvbCB0aGUgZWFzaW5nIG9mIHRoZSBzY3JvbGwgKGRlZmF1bHQgaXMgJ3N3aW5nJylcbiAgICBjeS5nZXQoJyNzY3JvbGxhYmxlLXZlcnRpY2FsJykuc2Nyb2xsVG8oJ2NlbnRlcicsIHsgZWFzaW5nOiAnbGluZWFyJyB9KVxuXG4gICAgLy8gY29udHJvbCB0aGUgZHVyYXRpb24gb2YgdGhlIHNjcm9sbCAoaW4gbXMpXG4gICAgY3kuZ2V0KCcjc2Nyb2xsYWJsZS1ib3RoJykuc2Nyb2xsVG8oJ2NlbnRlcicsIHsgZHVyYXRpb246IDIwMDAgfSlcbiAgfSlcbn0pXG4iXSwibmFtZXMiOlsiY29udGV4dCIsImJlZm9yZUVhY2giLCJjeSIsInZpc2l0IiwiaXQiLCJnZXQiLCJ0eXBlIiwic2hvdWxkIiwiZGVsYXkiLCJmb3JjZSIsImZvY3VzIiwicHJldiIsImJsdXIiLCJjbGVhciIsImZpbmQiLCJzdWJtaXQiLCJuZXh0IiwiY2xpY2siLCJtdWx0aXBsZSIsImRibGNsaWNrIiwicmlnaHRjbGljayIsIm5vdCIsImNoZWNrIiwidW5jaGVjayIsInNlbGVjdCIsImludm9rZSIsInNjcm9sbEludG9WaWV3IiwidHJpZ2dlciIsInNpYmxpbmdzIiwic2Nyb2xsVG8iLCJlYXNpbmciLCJkdXJhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=