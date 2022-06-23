import { faker } from '@faker-js/faker'

describe('Performing tests at manager page', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl') + '/#/manager')
  })
  it('Check main elements visibility', () => {
    cy.findByRole('button', { name: /add customer/i }).should('be.visible')
    cy.findByRole('button', { name: /open account/i }).should('be.visible')
    cy.findByRole('button', { name: /customers/i }).should('be.visible')
  })

  it('Check add customer functionality with good data and verify its persistence', () => {
    const customer = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      postCode: faker.address.zipCode(),
    }
    cy.findByRole('button', { name: /add customer/i }).click()

    cy.fillFormCustomer(
      customer.firstName,
      customer.lastName,
      customer.postCode
    )
    cy.findAllByRole('button', { name: /add customer/i })
      .last()
      .click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Customer added successfully with customer id')
    })

    // It should be another 'it' block, but when I change page, local storage is cleared
    cy.getLocalStorage('User').then((data) => {
      const user = JSON.parse(data)
      const length = Object.keys(user).length
      expect(user[length].fName).to.equal(customer.firstName)
      expect(user[length].lName).to.equal(customer.lastName)
    })
  })

  it('Check add customer functionality with empty fields', () => {
    cy.findByRole('button', { name: /add customer/i }).click()
    cy.findByPlaceholderText(/First Name/i)
      .invoke('prop', 'validity')
      .should('deep.include', {
        valid: false,
      })
    cy.findByPlaceholderText(/Last Name/i)
      .invoke('prop', 'validity')
      .should('deep.include', {
        valid: false,
      })
    cy.findByPlaceholderText(/post code/i)
      .invoke('prop', 'validity')
      .should('deep.include', {
        valid: false,
      })
  })

  it('Check add customer with blank spaces as data', () => {
    cy.findByRole('button', { name: /add customer/i }).click()
    cy.findByPlaceholderText(/First Name/i).type(' ')
    cy.findByPlaceholderText(/Last Name/i).type(' ')
    cy.findByPlaceholderText(/post code/i).type(' ')
    cy.findAllByRole('button', { name: /add customer/i })
      .last()
      .click()
    cy.on('window:alert', (text) => {
      // This error message should be changed in the future
      expect(text).to.contains(
        'Please check the details. Customer may be duplicate.'
      )
    })
  })
})
