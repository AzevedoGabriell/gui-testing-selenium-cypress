const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:8000',
    // baseUrl: 'http://150.165.75.99:8080',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
