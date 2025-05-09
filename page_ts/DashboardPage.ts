import {test,expect} from '@playwright/test';
import {Page,Locator} from '@playwright/test';

export class DashboardPage{
    page: Page
    addNew: Locator
    deviceName:Locator
    osDropdown:Locator
    osType:Locator
    countryCode:Locator
    save:Locator
    tableHeader:Locator
    tableData:Locator
    deleteButton:Locator
    constructor(page:Page){
        this.page=page;
        this.addNew = this.page.getByRole('button', { name: 'add Add new' });
        this.deviceName= this.page.locator("#textfield-Devicename");
        this.osDropdown=this.page.locator(".mdl-selectfield__arrow");
        this.osType= this.page.locator("ul li");
        this.countryCode= this.page.getByLabel("Country code");
        this.save= this.page.locator("#btn-save-device");
        this.tableHeader= this.page.locator("table th");
        this.tableData = this.page.locator(".mdl-data-table tbody tr");
        this.deleteButton = this.page.locator("#btn-delete-device");
    }


    async addNewDevices(deviceNa:string,osTy:string,cc:string){
        await this.addNew.click();
        await this.deviceName.fill(deviceNa);
        await this.osDropdown.click();
        const t:Locator= this.osType.filter({hasText:osTy});
        if(await t.count()===1) 
            await t.click();
        await this.countryCode.fill(cc);
        await this.save.click();
    }
    
    

    async validateDeviceIsAvailable(deviceName:string,osType:string,countryCode:string,createdDate:string){
        //await this.page.waitForTimeout(3000);
        const count1:number= await this.tableData.count();
        for(let i=0;i<count1;i++){
            let deviceN = await this.tableData.nth(i).locator("td").nth(1).textContent();
            if(deviceN===deviceName){
                let os = await this.tableData.nth(i).locator("td").nth(4).textContent();
                let cc = await this.tableData.nth(i).locator("td").nth(2).textContent();
                let date = await this.tableData.nth(i).locator("td").nth(3).textContent();
                if(os === osType && cc === countryCode && createdDate ===date)
                    return true;
             }        
            else
                continue;        
        }      
        return false;
    }

    async checkDeviceIsDisplayed(deviceName:string,osType:string,countryCode:string,createdDate:string){
        let flag:boolean =await this.validateDeviceIsAvailable(deviceName,osType,countryCode,createdDate);
        expect(flag).toBeTruthy();   
    }

    async checkDeviceIsNotDisplayed(deviceName:string,osType:string,countryCode:string,createdDate:string){
        let flag:boolean =await this.validateDeviceIsAvailable(deviceName,osType,countryCode,createdDate);
        expect(flag).toBeFalsy();   
    }

    async checkNumberOfDuplicates(deviceName:string,osType:string,countryCode:string){
        await this.page.waitForTimeout(3000);
        const count1:number= await this.tableData.count();
        let k=0;
        for(let i=0;i<count1;i++){
            let deviceN = await this.tableData.nth(i).locator("td").nth(1).textContent();
            if(deviceN===deviceName){
                let os = await this.tableData.nth(i).locator("td").nth(4).textContent();
                let cc = await this.tableData.nth(i).locator("td").nth(2).textContent();
                
                if(os === osType && cc === countryCode)
                    k++;
             }        
            else
                continue;        
        }      
        
        console.log("Duplicates::"+k);
        expect(k===1).toBeTruthy(); 
    }

    async deleteRecord(deviceName:string,osType:string,countryCode:string,createdDate:string){
        await this.page.waitForLoadState('load');
        const count:number= await this.tableData.count();
        let flag:boolean=false;
        for(let i=0;i<count;i++){
            let deviceN = await this.tableData.nth(i).locator("td").nth(1).textContent();
            if(deviceN===deviceName){
                let os = await this.tableData.nth(i).locator("td").nth(4).textContent();
                let cc = await this.tableData.nth(i).locator("td").nth(2).textContent();
                let date = await this.tableData.nth(i).locator("td").nth(3).textContent();
                if(os === osType && cc === countryCode && createdDate ===date){
                    await this.tableData.nth(i).locator("td").first().locator(".mdl-checkbox").click();
                    flag=true;
                    break;
                }
            }
        }
        if(flag===true)
           await this.deleteButton.click();
        else
            console.log("No matching element found");
    }

    async retrieveFirstExistingRecord(){
        await this.page.waitForTimeout(3000);
        return [
            await this.tableData.first().locator("td").nth(1).textContent(),
            await this.tableData.first().locator("td").nth(4).textContent(),
            await this.tableData.first().locator("td").nth(2).textContent()
        ]

    }
}       
module.exports={DashboardPage}