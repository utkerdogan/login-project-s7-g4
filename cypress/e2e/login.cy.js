describe('Login Form', () => {


  it('success sayfasini aciyor', () => {
    cy.visit("http://localhost:5173/")
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=password-input]').type('password');
    cy.get('[data-cy=terms-checkbox]').check();
    cy.get('[data-cy=submit-button]').click();
    cy.url().should('include', '/success');
  });

  it('email yanlis girilmis', () => {
    cy.visit("http://localhost:5173/")
    cy.get('[data-cy=email-input]').type('invalid-email');
    cy.get('[data-cy=password-input]').type('password');
    cy.get('[data-cy=email-input]').should('have.class', 'is-invalid');
    cy.get('[data-cy="error-message"]').should('contain', 'Please enter a valid email address');
    cy.get('[data-cy=submit-button]').should('be.disabled'); 
  });

  it('email ve password yanlis girilmis	', () => {
    cy.visit("http://localhost:5173/")
    cy.get('[data-cy=email-input]').type('invalid-email');
    cy.get('[data-cy=password-input]').type('abc');
    cy.get('[data-cy=terms-checkbox]').check();
    cy.get('[data-cy="error-message"]').should('have.length', 2);
    cy.get('[data-cy="error-message"]').eq(0).should('contain', 'Please enter a valid email address');
    cy.get('[data-cy="error-message"]').eq(1).should('contain', 'Password must be at least 4 characters long');
    cy.get('[data-cy=submit-button]').should('be.disabled');
  });

  it('email ve password dogru ama checkbox kabul edilmemis', () => {
    cy.visit("http://localhost:5173/")
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=password-input]').type('password');
    cy.get('[data-cy="error-message"]').should('have.length', 1);
    cy.get('[data-cy="error-message"]').should('contain', 'You must accept the terms and conditions');
    cy.get('[data-cy=submit-button]').should('be.disabled');
  });

});
