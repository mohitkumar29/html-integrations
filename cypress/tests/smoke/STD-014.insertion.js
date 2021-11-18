/// <reference types="cypress" />
// ***********************************************************
// Test case: INT-STD-014
// Title:     User creates a new formula from scratch using MathType.
// Document:  https://docs.google.com/document/d/1fiGsUwqNIsjiaJI0aGfH_aNX5OJKEHkfWtfvlQkEEFI/edit
// Context:   UI - Formula insertion/edition
// ***********************************************************

beforeEach(() => {
  // Load fixtures
  cy.fixture('formulas.json').as('formulas');

  // Visit page
  cy.visit('/');

  // Clear the editor content in order to reduce noise
  cy.getTextEditor().clear();
});

// eslint-disable-next-line prefer-arrow-callback
it('User creates a new formula from scratch using MT', function () {
  // Which commands should you use?
  // Do you need to create a new command?
  // Insert a new MathType formula from scratch on the editor
  // MT editor modal window is closed.
  // The formula is inserted at the beginning of the HTML editor content and perfectly rendered
});
