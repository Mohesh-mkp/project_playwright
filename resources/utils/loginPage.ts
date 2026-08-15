import { Page, expect } from '@playwright/test';
import { LoginLocators } from '../locators';

export class LoginPage {
        
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async navigatetoPage() {
        await this.page.goto('https://www.amazon.in/');
        await this.page.waitForLoadState('domcontentloaded');

        const continueShoppingBtn = this.page.getByRole('button', { name: 'Continue shopping' });

        try {
            await continueShoppingBtn.waitFor({ state: 'visible', timeout: 3000 });
            await continueShoppingBtn.click();
            await this.page.waitForLoadState('domcontentloaded');
        } catch {
            console.log('Continue shopping button not shown — skipping.');
        }

        await this.page.locator(LoginLocators.allMenu).click();
        await this.page.locator(LoginLocators.signInBtn).first().click();
    }

    async enterEmail(email: string) {
        await this.page.locator(LoginLocators.emailInput).fill(email);
    }

    async clickContinue() {
        await this.page.locator(LoginLocators.continueButton).click();
    }

    async enterPassword(password: string) {
        await this.page.locator(LoginLocators.passwordInput).fill(password);
    }

    async verifySearchboxVisibility(){
        await this.page.locator(LoginLocators.searchfieldText).waitFor({ state: 'visible', timeout: 3000 });
        await expect(this.page.locator(LoginLocators.searchIconBtn)).toBeVisible();
    }

    async clickSignIn() {
        await this.page.locator(LoginLocators.loginBtn).click();
        await this.verifySearchboxVisibility();
    }

    async verifyAccountGreeting() {
        const text = await this.page.locator('.nav-line-1-container span').textContent();
        console.log('Account Name:', text);
        expect(text).toContain('Hello');
    }

    async logout() {
        await this.page.locator(LoginLocators.allMenu).click();
        await this.page.locator(LoginLocators.signOutBtn).first().click();
        await expect(this.page.locator(LoginLocators.emailInput)).toBeVisible();
    }
}