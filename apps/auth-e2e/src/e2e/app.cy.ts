describe('Auth portal pages', () => {
  it('displays marketing hero on home page', () => {
    cy.visit('/');
    cy.get('[data-test="home-hero-title"]').should('contain.text', 'Enterprise authentication portal');
    cy.get('a[href="/login"]').contains('Sign in now');
  });

  it('validates login form inputs before submitting', () => {
    cy.visit('/login');

    cy.get('[data-test="login-form"]').within(() => {
      cy.get('input#email').type('invalid-email');
      cy.get('input#password').type('123');
      cy.contains('button', 'Sign in').click();
    });

    cy.contains('Enter a valid email address.').should('be.visible');
    cy.contains('Password must contain at least 6 characters.').should('be.visible');
    cy.get('input#password').should('have.attr', 'type', 'password');
  });

  it('validates register form requirements', () => {
    cy.visit('/register');

    cy.get('[data-test="register-form"]').within(() => {
      cy.get('input#name').type('A');
      cy.get('input#register-email').type('user@invalid');
      cy.get('input#register-password').type('short');
      cy.contains('button', 'Create account').click();
    });

    cy.contains('Full name must be at least 2 characters.').should('be.visible');
    cy.contains('Enter a valid email address.').should('be.visible');
    cy.contains('Password must contain at least 8 characters.').should('be.visible');
    cy.get('input#register-password').should('have.attr', 'type', 'password');
  });

  it('shows validation on forgot password page', () => {
    cy.visit('/forgot-password');

    cy.get('[data-test="forgot-form"]').within(() => {
      cy.get('input#forgot-email').type('oops');
      cy.contains('button', 'Send reset instructions').click();
    });

    cy.contains('Enter a valid email address.').should('be.visible');
  });

  it('requires 6 digit OTP before verifying', () => {
    cy.visit('/otp');

    cy.get('[data-test="otp-verify-form"]').within(() => {
      cy.get('input#otp-email').type('user@example.com');
      cy.get('input#otp-code').type('123');
      cy.contains('button', 'Verify & sign in').click();
    });

    cy.contains('OTP must contain 6 digits.').should('be.visible');
  });
});
