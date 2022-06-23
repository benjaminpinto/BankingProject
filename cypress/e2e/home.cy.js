describe('Performing tests at homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check main elements of homepage', () => {
    cy.get('.mainHeading').should('be.visible')
    cy.findByRole('button', { name: /Home/i }).should('be.visible')
    cy.findByRole('button', { name: /Customer login/i }).should('be.visible')
    cy.findByRole('button', { name: /Bank manager login/i }).should(
      'be.visible'
    )
  })

  it("Check button's correct behavior", () => {
    cy.clickCustomerButton().then(() => {
      cy.url().should('include', '/customer')
    })
    cy.clickHomeButton().then(() => {
      cy.url().should('include', '/login')
    })
    cy.clickBankManagerButton().then(() => {
      cy.url().should('include', '/manager')
    })
  })
})
