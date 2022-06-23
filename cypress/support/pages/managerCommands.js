Cypress.Commands.add('fillFormCustomer', (firstName, lastName, postCode) => {
  cy.findByPlaceholderText(/First Name/i).type(firstName)
  cy.findByPlaceholderText(/Last Name/i).type(lastName)
  cy.findByPlaceholderText(/post code/i).type(postCode)
})
