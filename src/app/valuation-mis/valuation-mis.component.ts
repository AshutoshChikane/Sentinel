import { Component, OnInit } from '@angular/core';
import { ValDashboardService } from '../Service/val-dashboard.service';
import { Router } from '@angular/router';
import { ProjectTrackerService } from '../Service/project-tracker.service';
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-valuation-mis',
  templateUrl: './valuation-mis.component.html',
  styleUrls: ['./valuation-mis.component.scss']
})
export class ValuationMisComponent implements OnInit {

  constructor(private ValDashboard: ValDashboardService, private router: Router) { }

  QCloder: boolean;
  openSub: boolean;
  openChecks: boolean;
  M_On_MButton: boolean = true;
  checkListButton: boolean = true;
  Data_Errors_Comparison_MOM: boolean = false;
  Current_Month_Data_Errors: boolean = false;
  Product:boolean = false
  


  ngOnInit(): void {

  }


  checkPointData: any;
  monthOnMonthData: any;


  openCheckList() {
    this.openChecks = !this.openChecks;
    this.openSub = false
    this.M_On_MButton = !this.M_On_MButton
  }
  openMonthOnMonth() {
    this.openSub = !this.openSub;
    this.openChecks = false;
    this.checkListButton = !this.checkListButton;
    this.Product = false;
   
  }

  Data_Error_Com() {
    this.Data_Errors_Comparison_MOM = !this.Data_Errors_Comparison_MOM;
    this.Current_Month_Data_Errors = false
    this.Product = true
  }

  Current_Month() {
    this.Current_Month_Data_Errors = !this.Current_Month_Data_Errors;
    this.Data_Errors_Comparison_MOM = false
    this.Product = true;
  }

  openCheckPoint(value) {
    if (value === "Current") {
      this.QCloder = true;
      let obj = {
        moduleId: '1007',
        request_action: 'Valuation-Mis Current'
      };

      var params = {
        'Data': value
      }

      this.ValDashboard.checklist(obj).subscribe(
        result => {
          console.log('Response:', result);
          if (result) {
            this.checkPointData = result;
            this.ValDashboard.setMessage(this.checkPointData);
            this.QCloder = false;
            this.router.navigate(['/Val-Dashboard'], { state: params });
          }
        },
        error => {
          console.error('Error:', error);
          this.QCloder = false;
          alert(error.status + " " + error.statusText)
          this.router.navigate(['/Val-Mis']);
        }
      );
    }
    else if (value === "Previous") {
      var params = {
        'Data': value,
      }
      this.router.navigate(['/Val-Dashboard'], { state: params });
    }

  }


  // Module: any;
  // Id = 0
  
  // monthOnMonth(Module, Id) {
  //   let obj = {
  //     Module: Module,
  //     Id: Id,
  //     ModuleId: '12345',
  //     request_action: 'Valuation-Month-On-Month'
  //   }
  //   console.log(obj);
  //   this.QCloder = true;
  //   this.ValDashboard.checklistSave(obj).subscribe((result) => {
  //     console.log(result, "data month");

  //     this.monthOnMonthData = result;
  //     this.ValDashboard.setMonthOnMonth(this.monthOnMonthData);
  //     this.QCloder = false;
  //     this.router.navigate(['/Val-MonthOnMonth']);

  //   },
  //     error => {
  //       console.error('Error:', error);
  //       this.QCloder = false;
  //       alert(error.status + " " + error.statusText)
  //       this.router.navigate(['/Val-Mis']);
  //     })
  // }



   MonthOnMonthData = {
    'Current_Month_Data_Errors_Static_Checks' :1010,
    'Current_Month_Data_Errors_Critical_Checks':1011,
    'Current_Month_Data_Errors_Other_Checks':1012,
    'Data_Errors_Comparison_MOM_Static_Checks':1013,
    'Data_Errors_Comparison_MOM_Critical_Checks':1014,
    'Data_Errors_Comparison_MOM_Other_Checks':1015
   }

moduleName : any;
moduleId : 0;
SubmoduleId : any;
subModule :any

   monthOnMonth(Module,subModule ,Id ) {
    this.moduleName = Module;
    this.moduleId = this.MonthOnMonthData[Module]
    this.SubmoduleId = Id;
    this.subModule = subModule
    console.log(this.moduleName,this.moduleId, this.SubmoduleId, "jasbdhsbdf" )

    var params ={
      'moduleName': this.moduleName,
      'moduleId' : this.moduleId,
      'subModule': this.subModule,
      'SubmoduleId' : this.SubmoduleId
    }

    if(Module === 'Current_Month_Data_Errors_Static_Checks' ){
      this.processData(this.moduleName, this.moduleId,this.subModule, this.SubmoduleId);
     }
     else if(  Module === 'Current_Month_Data_Errors_Critical_Checks'){
      this.processData(this.moduleName, this.moduleId,this.subModule, this.SubmoduleId);
     }
     else if( Module === 'Current_Month_Data_Errors_Other_Checks'){
      this.processData(this.moduleName, this.moduleId,this.subModule, this.SubmoduleId);
     }
     else if(Module === 'Data_Errors_Comparison_MOM_Static_Checks'){
      this.router.navigate(['/Val-MonthOnMonth'],{state:params});
      // this.processData(this.moduleName, this.moduleId,this.subModule, this.SubmoduleId);
     }
     else if( Module === 'Data_Errors_Comparison_MOM_Critical_Checks'){
      this.router.navigate(['/Val-MonthOnMonth'],{state:params});
      // this.processData(this.moduleName, this.moduleId,this.subModule, this.SubmoduleId);
     }
     else if(Module === 'Data_Errors_Comparison_MOM_Other_Checks'){
      this.router.navigate(['/Val-MonthOnMonth'],{state:params});
      // this.processData(this.moduleName, this.moduleId,this.subModule, this.SubmoduleId);
     }
   }

   
   data: any;
   processData(moduleName, moduleId, subModule, SubmoduleId ){
    console.log(moduleName, moduleId, subModule, SubmoduleId, "mmmmmmmmmmmmmmmm Process");
    this.QCloder = true;
    var params ={
      'moduleName': moduleName,
      'moduleId' : moduleId,
      'subModule': subModule,
      'SubmoduleId' : SubmoduleId
    }
    
    let obj = {
      moduleName : moduleName,
      moduleId : moduleId,
      subModule : subModule,
      SubmoduleId :SubmoduleId,
      requested_by: 'Admin',
      request_action: 1  
    }
    this.ValDashboard.checklist(obj).subscribe((result)=>{
      this.data  = result;
      this.ValDashboard.setMonthOnMonth(this.data);
      this.router.navigate(['/Val-MonthOnMonth'],{state:params});
      this.QCloder = false;
    },
      error => {
        console.error('Error:', error);
        this.QCloder = false;
        alert(error.status + " " + error.statusText)
        this.router.navigate(['/Val-Mis']);
      });
   }
}
