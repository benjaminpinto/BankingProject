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
    const depositAmount = 100
    cy.findByRole('button', { name: /Deposit/i }).click()
    cy.findByText('Amount to be Deposited :').should('be.visible')

    // Get actual amount from local storage
    cy.getLocalStorage('CurrentAccount').then((data) => {
      const account = JSON.parse(data)
      cy.findByPlaceholderText('amount')
        .should('be.visible')
        .type(`${depositAmount}{enter}`)
      cy.findByText('Deposit Successful').should('be.visible')
      cy.findByText(account.amount + depositAmount).should('be.visible')
    })
  })

  it('Check withdrawal functionality', () => {
    const withdrawalAmount = 100
    cy.findByRole('button', { name: /Withdrawl/i }).click()
    cy.findByText('Amount to be Withdrawn :').should('be.visible')

    // Get actual amount from local storage
    cy.getLocalStorage('CurrentAccount').then((data) => {
      const account = JSON.parse(data)
      cy.findByPlaceholderText('amount')
        .should('be.visible')
        .type(`${withdrawalAmount}{enter}`)
      cy.findByText('Transaction successful').should('be.visible')
      cy.findByText(account.amount - withdrawalAmount).should('be.visible')
    })
  })

  it('Check if transactions table is correctly shown', () => {
    cy.findByRole('button', { name: /Transactions/i }).click()
    cy.findByRole('table').should('be.visible')
  })

  it('Check "Reset" transactions functionality', () => {
    cy.findByRole('button', { name: /Transactions/i }).click()
    cy.findByRole('button', { name: /Reset/i }).click()
    cy.findByRole('table').get('tbody').children().should('have.length', 0)
  })

  it('Check back button at transactions page', () => {
    cy.findByRole('button', { name: /Transactions/i }).click()
    cy.findByRole('button', { name: /Back/i }).click()
    cy.findByText(customer[0].name).should('be.visible')
  })
})
