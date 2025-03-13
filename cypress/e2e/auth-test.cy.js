describe('Auth Flow Test', () => {
  const testUser = {
    username: `testuser${Math.floor(Math.random() * 1000)}`,
    email: `test${Math.floor(Math.random() * 1000)}@example.com`,
    password: 'Password123!'
  };

  it('Should register and login successfully', () => {
    // Registro
    cy.visit('http://localhost:3000/register');
    
    cy.get('input[placeholder="Username"]').type(testUser.username);
    cy.get('input[placeholder="Email"]').type(testUser.email);
    cy.get('input[placeholder="Password"]').type(testUser.password);
    
    // Click específico en el botón de registro
    cy.get('form.auth-form').contains('button', 'Register').click();
    cy.url().should('include', '/login');

    // Login
    cy.get('input[placeholder="Email"]').type(testUser.email);
    cy.get('input[placeholder="Password"]').type(testUser.password);
    
    // Click específico en el botón de login
    cy.get('form.auth-form').contains('button', 'Login').click();
  });

  it('Should show error on empty registration', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('form.auth-form').contains('button', 'Register').click();
    cy.get('.auth-error').should('contain', 'Fill the fields');
  });
});