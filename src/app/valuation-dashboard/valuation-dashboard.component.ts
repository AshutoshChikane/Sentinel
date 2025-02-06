import { Component, OnInit } from '@angular/core';
import { ValDashboardService } from '../Service/val-dashboard.service';
import { empty } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { error } from 'console';
import { JsontoexcelService } from '../Service/jsontoexcel.service';


@Component({
  selector: 'app-valuation-dashboard',
  templateUrl: './valuation-dashboard.component.html',
  styleUrls: ['./valuation-dashboard.component.scss']
})
export class ValuationDashboardComponent implements OnInit {

  Data: any;
  Month: any;
  Options: string[] = [];
  formData: any;
  QCloder:boolean = false;
  routerState;
  checkListOf;
  

  constructor(private ValDashboard: ValDashboardService, private router: Router, public Export: JsontoexcelService) { 
    this.routerState = this.router.getCurrentNavigation().extras.state;
    this.checkListOf = this.routerState['Data'];

    console.log(this.checkListOf, "yyyyyyyyyyyyyyyyyyyy");
    
  }

  CurrentChecklistHTML:boolean;
  PreviousCheckListHTML:boolean;

ngOnInit() {
  if(this.checkListOf === "Current"){
this.CurrentChecklistHTML = true;
this.PreviousCheckListHTML = false;
this.initialData();
  }
  else if(this.checkListOf === "Previous"){
    this.CurrentChecklistHTML = false;
    this.PreviousCheckListHTML = true;

    // this.getPreviousMonthData();
  }

  
  
}




  initialData(){
    this.QCloder = true;
    this.ValDashboard.getMessage().subscribe(result => {
    this.Month = result.checkList_Month
    console.log(result.checkList_Month, "data on the way");
    const resp = result.response_text;
    console.log(resp, "valdata");    
    this.Data = Array.isArray(resp) ? resp : [];    
    this.Options = ["Yes", "No"];
    console.log(this.Options, "hhhhhhhhhhh");
    

    this.formData = this.Data.map(item => ({
      Check_points: item.Check_points,
      Date: item.Date || '' || "none",
      Month: item.Month || ''|| "none",
      Issue: item.Issue || ''|| "none",
      Count: item.Count || ''|| "none",
      Sample: item.Sample || ''|| "none",
      Comment: item.Comment || '' || "none"
    }));

      this.QCloder = false;

  },
  error => {
    console.error('Error fetching data', error);
    this.Data = [];
    this.formData = [];
  });
}

PreviousDataTable:boolean;
PreviousMonth: any;
tableData: any;
selectePreviousMonth: any;
Valuation_Month: any;

getPreviousMonthData(){
  if(this.selectePreviousMonth){
    this.QCloder = true;
    let obj = {
      moduleId: '1008',
      Month :this.selectePreviousMonth,
      request_action: 'Valuation-Mis Previous'
    };

    this.ValDashboard.checklist(obj).subscribe((result)=>{
        this.PreviousDataTable = true;
        this.PreviousMonth= result.checkList_Month;
        this.tableData = result.response_text;

      this.QCloder = false;

    })

  }
  else{
    alert("Please Select Month")
  }
}




Save(){
    console.log('Form Data:', this.formData);
      let obj = {
        moduleId : "1005",
        request_action : "Valuation-Dashboard Data save",
        Data : this.formData,
        Valuation_Month: this.Valuation_Month
      }

    this.ValDashboard.checklist(obj).subscribe(result =>{
      console.log(result, "result")
      Swal.fire('Saved', 'Successfully', 'success');
      // this.initialData();
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

addChecks() {
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
      let obj = {
        moduleId: "1009",
        request_action: "Valuation-Dashboard Data - CheckList Add",
        Check_List_Point: checklist,
      }
      // this.ValDashboard.checklist(obj).subscribe((result) => {
      //   console.log(result);
        // Add the new check point to formData
        this.formData.push({
          Check_points: checklist,
          Date: '',
          Month: '',
          Issue: '',
          Count: '',
          Sample: '',
          Comment: ''
        });
      // });
      Swal.fire('Saved!', 'Check-Point has been Added.', 'success');
    }
  });
}

// addChecks(){
  
//     Swal.fire({
//       title: 'Check-List',
//       html: `
//         <input type="text" id="check_point" class="swal2-input" placeholder="Check-Point"> `,
//       focusConfirm: false,
//       confirmButtonText: 'Add',
//       preConfirm: () => {
//         const checks = (document.getElementById('check_point') as HTMLInputElement).value;
//         if (!checks) {
//           Swal.showValidationMessage('Please fill out fields');
//           return null;
//         }
//         return { checks };
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         console.log(result.value.checks ,"check-Point");
//         let checklist = result.value.checks; 
//         let obj = {
//           moduleId : "1009",
//         request_action : "Valuation-Dashboard Data - CheckList Add",
//         Check_List_Point : checklist,
//         }
//         this.ValDashboard.checklist(obj).subscribe((result)=>{
//           console.log(result)
//         })
//         Swal.fire('Saved!', 'Check-Point has been Added.', 'success');
//       }
//     });
  
// }
  

  
  // Clear() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You want to clear this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, Clear it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       let obj = {
  //         moduleId : "1005",
  //         request_action : "Valuation-Dashboard-clear"
  //       }
  //       this.ValDashboard.checklist(obj).subscribe(result =>{
  //         console.log(result, "clear");
  //         if(result.response_message === "Clear"){
  //           this.formData = this.formData.map(item => ({
  //             Check_points: item.Check_points,
  //             Date: '',
  //             Month: '',
  //             Issue: '',
  //             Count: '',
  //             Sample: '',
  //             Comment: ''
  //           }));
            
