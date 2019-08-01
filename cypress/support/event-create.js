Cypress.Commands.add('createEvent', (name, location, opts = {}) => {
  var description = opts.description || 'Description';
  var suggestLocations = opts.suggestLocations || false;

  cy.get('[data-test=new-event]')
    .click()
    .url()
    .should('include', '/event')

    .get('.alert-success')
    .should('not.be.visible')
    .get('input[formControlName=title]')
    .type(name)
    .get('input[formControlName=description]')
    .type(description)
    .get('input[formControlName=location]')
    .type(location, { delay: 100 })
    .wait(1000)
    .type('{downarrow}{enter}')
    .get('input[formControlName=startTime]')
    .click()
    .get('.owl-dt-calendar-cell-today')
    .click()
    .get('.owl-dt-container-buttons button')
    .last()
    .wait(500)
    .click()
    .get('input[formControlName=endTime]')
    .click()
    .get('.owl-dt-calendar-cell-today')
    .click()
    .get('[aria-label="Add a hour"]')
    .click()
    .get('.owl-dt-container-buttons button')
    .last()
    .wait(1000)
    .click();

  if (suggestLocations) {
    cy.get('#suggest-true').click();
  }

  cy.get('button[type=submit]')
    .click()
    .wait(1000)
    .get('.alert-success')
    .should('be.visible')
    .get('.cancel')
    .click()
    .url()
    .should('include', '/dashboard');
});
