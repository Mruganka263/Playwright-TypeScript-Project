# Playwright - TypeScript with POM
This is a simple test automation project for the Device Manager Web App. It's built with Playwright and TypeScript using the Page Object Model(POM) framework.

# Folder Structure

- pages: This folder will contain the page objects for the application
- test_data:  This folder contains the test data required for testing
- test-results: This folder contains the results of the execution
- tests: This folder will contain the application's test files. Each test file performs the tests using page objects.
- playwright.config.ts: This file contains configuration for the framework.

## Run the tests


Run the below command to import the playwright packages -
`npm init`

To run all the tests, use the command below in the terminal 
`npx playwright test`

Note: the test will run in head mode and on Chromium browsers only. And to run in headless mode, change it in playwright.config.js
`headless: true`
To change the browser-
`browserName: 'firefox'`
`browserName: 'webkit'`

# Tests

I have automated the following scenarios-
```
1. Successful login into the Webapp
2. Unsuccessful login with invalid credentials
3. Log out of the Webapp
4. Add a new Device record for multiple datasets and verify whether it's present on the UI.
5. Verify whether duplicates are not created
6. Verify whether all fields are mandatory in the Add dialog, and the record should not be created with missing fields
7. Delete records and verify it on the UI
```
