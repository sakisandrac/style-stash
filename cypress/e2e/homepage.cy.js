describe('User should be able to load homepage', () => {
  it('Should display demo page with two sample closets to choose from', () => {
    cy.visit('http://localhost:3000/')
    .get('.welcome-text').should('have.text', 'Welcome to Style Stash!')
    .get('h2').should('have.text', 'Choose a closet to demo:')
    .get('.users-container').children().should('have.length', 2)
  })
})