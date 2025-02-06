import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectTrackerService } from '../Service/project-tracker.service';
import { request } from 'http';
import { JsontoexcelService } from '../Service/jsontoexcel.service';


@Component({
  selector: 'app-project-tracker',
  templateUrl: './project-tracker.component.html',
  styleUrls: ['./project-tracker.component.scss']
})
export class ProjectTrackerComponent implements OnInit {


  myForm: FormGroup;
  updateForm: FormGroup;
  showForm: boolean = false;
  existing: boolean = false;
  displayMessage: boolean = false;
  UpdatedData: boolean = false;
  added: boolean = false;
  Exist: boolean = false
  getEditData: any;
  Searchbox:boolean=false;
  backBefore:boolean = true;
  backAfter:boolean = false
  developerOptions: string[] = [];
  statusOptions: string[] = [];
  filteredData: any[] = [];
  selectDeveloper: string = '';
  selectStatus: string = '';
  ExportExcel:boolean = false;


  // Enhancement: any;
  // Requirement: any;
  // Module: any;
  // StartDate: any;
  // CompletionDate: any;
  // Tat: any;
  // Changes_Enhancement: any;
  // Comments: any;
  // EmpName: any;
  // QC_Person: any;
  // Developer: any;
  // Status: any;
  // Val_Data: any;
  constructor(private router: Router, private fb: FormBuilder, private projectTracker: ProjectTrackerService,
    public Export: JsontoexcelService  ) {
      
      }
  



  ngOnInit(): void {

    this.myForm = this.fb.group({
      Enhancement: ['', Validators.required],
      Requirement: ['', Validators.required],
      Module: ['', Validators.required],
      StartDate: ['', [Validators.required, this.dateValidator] ],
      // CompletionDate: [''],
      // Tat: [''],
      // Changes_Enhancement: ['', Validators.required],
      Comments: ['', Validators.required],
      EmpName: ['', Validators.required],
      QC_Person: ['', Validators.required],
      Developer: ['', Validators.required],
      Status: ['', Validators.required],
      Val_Data: ['', Validators.required],
      
    });





    // ----------------------------------------------update--------------------

    this.projectTracker.getMessage().subscribe(result => {
      this.getEditData = result;
      console.log(this.getEditData.id, "getEditData");


      this.updateForm = this.fb.group({
        Id :[this.getEditData.id],
        Enhancement: [this.getEditData.NEW_ENHANCEMENT, Validators.required],
        Requirement: [this.getEditData.PROJECT_REQUIREMENT, Validators.required],
        Module: [this.getEditData.MODULE, Validators.required],
        StartDate: [this.getEditData.START_DATE, Validators.required,],
        CompletionDate: [this.getEditData.COMPLETION_DATE, Validators.required],
        Tat: [this.getEditData.TAT, Validators.required],
        // Changes_Enhancement: [this.getEditData.CHANGES_ENHANCEMENT, Validators.required],
        Comments: [this.getEditData.COMMENTS, Validators.required],
        EmpName: [this.getEditData.REQUEST_BY, Validators.required],
        QC_Person: [this.getEditData.QC_PERSON, Validators.required],
        Developer: [this.getEditData.DEVELOPER, Validators.required],
        Status: [this.getEditData.STATUS, Validators.required],
        Val_Data: [this.getEditData.DATA_QUALITY_VALUTION, Validators.required],
        moduleId: "406",
        request_action: "Project Tracker - Update"
      });

      console.log(this.updateForm, "UpdateValue");

    });


    this.added = true;
    this.Exist = true;


  }


