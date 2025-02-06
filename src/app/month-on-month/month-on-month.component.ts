import { Component, OnInit } from '@angular/core';
import { ValDashboardService } from '../Service/val-dashboard.service';
import Swal from 'sweetalert2';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-month-on-month',
  templateUrl: './month-on-month.component.html',
  styleUrls: ['./month-on-month.component.scss']
})
export class MonthOnMonthComponent implements OnInit {

  constructor(private ValDashboard: ValDashboardService, public Export: JsontoexcelService, private router: Router,) {
    this.routerState = this.router.getCurrentNavigation().extras.state;
    this.ModuleName = this.routerState['moduleName'];
    this.moduleId = this.routerState['moduleId'];
    this.subModule = this.routerState['subModule'];
    this.SubmoduleId = this.routerState['SubmoduleId'];
   }
   routerState: any;
  QCloder: boolean;
  Data: any;
  Options: string[] = [];
  formData: any;
  ModuleName: any;
  moduleId: any;
  subModule: any;
  SubmoduleId: any;
  Current_Data:boolean = false;
  Previous_Data:boolean = false;
  firstMonth: any;
  secondMonth: any;
  thirdMonth: any;
  monthData: any;
  ShowMonthWise:boolean = false;
  selectedMonthData1 :any;
  selectedMonthData2: any;
  selectedMonthData3: any;




  ngOnInit(): void {
    if(this.ModuleName ==='Current_Month_Data_Errors_Static_Checks'|| this.ModuleName === 'Current_Month_Data_Errors_Critical_Checks'|| this.ModuleName ==='Current_Month_Data_Errors_Other_Checks'){
    this.initialData()
    this.Current_Data = true;
    this.Previous_Data = false;
    }
    else{
      this.Current_Data = false;
      this.Previous_Data = true
    }
    
  }



  initialData() {
    console.log("i am here");
    this.QCloder = true;
    this.ValDashboard.getMonthOnMonth().subscribe(result => {
     
      console.log(result, "data on the way");
      const resp = result.response_text;

      console.log(resp, "valdata");
      this.Data = Array.isArray(resp) ? resp : [];
  
      console.log(this.Options, "hhhhhhhhhhh");


      this.formData = this.Data.map(item => ({
        Check_points: item.Check_points,
        Date:item.Date,
        Pass_Count: item.Pass_Count,
        Fail_Count: item.Fail_Count,
        Issue: item.Issue,
        Reason: item.Reason,
        Sample: item.Sample,
        Action: item.Action,
        Comment: item.Comment
      }));

      this.QCloder = false;
      

    },
      error => {
        console.error('Error fetching data', error);
        this.Data = [];
        this.formData = [];
      });
  }




  Submit(){
    console.log('Form Data:', this.formData);
      let obj = {
        moduleId : "1016",
        request_action : "Valuation-Data ",
        Data : this.formData
      }

    this.ValDashboard.checklist(obj).subscribe(result =>{
      console.log(result, "result")
      Swal.fire('Submitted', 'Successfully', 'success');
      this.formData;
    },
  (error)=>{
    console.log(error, "error");

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.status + '  '+ error.statusText 
    });
  })

  }



  AddCheckPoint(){
    Swal.fire({
      title: 'Check-List',
      html: `
        <input type="text" id="check_point" class="swal2-input" placeholder="Check-Point"> `,
      focusConfirm: false,
      confirmButtonText: 'Add',
      preConfirm: () => {
        const checks = (document.getElementById('check_point') as HTMLInputElement).value;
        if (!checks) {
          Swal.showValidationMessage('Please fill out fields');
          return null;
        }
        return { checks };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value.checks, "check-Point");
        let checklist = result.value.checks;
        // let obj = {
        //   moduleId: "1016",
        //   request_action: "Valuation-Dashboard Data - CheckList Add",
        //   Check_List_Point: checklist,
        // }
        // this.ValDashboard.checklist(obj).subscribe((result) => {
        //   console.log(result);
          // Add the new check point to formData
          this.formData.push({
            Check_points: checklist,
            Date:'',
            Pass_Count:'',
            Fail_Count: '',
            Issue: '',
            Reason: '',
            Sample: '',
            Action: '',
            Comment: ''
          });
        // });
        Swal.fire('Saved!', 'Check-Point has been Added.', 'success');
      }
    });
  }

  monthSend(){
    if(this.selectedMonthData1 && this.selectedMonthData2 && this.selectedMonthData3){
      this.firstMonth = this.selectedMonthData1;
      this.secondMonth = this.selectedMonthData2;
      this.thirdMonth = this.selectedMonthData3;
      this.QCloder = true;

      let obj = {
        moduleId : this.moduleId,
        request_action : "Valuation-Data For Month",
        ModuleName :this.ModuleName,
        Submodule :this.subModule ,
        subModuleId:this.SubmoduleId,
        selectedMonthData1 :  this.selectedMonthData1,
        selectedMonthData2 :this.selectedMonthData2,
        selectedMonthData3 : this.selectedMonthData3
      }

      this.ValDashboard.checklist(obj).subscribe((result)=>{
        this.ShowMonthWise=true
      this.monthData= result.response_text
      console.log(this.monthData, "data")
      this.QCloder = false;
      Swal.fire('Saved!', 'Updated Data.', 'success');
      },
      (error)=>{
        console.log(error, "error");
    
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.status + '  '+ error.statusText 
        });
      })
    }
    else{
      alert("Please select the Month")
    }
  }

  exportData(){
    this.Export.exportAsExcelFile(this.formData, 'MonthOnMonth');
  }
  exportData1(){
    this.Export.exportAsExcelFile(this.monthData, 'Monthly Data');
  }
}
