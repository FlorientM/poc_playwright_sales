# POC_PLAYWRIGHT

We're trying to create some of the QA Sales transversal team automated tests with Playwright.

## Installation and basic configuration

Please check our gitbook: https://app.gitbook.com/o/0gRlAkSocTvnN36NTnDZ/s/tQXyX0bey9boqFcERW5F/automation/playwright-installation-and-basic-configuration

## Some handy commands
### Execution

* `context=lmfr-uat npx playwright test`: Will launch all the tests on the LMFR UAT environment
* `context=lmfr-uat npx playwright test --headed`: Will launch all the tests and display the browser on the LMFR UAT environment
* `context=lmfr-uat npx playwright test tests/wishlist.spec.ts --headed`: Will launch only the test file "wishlist.spec.ts" and display the browser on the LMFR UAT environment

### Reports

At the end of the test, use the following commands to display a better looking report
* `npx allure generate ./allure-results --clean`: Will clean the previous allure-report and generate the new one
* `npx allure open ./allure-report`: Show the last execution report