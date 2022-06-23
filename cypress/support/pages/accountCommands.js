Cypress.Commands.add('clickLogoutButton', () => {
  cy.findByRole('button', { name: /Logout/i }).click()
})

Cypress.Commands.add('enterCustomerAccount', (name) => {
  cy.visit(Cypress.config('baseUrl') + '/#/customer')
  cy.get('#userSelect').select(name)
  cy.clickLoginButton()
})

Cypress.Commands.add('getAccountNumber', () => {
  cy.get('.borderM > :nth-child(3) > :nth-child(1)')
})

Cypress.Commands.add('getBalance', () => {
  cy.get('.borderM > :nth-child(3) > :nth-child(2)')
})

Cypress.Commands.add('getCurrency', () => {
  cy.get('.borderM > :nth-child(3) > :nth-child(3)')
})
