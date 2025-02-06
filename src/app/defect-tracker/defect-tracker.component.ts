import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DefectTrackerService } from '../Service/defect-tracker.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-defect-tracker',
  templateUrl: './defect-tracker.component.html',
  styleUrls: ['./defect-tracker.component.scss']
})
export class DefectTrackerComponent implements OnInit {
  message: string;
  openConfirmationBox: boolean;
  showMessageButton: boolean;
  displayMessage: boolean;
  registration: any;
  isSubmitted: boolean;
  data: any;
  Data: any;
  misTable: boolean;
  // DataQuality:boolean=false;
  




  constructor(private router: Router, private fb: FormBuilder, private defect: DefectTrackerService, private excelService: JsontoexcelService) {
    // this.Existing();
  }
  defectform = false;
  displayedColumns: any;
  ngOnInit(): void {

    // this.defectform = false;
    // this.existingtable = false;
    // this.misTable = false;

    this.registration = this.fb.group({
      ID: ['', [Validators.required]],
      MONTH: ['', [Validators.required]],
      VAL_DQ_IRDA: ['', [Validators.required]],
      WHIZIBLE: ['', [Validators.required]],
      DEPT: ['', [Validators.required]],
      // CATEGORY: ['', [Validators.required]],
      SYSTEM: ['', [Validators.required]],
      ASPECT: ['', [Validators.required]],
      ULIP_NONULIP_GRPS_VIP: ['', [Validators.required]],
      PRODUCT_ID_COVERED: ['', [Validators.required]],
      STATUS_OF_WHIZIBLE: ['', [Validators.required]],
      ISSUES_IN_DETAIL: ['', [Validators.required]],
      IMPACTED_POLICIES: ['', [Validators.required]],
      SAMPLE_POL_CUST_ID: ['', [Validators.required]],
      AMOUNT_IMPACTED: ['', [Validators.required]],
      REASON_FOR_CLOSING: ['', [Validators.required]],
      DOR_TO_OPS_IT: ['', [Validators.required]],
      REMARKS: ['', [Validators.required]],
      FY: ['', [Validators.required]],
      RESOURCE: ['', [Validators.required]],
      DATE_CLOSURE: ['', [Validators.required]],
      SEVERITY :['', [Validators.required]],
      TYPEOF:['', [Validators.required]]
    })

    
    // this.Existing()
  }

  
  


  backPage() {
    this.router.navigate(['ChooseDashboardComponent']);
  }

  

  ADD() {
    this.defectform = true;
    this.existingtable = false;
    this.misTable = false;

  }

  ID: any;
  MONTH: any;
  VAL_DQ_IRDA: any;
  WHIZIBLE_ID: any;
  DEPT_RESPOSIBLE: any;
  // CATEGORY: any;
  SYSTEM: any;
  ASPECT: any;
  ULIP_NONULIP_GRPS_VIP: any;
  PRODUCT_ID_COVERED: any;
  STATUS_OF_WHIZIBLE: any;
  ISSUES_IN_DETAIL: any;
  IMPACTED_POLICIES: any;
  SAMPLE_POL_CUST_ID: any;
  AMOUNT_IMPACTED: any;
  REASON_FOR_CLOSING: any;
  DOR_TO_OPS_IT: any;
  REMARKS: any;
  FY: any;
  RESOURCE: any;
  DATE_CLOSURE: any;
  SEVERITY : any;
  TYPEOF: any;
  searchText: any;
  Export: boolean= false

  submit() {

    this.registration.value;
    console.log(this.registration.value);
    this.isSubmitted = true;
    let obj = {
      ID: this.ID,
      MONTH: this.MONTH,
      VAL_DQ_IRDA: this.VAL_DQ_IRDA,
      WHIZIBLE_ID: this.WHIZIBLE_ID,
      DEPT_RESPOSIBLE: this.DEPT_RESPOSIBLE,
      // CATEGORY: this.CATEGORY,
      SYSTEM: this.SYSTEM,
      ASPECT: this.ASPECT,
      ULIP_NONULIP_GRPS_VIP: this.ULIP_NONULIP_GRPS_VIP,
      PRODUCT_ID_COVERED: this.PRODUCT_ID_COVERED,
      STATUS_OF_WHIZIBLE: this.STATUS_OF_WHIZIBLE,
      ISSUES_IN_DETAIL: this.ISSUES_IN_DETAIL,
      IMPACTED_POLICIES: this.IMPACTED_POLICIES,
      SAMPLE_POL_CUST_ID: this.SAMPLE_POL_CUST_ID,
      AMOUNT_IMPACTED: this.AMOUNT_IMPACTED,
      REASON_FOR_CLOSING: this.REASON_FOR_CLOSING,
      DOR_TO_OPS_IT: this.DOR_TO_OPS_IT,
      REMARKS: this.REMARKS,
      FY: this.FY,
      RESOURCE: this.RESOURCE,
      DATE_CLOSURE: this.DATE_CLOSURE,
      SEVERITY: this.SEVERITY,
      TYPEOF:this.TYPEOF,
      moduleId: '401',
      request_action: 'Defect Tracker',

    }

    this.defect.defectdata(obj).subscribe(res => {
      console.log('submit data')
      console.log("res", res)

      console.log("res", res.response_message)

      this.message = res.response_message;
      this.openConfirmationBox = true;
      this.showMessageButton = true;
      this.displayMessage = true;


    })
    this.ID = "";
    this.MONTH = "";
    this.VAL_DQ_IRDA = "";
    this.WHIZIBLE_ID = "";
    this.DEPT_RESPOSIBLE = "";
    // this.CATEGORY = "";
    this.SYSTEM = "";
    this.ASPECT = "";
    this.ULIP_NONULIP_GRPS_VIP = "";
    this.PRODUCT_ID_COVERED = "";
    this.STATUS_OF_WHIZIBLE = "";
    this.ISSUES_IN_DETAIL = "";
    this.IMPACTED_POLICIES = "";
    this.SAMPLE_POL_CUST_ID = "";
    this.AMOUNT_IMPACTED = "";
    this.REASON_FOR_CLOSING = "";
    this.DOR_TO_OPS_IT = "";
    this.REMARKS = "";
    this.FY = "";
    this.RESOURCE = "";
    this.DATE_CLOSURE = "";
    this.SEVERITY = "";
    this.TYPEOF = ";"

  }

