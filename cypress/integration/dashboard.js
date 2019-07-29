describe('Signup', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  it('should redirect to the home page for an unauthorised user', () => {
    cy.visit('/dashboard')
      .url()
      .should('include', '/');
  });
});
