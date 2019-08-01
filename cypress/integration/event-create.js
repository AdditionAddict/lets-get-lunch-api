describe('Signup', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:8080/api/test');
  });

  beforeEach(() => {
    cy.signup()
      .get('[data-test=new-event]')
      .click()
      .url()
      .should('include', '/event');
  });

  it('should display a success message for a valid event', () => {
    cy.get('.alert-success')
      .should('not.be.visible')
      // Add title and description
      .get('input[formControlName=title]')
      .type('My title')
      .get('input[formControlName=description]')
      .type('My description')
      // Add location
      .get('input[formControlName=location]')
      .type('Swallownest', { delay: 100 })
      .wait(1000)
      .type('{downarrow}{enter}')
      // Click start time
      .get('input[formControlName=startTime]')
      .click()
      // Click today in the calendar
      .get('.owl-dt-calendar-cell-today')
      .click()
      // Click the "set" button
      .get('.owl-dt-container-buttons button')
      .last()
      .wait(500)
      .click()
      // Click end time
      .get('input[formControlName=endTime]')
      .click()
      // Click today in the calendar
      .get('.owl-dt-calendar-cell-today')
      .click()
      // Increment time by an hour
      .get('[aria-label="Add a hour"]')
      .click()
      // Click the "Set" button
      .get('.owl-dt-container-buttons button')
      .last()
      .wait(1000)
      .click()
      // Update the radio button to "Yes"
      .get('#suggest-true')
      .click()
      .get('button[type=submit]')
      .click()
      .wait(1000)
      .get('.alert-success')
      .should('be.visible');
  });

  it('should display an error message if the event cannot be created', () => {
    cy.server({
      method: 'POST',
      status: 500
    });
    cy.route('/api/events', {
      message: 'Event could not be created.'
    });

    cy.get('.alert-success')
      .should('not.be.visible')
      // Add title and description
      .get('input[formControlName=title]')
      .type('My title')
      .get('input[formControlName=description]')
      .type('My description')
      // Add location
      .get('input[formControlName=location]')
      .type('Swallownest', { delay: 100 })
      .wait(1000)
      .type('{downarrow}{enter}')
      // Click start time
      .get('input[formControlName=startTime]')
      .click()
      // Click today in the calendar
      .get('.owl-dt-calendar-cell-today')
      .click()
      // Click the "set" button
      .get('.owl-dt-container-buttons button')
      .last()
      .wait(500)
      .click()
      // Click end time
      .get('input[formControlName=endTime]')
      .click()
      // Click today in the calendar
      .get('.owl-dt-calendar-cell-today')
      .click()
      // Increment time by an hour
      .get('[aria-label="Minus a hour"]')
      .click()
      // Click the "Set" button
      .get('.owl-dt-container-buttons button')
      .last()
      .wait(1000)
      .click()
      // Update the radio button to "Yes"
      .get('#suggest-true')
      .click()
      .get('button[type=submit]')
      .click()
      .wait(1000)
      .get('.alert-danger')
      .should('be.visible')
      .should('contain', 'Event could not be created');
  });
});
