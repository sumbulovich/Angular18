describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  })

  it('Authentication form is present', () => {
    cy.contains('Authentication form');
  })

  it('Login', () => {
    cy.login('cypress@test.com', 'test');
  })

  it('Auto login', () => {
    // stops the browser from using a cached result: req => delete req.headers['if-none-match']
    cy.intercept('GET', '**/profile', req => delete req.headers['if-none-match']).as('profile');
    cy.login('cypress@test.com', 'test');
    cy.reload();
    cy.wait('@profile').its('response.statusCode').should('eq', 200)
  })

  it('Logout', () => {
    cy.login('cypress@test.com', 'test');
    cy.get('app-account').click();
    cy.contains('Logout').click();
    cy.getCookie('token').should('not.exist')
  })
})
