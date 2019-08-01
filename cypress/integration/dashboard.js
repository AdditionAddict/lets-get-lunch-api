describe('Dashboard', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:8080/api/test');
  });

  it('should redirect to the home page for an unauthorised user', () => {
    cy.visit('/dashboard')
      .url()
      .should('include', '/');
  });

  it("should display a users's events in the dashboard calendar", () => {
    cy.signup()
      .createEvent('Dinner', 'Swallownest')
      .get('.cal-event .cal-event-title')
      .should('have.text', 'Dinner');
  });
});
