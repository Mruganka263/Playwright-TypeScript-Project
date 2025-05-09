import {test} from '@playwright/test';
import {POManager} from '../page_ts/POManager';
import {LoginPage} from '../page_ts/LoginPage';
const data= JSON.parse(JSON.stringify((require('../test_data/LoginPageData.json'))));

test('Login with valid credentials',async ({page})=>{
    /*
    Expected: User should be able to login with valid credential
    */
    const poManager:POManager = new POManager(page);
    const login:LoginPage = poManager.getLoginPageObject();
    await login.getURL(data.url);
    await login.enterUsernamePasswordAndLogin(data.username,data.password);
    await login.verifySuccessfulLogin();
})

test('Login with invalid credentials',async ({page})=>{
    /*
    Expected: User should not be able to login with invalid credential
    */
    const poManager:POManager = new POManager(page);
    const login:LoginPage = poManager.getLoginPageObject();
    await login.getURL(data.url);
    await login.enterUsernamePasswordAndLogin(data.username,"test");
    await login.verifyUnSuccessfulLogin();
})

test('Logout from the application',async ({page})=>{
    /*
    Expected: User should be able to Logout of the Application
    */ 
    const poManager:POManager = new POManager(page);
    const login:LoginPage = poManager.getLoginPageObject();
    await login.getURL(data.url);
    await login.enterUsernamePasswordAndLogin(data.username,data.password);
    await login.logoutFromApp();
    await login.verifySuccessfulLogout();
})