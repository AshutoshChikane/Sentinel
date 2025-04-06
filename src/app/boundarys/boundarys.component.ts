import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnyTxtRecord } from 'dns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-boundarys',
  templateUrl: './boundarys.component.html',
  styleUrls: ['./boundarys.component.scss']
})
export class BoundarysComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {

    this.productPlanForm = this.fb.group({
      planId: ['', Validators.required],
      system: ['', Validators.required],
      minimumEntryAge: ['', [Validators.required]],
      maximumEntryAge: ['', [Validators.required]],
      minimumTerm: ['', Validators.required],
      maximumTerm: ['', Validators.required],
      minSA: ['', Validators.required],
      maxSA: ['', Validators.required],
      minPPT: ['', Validators.required],
      maxPPT: ['', Validators.required],
      // minCoverStartDate: ['', Validators.required],
      revivalInterest: ['', Validators.required],
      loanInterest: ['', Validators.required],
      // backdatingInterest: ['', Validators.required],
      // gstRateBackdatedInterest: ['', Validators.required],
      // gstRateRevivalInterest: ['', Validators.required],
      // duplicatePolicyCharge: ['', Validators.required],
      // emr: ['', Validators.required],
      // nsap: ['', Validators.required],
      // gaRateInforce: ['', Validators.required],
      // gaRateLapse: ['', Validators.required],
      adminCharges: ['', Validators.required],
      minimumMaturityAge: ['', Validators.required],
      maximumMaturityAge: ['', Validators.required],
      minimumPremium: ['', Validators.required],
      maximumPremium: ['', Validators.required],
      // discontinuanceCharges: ['', Validators.required],
      fundSwitchesAllowed: ['', Validators.required],
      premiumPaymentFrequency: ['', Validators.required],
      loyaltyAdditionCriteria: ['', Validators.required],
      // staffDiscountApplicability: [''],
      ridersPermitted: ['', Validators.required],
      // allocationCharges: ['', Validators.required],
      // samf: ['', Validators.required],
      revivalPeriod: ['', Validators.required],
      // gracePeriod: ['', Validators.required],
      // flcMortalityRate: ['', Validators.required],
      // stampDuty: ['', Validators.required],
      PlanType: ['', Validators.required],
      UIN:['',Validators.required]
    });


    this.productForm = this.fb.group({
      product_Code: [''],
      plan_id: [''],
      plan_type: [''],
      product_name: [''],
      system: [''],
      uin: [''],
      sub_data: this.fb.array([]) 
      // sub_data: this.fb.array([
      //   this.fb.group({
      //     type_of_checks: [''],
      //     observation: [''],
      //     duff_values: [''],
      //     table_value: [''],
      //     Passfail: [''],
      //     comments:[''],
      //   }),
      //   this.fb.group({
      //     type_of_checks: [''],
      //     observation: [''],
      //     duff_values: [''],
      //     table_value: [''],
      //     Passfail: [''],
      //     comments:[''],
      //   }),
      //   this.fb.group({
      //     type_of_checks: [''],
      //     observation: [''],
      //     duff_values: [''],
      //     table_value: [''],
      //     Passfail: [''],
      //     comments:[''],
      //   })
      // ])
    });
  
    for (let i = 0; i < 36; i++) {
      (this.productForm.get('sub_data') as FormArray).push(
        this.fb.group({
          type_check: [''],
          observation: [''],
          duff_values: [''],
          table_value: [''],
          Passfail: [''],
          comments: [''],
        })
      );
    }

    // let url = '../../assets/allplansget.json';
    
    let url = 'core/ProjectBoundaryList'
  this.http.get<any>(url).subscribe(data=>{
    this.showexisting= true;
    this.showNew=false;
    this.editrecord = false;
    this.showfailed=false;
    this.plansData = data.response_text
    console.log(data)
  });
  }

  productPlanForm: FormGroup;
  productForm:FormGroup;
  systems = ['UAT', 'Production'];
  frequencies = ['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];

  constructor(private fb: FormBuilder, private http:HttpClient, private snackBar: MatSnackBar,private excelService: JsontoexcelService,) {
   
  }
data:any
onSubmit() {
  console.log(this.productPlanForm.value);
 
  if (this.productPlanForm.valid) {
    this.data = this.productPlanForm.getRawValue();
    this.http.post('core/ProjectBoundaryCheck', this.data).subscribe(
      data => {
        console.log('Form Submitted', this.productPlanForm.getRawValue());
        this.snackBar.open('Form submitted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ["snackbar-success"]
        });
        this.showexisting=true;
        this.showNew=false;
        this.showfailed=false;
      },
      error => {
        this.snackBar.open('Error submitting form', 'Close', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ["snackbar-error"]
        });
      }
    );
  } else {
    console.log('Form is invalid');
    this.snackBar.open('Form is invalid!', 'Close', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ["snackbar-error"]
    });
  }
}
  showexisting :boolean = false;
  showNew:boolean=false;
  editrecord:boolean=false;
  addNew(){
      this.showexisting= false;
      this.showNew=true;
      this.editrecord = false;
      this.showfailed=false;

  }
  plansData:any
  showExisting(){
   
      // let url = '../../assets/allplansget.json';
    
      let url = 'core/ProjectBoundaryList'
    this.http.get<any>(url).subscribe(data=>{
      this.showexisting= true;
      this.showfailed=false;
      this.showNew=false;
      this.editrecord = false;
      this.plansData = data.response_text
      console.log(data)
    });
  }

  searchText:any

isview:boolean=false;
id:any

