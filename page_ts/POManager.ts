
import {DashboardPage} from '../page_ts/DashboardPage';
import {LoginPage} from '../page_ts/LoginPage';
import {Page} from '@playwright/test';

export class POManager{
    page: Page
    loginPage: LoginPage
    dashboardPage : DashboardPage
    constructor(page:Page){
        this.page=page;
        this.loginPage= new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
    }

    getLoginPageObject(){
        return this.loginPage;
    }

    getDashboardPageObject(){
        return this.dashboardPage;
    }

}module.exports={POManager};