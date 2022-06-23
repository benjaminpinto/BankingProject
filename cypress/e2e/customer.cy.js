describe('Performing tests at Customer page', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl') + '/#/customer')
  })
  it('Check main elements visibility', () => {
    cy.findByRole('form').should('be.visible')
    cy.findByText('Your Name :').should('be.visible')
    cy.get('#userSelect').should('be.visible')
  })

  it('Check avaliability of login button for valid users', () => {
    cy.get('#userSelect')
      .children()
      .then(($options) => {
        $options.each((index, option) => {
          cy.log(option.innerText)
          cy.get('#userSelect').select(option.innerText)
          if (option.innerText == '---Your Name---') {
            cy.findByRole('button', { name: /Login/i }).should('not.exist')
          } else {
            cy.findByRole('button', { name: /Login/i }).should('be.visible')
          }
        })
      })
  })

  it('Check login/logout functionalities for valid users', () => {
    cy.get('#userSelect')
      .children()
      .then(($options) => {
        $options.each((index, option) => {
          cy.log(option.innerText)
          cy.get('#userSelect').select(option.innerText)
          if (option.innerText !== '---Your Name---') {
            cy.clickLoginButton()
            cy.contains(option.innerText).should('be.visible')
            cy.clickLogoutButton()
          }
        })
      })
  })
})
