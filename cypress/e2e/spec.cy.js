
const site = 'http://localhost:3000';
const Width = 1280 
const height = 720
describe('Checks if pages are available', () => {
  it('displays the expected title', () => {
    cy.viewport(Width, height);
    cy.visit(site)
    cy.contains('Changing the way organizations connect with people')
    cy.title('contain', 'yop')
    
    // Asserts that the page title contains 'Inlight Zambia'
  
  })

  it('checks sign up page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/register?type=seeker')
    cy.contains('Sign up to start your journey')
    })

  it('checks services page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/services')
    cy.contains('Ready to explore community services?')
    })

  it('checks community page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/community')
    cy.contains('Success Stories')
    })
    
  it('checks about page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/about')
    cy.contains('Why InLight Zambia?')
    })

  it('checks jobs page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/opportunity?type=job')
    cy.contains('Sign in to see more opportunities')
    })
  
  it('checks skills page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/opportunity?type=skill')
    cy.contains('Sign in to see more opportunities')
    })
  it('checks funding page', () => {

  cy.viewport(Width, height);
  cy.visit('http://localhost:3000/opportunity?type=finance')
  cy.contains('Sign in to see more opportunities')

})
})

describe('visit Inlight and click find an opportunity', () => {
  it('clicks a link', () => {
    cy.viewport(Width, height);
    cy.visit(site)
    cy.contains('Find an opportunity').click()
    cy.contains('Sign up to start your journey')

    // Asserts that the page title contains 'Inlight Zambia'
  
  })
})

describe('type into sign up page', () => {
  it('types in an email', () => {
    cy.viewport(Width, height);
    cy.visit(site)
    cy.contains('Find an opportunity').click()
    cy.get('input').type('test@gmail.com')
    cy.get('.input').should('have.value', 'test@email.com')


    // Asserts that the page title contains 'Inlight Zambia'
  
  })
})



