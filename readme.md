# XYZ Bank Code Challenge

![Cypress Tests](https://github.com/benjaminpinto/BankingProject/actions/workflows/main.yml/badge.svg)

This project is a result of a code challenge that demands the use of Cypress to automate test upon [XYZ Bank application](https://www.globalsqa.com/angularJs-protractor/BankingProject).

To write these tests, I've used a few plugins to extend Cypress capabilities:

- [cypress-testing-library](https://testing-library.com/docs/cypress-testing-library/intro/);
- [eslint](https://eslint.org/docs/user-guide/getting-started) and [eslint-plugin-cypress](https://www.npmjs.com/package/eslint-plugin-cypress);
- [faker-js](https://fakerjs.dev/);
- [cypress-localstorage-commands](https://www.npmjs.com/package/cypress-localstorage-commands)

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I've used versions `v16.15.0` and `8.5.5` of Node.js and npm, respectively. I recommend you to use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

Run `npm test` (or `npm t` for the short version) to run the test in headless mode.

Or, run `npm run open` to open Cypress in interactive mode.

> **Note:** This project doesn't handle sensible data to perform tests (tokens/passwords/etc), so we didn't used a `cypress.env.json` file.

> **Important:** This project uses Github actions to CI. If you want to clone it and run at your own repository, remember to update project's ID at [`cypress.config.js`](./cypress.config.js) file, and set your CYPRESS_RECORD_KEY at Github secrets.

## About the project structure

- Spec files are localized at [`cypress/e2e`](/cypress/e2e/) folder;
- Custom commands are organized at [`support/pages`](cypress/support/pages) folder;
- Github Actions is properly configured and the project tests results are connected with Cypress Dashboard. I've configured parallelization with 4 threads at Github Actions, but considering that I've reached my monthly free tier limit, just one thread is in fact executing all spec files.

## Relevant notes about this project

We have to keep in mind that the application doesn't have a real backend and/or a database connected. At every browser's new session, all data is loaded to local storage at client side.

Considering this, some test cenarios, mainly those that involves data insertion and deletion, was constructed performing assertions looking to the local storage.

When Cypress moves from one `it` block to another, all data from local storage is reseted. In a real scenario, we could navigate to customer's insert page, include a fake customer, then navigate to customer's list page to check if it was properly stored. Due to this specific project's limitation, we are checking all data insertion/deletion by looking to browser's local storage.

## Test plan

#### Application's homepage

Given that the user is at the homepage

| ID  | Scenario                                                                      | Automated? | Status  | Issue? | Obs |
| --- | ----------------------------------------------------------------------------- | :--------: | ------- | :----: | :-: |
| 01  | All main elements should be visible                                           |    Yes     | Passing |   -    |  -  |
| 02  | 'Customer Login' button should redirect to customer's page                    |    Yes     | Passing |   -    |  -  |
| 03  | 'Bank manager login' button should redirect to manager's page                 |    Yes     | Passing |   -    |  -  |
| 04  | When navigate to another page, 'Home' button should redirect back to homepage |    Yes     | Passing |   -    |  -  |

#### Customer page

Given that the user is at customer page

| ID  | Scenario                                                                                                           | Automated? | Status  | Issue? | Obs |
| --- | ------------------------------------------------------------------------------------------------------------------ | :--------: | ------- | :----: | :-: |
| 05  | All main elements should be visible                                                                                |    Yes     | Passing |   -    |  -  |
| 06  | When select a valid customer from the list, the login button should appear                                         |    Yes     | Passing |   -    |  -  |
| 07  | When '--Your Name--' placeholder is selected, login button shouldn't appear                                        |    Yes     | Passing |   -    |  -  |
| 08  | When a valid user clicks at login button, it should redirect to account page and customer's name should be visible |    Yes     | Passing |   -    |  -  |

#### Account page

Given that the user is at his account page

| ID  | Scenario                                                                                                 | Automated? | Status      | Issue? |                                                                                                                                                                 Obs                                                                                                                                                                 |
| --- | -------------------------------------------------------------------------------------------------------- | :--------: | ----------- | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 09  | All main elements should be visible                                                                      |    Yes     | Passing     |   -    |                                                                                                                                                                  -                                                                                                                                                                  |
| 10  | Customer should be able to switch between his accounts                                                   |    Yes     | Passing     |   -    |                                                                                                                                                                  -                                                                                                                                                                  |
| 11  | When deposit a positive integer amount, it should be added to customer balance for that selected account |    Yes     | Passing     |   -    |                                                                                                                                                                  -                                                                                                                                                                  |
| 12  | Depositing a non integer positive amount should not be acceptable as a valid entry                       |     No     | Passing     |   -    |                                                                                                                                                                  -                                                                                                                                                                  |
| 13  | Depositing a negative amount should not be acceptable as a valid entry                                   |     No     | Not Passing |   -    |                                                                           Trying to deposit '-100', no messages are shown, balance doesn't change, but an error is raised at console:`TypeError: Cannot read properties of undefined (reading 'success')`                                                                           |
| 14  | Should not be possible to insert non numeric characters in deposit amount input field                    |     No     | Not Passing |   -    | Typing CTRL+V, its possible to insert non numeric characters, that will be mapped to 'e-'. Surrounding this with valid numbers (ex: 5e-8), the bad data is being stored.<br /><br /> Once this bad data is stored, balance is changed with this value and deposits and withdrawals functionalities no longer works for that account |
| 15  | When withdrawal an amount less or equals to customer balance, the amount should be properly reduced      |    Yes     | Passing     |   -    |                                                                                                                                                                                                                                                                                                                                     |
| 16  | When withdrawal an amount higher then customer balance, an error should be shown                         |    Yes     | Passing     |   -    |                                                                                                                                                                                                                                                                                                                                     |
| 17  | Withdrawal a negative value should not be possible                                                       |     No     | Not Passing |   -    |                                                                                                                                                    Same behavior observed at #13                                                                                                                                                    |
| 18  | When click at Transactions button, it should redirect to that page                                       |    Yes     | Passing     |   -    |                                                                                                                                                                                                                                                                                                                                     |
| 19  | At transactions page, a table with user's transactions should be visible                                 |    Yes     | Passing     |   -    |                                                                                                                                                                                                                                                                                                                                     |
| 20  | At transactions page, clicking 'Reset' button should clear all transactions                              |    Yes     | Passing     |   -    |                                                                                                                                                                                                                                                                                                                                     |

#### Manager page

Given that the user is at customer page

| ID  | Scenario                                                               | Automated? | Status      |                             Issue?                             |                               Obs                                |
| --- | ---------------------------------------------------------------------- | :--------: | ----------- | :------------------------------------------------------------: | :--------------------------------------------------------------: |
| 21  | All main elements should be visible                                    |    Yes     | Passing     |                               -                                |                                -                                 |
| 22  | Add a customer with good data should work and persist the customer     |    Yes     | Passing     |                               -                                |                                -                                 |
| 23  | Add a customer with empty fields should not be possible                |    Yes     | Passing     |                               -                                |                                -                                 |
| 24  | Add a customer with blank spaces on data fields should not be possible |    Yes     | Passing     |                               -                                |                                -                                 |
| 25  | Add a customer with bad data should not be possible                    |    Yes     | Not Passing | [#1](https://github.com/benjaminpinto/BankingProject/issues/1) | This automated test is marked with`skip` while the issue is open |
| 26  | When search for a valid customer, it should be shown on the list       |    Yes     | Passing     |                                                                |                                                                  |
| 27  | When delete a customer from the list, it should be properly removed    |    Yes     | Passing     |                                                                |                                                                  |

---

This project was created by [Benjamin Pinto](https://www.linkedin.com/in/benjamin-pinto/).
