
const site = 'http://localhost:3000';
const Width = 1280 
const height = 720
describe('visit if pages are available without sign up', () => {
  it('displays the expected title', () => {
    cy.viewport(Width, height);
    cy.visit(site)
    cy.contains('Changing the way organizations connect with people')
    cy.title('contain', 'yop')
    
    // Asserts that the page title contains 'Inlight Zambia'
  
  })

  it('visit sign up page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/register?type=seeker')
    cy.contains('Sign up to start your journey')
    })

  it('visit services page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/services')
    cy.contains('Ready to explore community services?')
    })

  it('visit community page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/community')
    cy.contains('Success Stories')
    })
    
  it('visit about page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/about')
    cy.contains('Why InLight Zambia?')
    })

  it('visit jobs page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/opportunity?type=job')
    cy.contains('Sign in to see more opportunities')
    })
  
  it('visit skills page', () => {
    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/opportunity?type=skill')
    cy.contains('Sign in to see more opportunities')
    })
  it('visit funding page', () => {

    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/opportunity?type=finance')
    cy.contains('Sign in to see more opportunities')

})
  it('visit login page', () => {

    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/login')
    cy.contains('Sign in to your account')

})


  it('visit forgot password', () => {

    cy.viewport(Width, height);
    cy.visit('http://localhost:3000/login/forgot-password')
    cy.contains('Recover your password')

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



