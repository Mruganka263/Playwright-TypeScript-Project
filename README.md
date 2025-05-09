# Playwright - TypeScript with POM
This is a simple test automation project for Device Manager WebApp. It's build with Playwright and Typescript using Page Object Model(POM) framework.

# Folder Structure

- pages : This folder will contain the page objects for the application
- test_data :  This folder contains the test data require for testing
- test-results : This folder contains the results of execution
- tests : This folder will contain the test files for the application. Each test file uses the page objects to perform the tests.
- playwright.config.js : This file contains configuration for the framework.

## Run the tests

The project doesn't contain packages(node_modules) for playwright, so create a new folder in Visual Studio, copy contents from Device Manager App and paste all folders and files in the new folder.

Run below command to import the playwright packages -
`npm init playwright@latest`

```
Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
√ Do you want to use TypeScript or JavaScript? · JavaScript
√ Where to put your end-to-end tests? · e2e
√ Add a GitHub Actions workflow? (y/N) · false
√ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
Installing Playwright Test (npm install --save-dev @playwright/test)…

added 5 packages, and audited 6 packages in 3s

found 0 vulnerabilities
√ C:\Users\mruga\OneDrive\Desktop\New folder\playwright.config.js already exists. Override it? (y/N) · false
```

To run all the tests use below command in terminal 
`npx playeright test`

Note: the test will run in headed mode and on chromium browsers only.And to run in headless mode, change it in playwright.config.js
`headless: true`
To change the browser-
`browserName: 'firefox'`
`browserName: 'webkit'`

# Tests

I have automated below scenario-
```
1. Successful login into the Webapp
2. Unsuccessful login with invalid credential
3. Logout from the Webapp
4. Add new Device record for multiple data set and verify whether it's present on UI.
5. Verify whether duplicates are not created
6. Verify whether all fields are mandatory in Add dialog and record should not be created with missing fields
7. Delete records and verify it on UI
```