dataofexisting :any
  editPlan(plan_id: any, action:any): void {
    //  const plan =  this.plansData.find(x => x.plan_id == plan_id)
    //       if (plan) {
    //         this.showexisting= false;
    //         this.showNew=false;
    //         this.editrecord = true;
    //         // Patch only the plan_id field in the form
    //        this.productForm.patchValue(
    //         plan
    //         );
    //         console.log('Form patched with plan_id:', plan);
    //       } else {
    //         console.log('Plan not found');
    //       }
    this.id=plan_id
    let url = 'core/ProjectBoundaryCheck';
    // let url = '../../assets/dummyraw.json';
    let params = new HttpParams().set('planId', this.id);
    this.http.get(url,  { params }).subscribe(data => {
     if(action=='edit'){
      console.log(data)
      this.showexisting = false;
      this.showNew = false;
      this.editrecord = true;
      this.isview=false;
      this.showfailed=false;
      this.productForm.patchValue(
        data
      );
     }
     else if(action=='view'){
      console.log(data)
      this.dataofexisting=data
      this.showexisting = false;
      this.showNew = false;
      this.editrecord = true;
      this.isview=true;
      this.showfailed=false;
      this.productForm.patchValue(
        data
      );
     }
    })
  }



      edits(){
        console.log(this.productForm.value)
      }

      onSave(){
        console.log(this.productForm.getRawValue());
  
        if (this.productForm.valid) {
          this.data = this.productForm.getRawValue();
          this.http.put('core/ProjectBoundaryCheck', this.data).subscribe(
            data => {
              console.log('Form Submitted', this.productPlanForm.getRawValue());
              this.snackBar.open('Form submitted successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ["snackbar-success"]
              });
              this.showexisting = true;
              this.showNew = false;
              this.editrecord = false;
              this.showfailed=false;
            },
            error => {
              this.snackBar.open('Error submitting form', 'Close', {
                duration: 4000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ["snackbar-error"]
              });
                    
            }
          );
        } else {
          console.log('Form is invalid');
          this.snackBar.open('Form is invalid!', 'Close', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ["snackbar-error"]
          });
        }
      }
      


      exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.plansData, 'Bounadary_check_all_policyDetails');
      }

      exportAsXLSXFAiled(){
        this.excelService.exportAsExcelFile(this.failedData, 'Failed_cases_policyDetails');
      }

      exportAsXLSXview(){

        // const flattenedData = this.dataofexisting.sub_data.map((item: any) => ({
        //   ...item,
        //   plan_id: this.dataofexisting.plan_id,
        //   plan_type: this.dataofexisting.plan_type,
        //   product_name: this.dataofexisting.product_name,
        //   system: this.dataofexisting.system,
        //   uin: this.dataofexisting.uin
        // }));
        console.log(this.dataofexisting)
        this.excelService.exportAsExcelFile(this.dataofexisting.sub_data, 'Failed_cases_policyDetails');
      }

showfailed:boolean=false;
failedData:any;
      showFailedCases(){
        // let url = '../../assets/onlyfailed.json';
    
        let url = 'core/ProjectBoundaryCheckFail'
      this.http.get<any>(url).subscribe(data=>{
        console.log(data)
        this.showexisting= false;
        this.showNew=false;
        this.editrecord = false;
        this.showfailed=true;
        this.failedData=data.response_text
        console.log(data)
      });
      }

     
      saveasexcel(){
       

          // const parentRow = {
          //   plan_id: this.dataofexisting.plan_id,
          //   plan_type: this.dataofexisting.plan_type,
          //   product_name: this.dataofexisting.product_name,
          //   system: this.dataofexisting.system,
          //   uin: this.dataofexisting.uin
          // };
        
          // // Convert sub_data to Excel-compatible format
          // const subDataRows = this.dataofexisting.sub_data.map((item: any) => ({
          //   type_check: item.type_check,
          //   observation: item.observation,
          //   duff_values: item.duff_values,
          //   comments: item.comments
          // }));
        
          // // Merge the parentRow and subDataRows
          // const finalData = [parentRow, ...subDataRows];
        
          // // Create worksheet and workbook
          // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(finalData, {
          //   skipHeader: false // Ensure headers are included
          // });
          // const workbook: XLSX.WorkBook = XLSX.utils.book_new();
          // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
          // // Convert workbook to binary and trigger download
          // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          // const dataBlob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  

          const parentData = [
            { type_check: 'plan_id', value: this.dataofexisting.plan_id },
            { type_check: 'plan_type', value: this.dataofexisting.plan_type },
            { type_check: 'product_name', value: this.dataofexisting.product_name },
            { type_check: 'system', value: this.dataofexisting.system },
            { type_check: 'uin', value: this.dataofexisting.uin }
          ];
        
          // Convert sub_data to Excel-compatible format
          const subDataRows = this.dataofexisting.sub_data.map((item: any) => ({
            type_check: item.type_check,
            observation: item.observation || '',
            duff_values: item.duff_values || '',
            comments: item.comments || ''
          }));
        
          // Create a workbook with both parent data and subdata rows
          const finalData = [
            ...parentData, // Add parent data to the top
            [], // Empty row for spacing between parent and subdata
            { type_check: 'Sub Data', value: '' }, // Optional header for subdata section
            ...subDataRows // Add subdata rows
          ];
        
          // Create worksheet and workbook
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(finalData, {
            header: ['type_check', 'value', 'observation', 'duff_values', 'comments'],
            skipHeader: false
          });
        
          const workbook: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
          // Convert workbook to binary and trigger download
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const dataBlob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        
            FileSaver.saveAs(dataBlob, this.dataofexisting.product_name + '_export_' + new Date().getTime() +  '.xlsx');
        }
      }
  

        
  

