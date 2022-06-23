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
- Github Action is properly configured and the project tests results are connected with Cypress Dashboard. I've configured parallelization with 4 threads at Github Action, but considering that I've reached my monthly free tier limit, just one thread is in fact executing all spec files.

---

This project was created by [Benjamin Pinto](https://www.linkedin.com/in/benjamin-pinto/).