  //           Swal.fire(
  //             'Cleared!',
  //             'Your Data has been Cleared.',
  //             'success'
  //           )
  //         }
          
  //       },
  //       (error)=>{
  //         console.log(error, "error");
          
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: error.status + '  '+ error.statusText
  //         });
  //       })
        
                
  //     }
  //   })
    
  // }

  selectedMonthData: any

//   monthSend(){
//     if(!this.selectedMonthData){
// alert("please select Month ")
//     }else{
//       let obj = {
//         moduleId : "1006",
//         Month : this.selectedMonthData,
//         request_action : "Valuation-Month-Data"
//       }
//       this.ValDashboard.checklist(obj).subscribe(result =>{
//         console.log(result, "send");
//         this.initialData();
        
//       })
//     }
//   }

monthSend() {
  if (!this.selectedMonthData) {
    alert("please select Month");
  } else {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Submit this!",
      footer:'<h6 style="color:red;"> Disclaimer : Data for current month will be saved finally, After that data will come for next month</h6>',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let obj = {
                moduleId: "1006",
                Month: this.selectedMonthData,
                totalMonthData : this.formData,
                request_action: "Valuation-Data Submit"
              }
        this.ValDashboard.checklist(obj).subscribe(result =>{
           if(result){
            Swal.fire(
              'Done !',
              'Your Data has been Submitted.',
              'success'
            );
            
            this.formData = this.formData.map(item => ({
                          Check_points: item.Check_points,
                          Date: '',
                          Month: '',
                          Issue: '',
                          Count: '',
                          Sample: '',
                          Comment: ''
                        }));
          }
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
    })
    


  }
}
    

  
  exportData(){
    this.Export.exportAsExcelFile(this.formData,  'Current_Month');
  }
  exportPreviousData(){
    this.Export.exportAsExcelFile(this.tableData, 'Previous_month_Data');
  }
}




//------------------------------------------------------------------------------------------------------------------------------------
// monthSend() {
//   if (!this.selectedMonthData) {
//     alert("please select Month");
//   } else {
//     let obj = {
//       moduleId: "1006",
//       Month: this.selectedMonthData,
//       totalMonthData : this.formData,
//       request_action: "Valuation-Month-Data"
//     }
//     this.QCloder = true;
//     this.ValDashboard.checklist(obj).subscribe(result => {
//       console.log(result, "send");
//       if(result){
//         Swal.fire({
//           title: "Data Updated!",
//           icon: "success"
//         });
//       const resp = result.response_text;
//       this.Data = Array.isArray(resp) ? resp : [];
//       this.formData = this.Data.map(item => ({
//         Check_points: item.Check_points,
//         Date: item.Date || '' || "none",
//         Month: item.Month || '' || "none",
//         Issue: item.Issue || '' || "none",
//         Count: item.Count || '' || "none",
//         Sample: item.Sample || '' || "none",
//         Comment: item.Comment || '' || "none"
//       }));
//       this.QCloder = false;
//     }
//     else{
//       alert("Data not Updated")
//     }
//     },(error)=>{
//       console.log(error, "error");
      
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error.status + '  '+ error.statusText
//       });
//       this.QCloder = false;
//     }
//   );
//   }
// }