  notification: any;
  isError;


  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (control.value && !datePattern.test(control.value)) {
      return { 'invalidDate': true };
    }
    return null;
  }
  
  onSubmit() {
    if (this.myForm.valid ) {
      const formData = this.myForm.value;
      console.log(formData, "formdata");
      let obj = {
        Enhancement: formData.Enhancement,
        Requirement:formData.Requirement,
        Module : formData.Module,
        StartDate : formData.StartDate,
        // Changes_Enhancement : formData.Changes_Enhancement,
        Comments : formData.Comments,
        EmpName : formData.EmpName,
        QC_Person : formData.QC_Person,
        Developer : formData.Developer,
        Status : formData.Status,
        Val_Data : formData.Val_Data,
        moduleId: "404",
      request_action: "Project Tracker - ADD"
      }

      this.projectTracker.addData(obj).subscribe(result => {
        this.myForm.reset();
        this.notification = "Data Added Successfully ";
        setTimeout(() => (this.notification = undefined), 2000);
        console.log(result, "response");
      },
        error => {
          console.error('Error occurred:', error);
          this.notification = "Data not Submit.";
          setTimeout(() => (this.notification = undefined), 2000);
          this.isError = true;
        });
    }
    else {
      this.myForm.markAllAsTouched();
    }
  }



  add() {
    this.showForm = true;
    this.displayMessage = false;
    this.existing = false;
    this.Searchbox = false;
    this.ExportExcel = false;
    // this.myForm.reset();
  }

  Data: any
  message: any;
  messageType : any;
  messageDetails: any;
  showOverlay:boolean = false;
  


  Existing() {
    this.existing = true;
    this.Searchbox = true;
    this.showForm = false;
    this.showOverlay = true;
    this.ExportExcel = false
    let obj = {
      moduleId: "405",
      request_action: "Project Tracker - Existing"
    }
    this.projectTracker.existingData(obj).subscribe(result => {
      console.log(result.response_text, "existing");
      this.Data = result.response_text || [];
      this.displayMessage = true;
      this.message = result.response_message;
      this.messageType = 'Information Message :  ';
      this.isError = true
      this.showOverlay= false;
      this.ExportExcel = true

      this.developerOptions = this.getDeveloperValues();
      this.statusOptions = this.getStatusValues();
      this.filteredData = [...this.Data];
      
    },
    error => {
      console.error('Error occurred:', error);
      this.displayMessage= true;
      this.messageType = 'Error Message :  ';
        this.message= 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  '+ error.statusText; 
    }
  )
  }


  getDeveloperValues(): string[] {
    const uniqueValues = new Set<string>(this.Data.map(item => item.DEVELOPER));
    return Array.from(uniqueValues);
  }

  getStatusValues(): string[] {
    const uniqueValues = new Set<string>(this.Data.map(item => item.STATUS));
    return Array.from(uniqueValues);
  }

  filterTable() {
    this.filteredData = this.Data.filter(item => {
      const matchesDeveloper = this.selectDeveloper ? item.DEVELOPER === this.selectDeveloper : true;
      console.log(matchesDeveloper, "matchesDeveloper");
      
      const matchesStatus = this.selectStatus ? item.STATUS === this.selectStatus : true;
      console.log(matchesStatus, "matchesStatus");
      return matchesDeveloper && matchesStatus;
    });
  }







  EditData(EditData: any) {
    console.log(EditData, "EditData")
    this.backBefore = false;
    this.backAfter = true;
    this.UpdatedData = true;
    this.existing = false;
    this.Searchbox = false;
    this.added = false;
    this.Exist = false;
    this.ExportExcel =false;
    this.projectTracker.setMessage(EditData);

  }




  Update() {
    if (this.updateForm.valid) {
      const UpdatedFormData = this.updateForm.value
      this.projectTracker.Updated(UpdatedFormData).subscribe(result => {
        // this.updateForm.reset();
        this.notification = "Data Updated Successfully";
        setTimeout(() => (this.notification = undefined), 3000 );
        console.log(result, "response");
        // this.router.navigate(['ChooseDashboardComponent']);

      },
        error => {
          console.error('Error occurred:', error);
          this.notification = "Data not Updated"
          this.isError = true
          setTimeout(() => (this.notification = undefined), 2000);
        });

    }
    else {
      this.updateForm.markAllAsTouched();
    }
  }

  delete(item){
    this.showOverlay = true
    
    const id = item.id;
    let obj = {
      moduleId :"407",
      request_action: "Project Tracker - Delete",
      ID: id
    }
    console.log(obj, "dete");
    this.projectTracker.Delete(obj).subscribe(res => {
        alert("Deleted successfully");
        this.Data = this.Data.filter(dataItem => dataItem !== item);

      },
      error => {
        console.error("Error deleting item:", error);
      }),
      this.showOverlay = false;
    }
    
  

  backPage() {
    this.router.navigate(['ChooseDashboardComponent']);
  }

  backAfterPage() {
    this.added = true;
    this.Exist = true;
    this.backBefore = true;
    this.backAfter = false;
    this.existing = false;
    this.Searchbox = false;
    this.UpdatedData = false
    
  }

  showMessage() {
    this.displayMessage = false;
    // this.router.navigate(['ChooseDashboardComponent']);
  }

  //searchText : any;
  export(){
    this.Export.exportAsExcelFile(this.filteredData, 'Project-Tracker');

    // this.searchText = '';

  }




  

}