  table_data: any;
  existingtable: any
  valDqIrdaOptions: string[] = [];
  filteredData: any[] = [];
  whizibleStatusOptions:string[] = []

  Existing() {
    this.misTable = false
    this.existingtable = true;
    this.defectform = false;
    let obj = {

      moduleId: '402',
      request_action: 'Defect Tracker',
    }
    this.defect.defecttable(obj).subscribe(res => {
      console.log('submit data');
      console.log('res', res);
      console.log('res', res.response_text);
      this.Data = res.response_text || [];
      this.message = res.response_message;
      this.displayMessage = true;
      this.Export = true;


      // console.log(res.response_text.DOR_TO_OPS_IT)
      this.valDqIrdaOptions = this.getUniqueValDqIrdaValues();
      this.whizibleStatusOptions= this.getUniquewhizibleStatusValues();
      this.filteredData = [...this.Data];


      console.log(this.Data)

    },
    (error) =>{
      alert("404 Not Found")
    }
  )

  }

  getUniqueValDqIrdaValues(): string[] {
    const uniqueValues = new Set<string>(this.Data.map(item => item.VAL_DQ_IRDA))
    return Array.from(uniqueValues);
  }

  getUniquewhizibleStatusValues(): string[]{
    const unique = new Set<string>(this.Data.map(item => item.STATUS_OF_WHIZIBLE_ID));
    return Array.from(unique);
  }

  selectedValDqIrda: string = '';
  selectedWhizibleStatus:string = '';

  filterTable() {
    this.filteredData = this.Data.filter(item => {
      const matchesValDqIrda = this.selectedValDqIrda ? item.VAL_DQ_IRDA === this.selectedValDqIrda : true;
      const matchesWhizibleStatus = this.selectedWhizibleStatus ? item.STATUS_OF_WHIZIBLE_ID === this.selectedWhizibleStatus : true;
      return matchesValDqIrda && matchesWhizibleStatus;
    });
  }
  
  

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.filteredData, 'table_data');
    // console.log(this.table_data);
     
    this.searchText = '';
  }

  showMessage() {
    this.displayMessage = false;
  }


  get f() {
    return this.registration.controls;
  }


  onEdit(ID: any, data: any) {
    console.log(ID, "id");
    console.log(data, "data");
    this.defect.setMessage(ID, data)
    this.router.navigate(['update-data']);
  }


  // downloadFile(): void {
  //   this.excelService.getFinancialYear().subscribe((response:any) => {
  //     // let fileName = response.headers.get('Content-Disposition')?.split(';')[1].split('=')[1];
  //     let fileName = 'Annual_report';
  //     let blob:Blob = response.body as Blob;
  //     let a = document.createElement('a');
  //     a.download = fileName;
  //     a.href = window.URL.createObjectURL(blob);
  //     a.click();
  //   })
  // }
  AGEING  : any ;
  OPEN_LESS_THAN_10 : any ;
  OPEN_BETWEEN_11_30 : any ;
  OPEN_GREATER_THAN_30 : any ;
  CLOSE_LESS_THAN_10 : any ;
  CLOSE_BETWEEN_11_30 : any ;
  CLOSE_GREATER_THAN_30 : any ;

  Aging() {
    // this.router.navigate(['mis'])
    this.misTable = true
    this.existingtable = false;
    this.defectform = false;
    let obj = {
      moduleId: '403',
      request_action: 'Defect Tracker',
    }
    this.defect.misTable(obj).subscribe(res => {
      console.log('submit data')
      console.log('res', res);
      console.log('res text', res.response_text);
      // console.log('res', res.response_text.DQ);

      this.data = res.response_text;
      this.message = res.response_message;
      this.displayMessage = true;

    })
  }

  Render(){
    this.router.navigate(['mis']);
  }
  
}
