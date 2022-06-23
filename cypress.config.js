const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '5cfi5p',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: 'https://www.globalsqa.com/angularJs-protractor/BankingProject',
  },
})
