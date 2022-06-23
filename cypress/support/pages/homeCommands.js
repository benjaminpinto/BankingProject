Cypress.Commands.add('clickCustomerButton', () => {
  cy.findByRole('button', { name: /Customer login/i }).click()
})

Cypress.Commands.add('clickHomeButton', () => {
  cy.findByRole('button', { name: /Home/i }).click()
})

Cypress.Commands.add('clickBankManagerButton', () => {
  cy.findByRole('button', { name: /Bank manager login/i }).click()
})
