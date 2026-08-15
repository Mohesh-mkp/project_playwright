import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../../resources/utils/loginPage';

const { Given, When, Then } = createBdd();

let loginPage: LoginPage;

Given('the user is on the Amazon sign-in page', async function ({ page }) {
  loginPage = new LoginPage(page);
  await loginPage.navigatetoPage();
});

When('the user enters a valid email or mobile number {string}', async function ({}, email: string) {
  await loginPage.enterEmail(email);
});

When('the user clicks the Continue button', async function () {
  await loginPage.clickContinue();
});

When('the user enters a valid password {string}', async function ({}, password: string) {
  await loginPage.enterPassword(password);
});

When('the user clicks the Sign-In button', async function () {
  await loginPage.clickSignIn();
});

Then('the user should be redirected to the Amazon homepage', async function ({ page }) {
  await expect(page).toHaveURL(/amazon\./);
});

Then('the user should see the account name', async function () {
  await loginPage.verifyAccountGreeting();
});

Then('the user should be able to log out successfully', async function () {
  await loginPage.logout();
});

