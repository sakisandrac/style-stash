describe('User should be able to load homepage', () => {
  beforeEach( () => {
    cy.visit('http://localhost:3000/')
  })

  it('Should display demo page with two sample closets to choose from', () => {
    cy.get('.welcome-text').should('have.text', 'Welcome to Style Stash!')
    .get('h2').should('have.text', 'Choose a closet to demo:')
    .get('.users-container').children().should('have.length', 2)
    .get('.login-link-btn').should('have.text', 'Or Click Here to Login to Style Stash')
  })

  it('Should be able to select a sample closet or go to login page', () => {
   cy.intercept(
      "GET",
      "https://style-stash-db-0d28a93cf3ce.herokuapp.com/api/v1/data/closet/2/",
      {
        statusCode: 200,
        fixture: 'closet2'
      }
    ).as('closet-data')
    .intercept(
      "GET",
      "https://style-stash-db-0d28a93cf3ce.herokuapp.com/api/v1/data/outfits/2/",
      {
        statusCode: 200,
        fixture: 'outfit2'
      }
    ).as('outfit-data')
    .get(':nth-child(1) > .user-name').click()
    .wait(['@outfit-data', '@closet-data']).then((intercept) => {
      cy.get('.featured-img-container > .featured-img-text').should('have.text', 'Today\'s Featured Outfit ♡')
      .get('.featured-img').should('have.attr', 'src', 'https://i.imgur.com/phQ7cly.jpeg')
      .get('.featured-pieces-container > .featured-img-text').should('have.text', 'Re-discover These Pieces ♡')
      .get('.featured-pieces-container').children().should('have.length', 5)
    })
    
  })
})
  
