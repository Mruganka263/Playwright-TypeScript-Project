import {test,expect} from '@playwright/test';
import { POManager } from '../page_ts/POManager';
import {DashboardPage} from '../page_ts/DashboardPage';
import {LoginPage} from '../page_ts/LoginPage';
const logindata= JSON.parse(JSON.stringify((require('../test_data/LoginPageData.json'))));
const dataset = JSON.parse(JSON.stringify((require('../test_data/DashboardPageData.json'))));

for(const data of dataset.set1){
test(`Create device for ${data.deviceName} and verify the device appears in the list`,async ({page})=>{
        /*
        Expected: Add 2 new device record
        */
        const poManager:POManager = new POManager(page);
        const login:LoginPage = poManager.getLoginPageObject();
        await login.getURL(logindata.url);
        await login.enterUsernamePasswordAndLogin(logindata.username,logindata.password);
        await login.verifySuccessfulLogin();
        const dashboardPage:DashboardPage = poManager.getDashboardPageObject();
        await dashboardPage.addNewDevices(data.deviceName,data.osType,data.countryCode);
        let date:Date = new Date();
        let createdDate:string= date.getDate()+"."+String(date.getMonth()+1).padStart(2, '0')+"."+date.getFullYear();  
        await dashboardPage.checkDeviceIsDisplayed(data.deviceName,data.osType,data.countryCode,createdDate)
})}

test('Verify whether duplicates entries are not created',async ({page})=>{
    /*
    Expected: User should not be able to create duplicate records
    */ 
    const poManager:POManager = new POManager(page);
    const login:LoginPage = poManager.getLoginPageObject();
    await login.getURL(logindata.url);
    await login.enterUsernamePasswordAndLogin(logindata.username,logindata.password);
    await login.verifySuccessfulLogin();
    const dashboardPage:DashboardPage = poManager.getDashboardPageObject();
    const data1:any= await dashboardPage.retrieveFirstExistingRecord();
    console.log(data1);
    await dashboardPage.addNewDevices(data1[0],data1[1],data1[2]);
    await dashboardPage.checkNumberOfDuplicates(data1[0],data1[1],data1[2]);
    })

test('Verify whether all fields are mandatory in Add dialog and record is not created with missing entries',async ({page})=>{
    /*
    Expected: All 3 values should be present while creating new record else it should fail to insert.
    */
    const poManager:POManager = new POManager(page);
    const login:LoginPage = poManager.getLoginPageObject();
    await login.getURL(logindata.url);
    await login.enterUsernamePasswordAndLogin(logindata.username,logindata.password);
    await login.verifySuccessfulLogin();
    const dashboardPage:DashboardPage = poManager.getDashboardPageObject();
    await dashboardPage.addNewDevices(dataset.set2.deviceName,"","");
    let date:Date = new Date();
    let createdDate:string= date.getDate()+"."+String(date.getMonth()+1).padStart(2, '0')+"."+date.getFullYear();
    await dashboardPage.checkDeviceIsNotDisplayed(dataset.set2.deviceName,"","",createdDate)    
})



test('Delete device record and verify the list',async ({page})=>{
    /*
    delete a single selected record
    */
        const poManager:POManager = new POManager(page);
        const login:LoginPage = poManager.getLoginPageObject();
        await login.getURL(logindata.url);
        await login.enterUsernamePasswordAndLogin(logindata.username,logindata.password);
        await login.verifySuccessfulLogin();
        const dashboardPage:DashboardPage = poManager.getDashboardPageObject();
        // await dashboardPage.addNewDevices(dataset.set2.deviceName,dataset.set2.osType,dataset.set2.countryCode);
        await dashboardPage.deleteRecord(dataset.set2.deviceName,dataset.set2.osType,dataset.set2.countryCode,dataset.set2.createdDate);
        await dashboardPage.checkDeviceIsNotDisplayed(dataset.set2.deviceName,dataset.set2.osType,dataset.set2.countryCode,dataset.set2.createdDate);
})