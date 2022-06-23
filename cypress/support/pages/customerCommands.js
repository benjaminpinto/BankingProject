Cypress.Commands.add('clickLoginButton', () => {
  cy.findByRole('button', { name: /Login/i }).click()
})
