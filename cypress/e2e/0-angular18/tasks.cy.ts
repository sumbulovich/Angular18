describe('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
    cy.login('cypress@test.com', 'test');
  })

  it('Add task', () => {
    cy.get('button').contains('Add Task').click();
    cy.contains('New Task');
  })
})
