import { faker } from '@faker-js/faker'
import { customer } from '../fixtures/validCustomers'

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
    const randomCustomer = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      postCode: faker.address.zipCode(),
    }
    cy.findByRole('button', { name: /add customer/i }).click()

    cy.fillFormCustomer(
      randomCustomer.firstName,
      randomCustomer.lastName,
      randomCustomer.postCode
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
      expect(user[length].fName).to.equal(randomCustomer.firstName)
      expect(user[length].lName).to.equal(randomCustomer.lastName)
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

  it.skip('[Issue #1 opened] Check add customer with uncommon input data', () => {
    cy.findByRole('button', { name: /add customer/i }).click()
    cy.fillFormCustomer('%%¨$#@$%*(', '*', 'letters as zip code')
    cy.findAllByRole('button', { name: /add customer/i })
      .last()
      .click()
    cy.on('window:alert', (text) => {
      // Cypress ins't doing this assertion correctly
      expect(text).not.contains('Customer added successfully with customer id')
    })
  })

  it.skip('[Issue #1 opened] Check add customer with short input data (1 character only)', () => {
    cy.findByRole('button', { name: /add customer/i }).click()
    cy.fillFormCustomer('&', '$', '#')
    cy.findAllByRole('button', { name: /add customer/i })
      .last()
      .click()
    cy.on('window:alert', (text) => {
      // Cypress ins't doing this assertion correctly
      expect(text).not.contains('Customer added successfully with customer id')
    })
  })

  it('Check Customer search field', () => {
    cy.findByRole('button', { name: /Customers/i }).click()
    cy.findByPlaceholderText(/search customer/i).type(customer[0].fName)
    cy.findByText(customer[0].fName).should('be.visible')
  })

  it('Check delete customer functionality', () => {
    cy.findByRole('button', { name: /Customers/i }).click()
    cy.findByPlaceholderText(/search customer/i).type(customer[0].fName)
    cy.findByRole('button', { name: /delete/i }).click()
    cy.findByPlaceholderText(/search customer/i)
      .clear()
      .type(customer[0].fName)
    cy.findByText(customer[0].fName).should('not.exist')
  })

  it('Check open account without select a customer and/or a currency', () => {
    cy.findByRole('button', { name: /Open account/i }).click()
    cy.findByRole('button', { name: /Process/i }).click()
    cy.get('#userSelect')
      .invoke('prop', 'validity')
      .should('deep.include', { valid: false })
    cy.get('#currency')
      .invoke('prop', 'validity')
      .should('deep.include', { valid: false })
  })

  it('Check open account correctly selecting customer and currency', () => {
    const curr = 'Dollar'
    cy.findByRole('button', { name: /Open Account/i }).click()
    cy.get('#userSelect').select(customer[0].name)
    cy.get('#currency').select(curr)
    cy.findByRole('button', { name: /Process/i }).click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Account created successfully')
    })
    cy.getLocalStorage('Account').then((data) => {
      const account = JSON.parse(data)
      const last = Object.keys(account).pop()
      expect(parseInt(account[last].userId)).to.eq(customer[0].id)
      expect(account[last].currency).to.equal(curr)
    })
  })
})
