import {test,expect} from '@playwright/test';
import {Page,Locator} from '@playwright/test';

export class LoginPage{
    page: Page
    username: Locator
    password:Locator
    loginButton: Locator
    logout:Locator
    constructor(page : Page){  
        this.page=page;
        this.username= this.page.locator("#textfield-Username");
        this.password = this.page.getByLabel("Password");
        this.loginButton = this.page.getByRole("button",{name: "Login"});
        this.logout = this.page.locator("#btn-logout");
    }

    async getURL(url:string){
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    async enterUsernamePasswordAndLogin(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
       
    }

    async logoutFromApp(){
        await this.logout.waitFor();
        await this.logout.click();
    }

    async verifySuccessfulLogin(){
        await this.logout.waitFor();
        await expect(this.logout,"User is not able to Login").toBeVisible();
    }
    
    async verifySuccessfulLogout(){
        await this.loginButton.waitFor();
        await expect(this.loginButton).toBeVisible();
    }

    async verifyUnSuccessfulLogin(){
        await this.loginButton.waitFor();
        await expect(this.loginButton).toBeVisible();
    }
}
module.exports={LoginPage};