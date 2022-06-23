import { customer } from '../fixtures/validCustomers'

describe('Performing tests at account page', () => {
  beforeEach(() => {
    cy.enterCustomerAccount(customer[0].name)
  })

  it('Check main elements visibility', () => {
    cy.findByRole('button', { name: /Logout/i }).should('be.visible')
    cy.findByText(customer[0].name).should('be.visible')
    cy.findByRole('button', { name: /Transactions/i }).should('be.visible')
    cy.findByRole('button', { name: /Deposit/i }).should('be.visible')
    cy.findByRole('button', { name: /Withdrawl/i }).should('be.visible')
  })

  it('Check change account functionality', () => {
    cy.get('#accountSelect')
      .children()
      .then(($options) => {
        $options.each((index, option) => {
          cy.get('#accountSelect').select(option.innerText)
          cy.contains('Account Number : ' + option.innerText).should(
            'be.visible'
          )
        })
      })
  })

  it('Check deposit functionality', () => {
    cy.findByRole('button', { name: /Deposit/i }).click()
    cy.findByText('Amount to be Deposited :').should('be.visible')

    // Get actual amount from local storage
    cy.getLocalStorage('CurrentAccount').then((data) => {
      const account = JSON.parse(data)
      cy.findByPlaceholderText('amount').should('be.visible').type('100{enter}')
      cy.findByText('Deposit Successful').should('be.visible')
      cy.findByText(account.amount + 100).should('be.visible')
    })
  })

  it.only('Check withdrawal functionality', () => {
    cy.findByRole('button', { name: /Withdrawl/i }).click()
    cy.findByText('Amount to be Withdrawn :').should('be.visible')

    // Get actual amount from local storage
    cy.getLocalStorage('CurrentAccount').then((data) => {
      const account = JSON.parse(data)
      cy.findByPlaceholderText('amount').should('be.visible').type('100{enter}')
      cy.findByText('Transaction successful').should('be.visible')
      cy.findByText(account.amount - 100).should('be.visible')
    })
  })
})
