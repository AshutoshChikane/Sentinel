import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataQualityMisService } from '../Service/data-quality-mis.service';
import { Module } from 'module';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-all-module-graph',
  templateUrl: './all-module-graph.component.html',
  styleUrls: ['./all-module-graph.component.scss']
})
export class AllModuleGraphComponent implements OnInit {

  ModuleName: any;
  Pass_case: any;
  Fail_case: any;
  chart1: any = null;
  allModule: string = "allModule"
  Module: string;
  Day: string = 'Daily1';
  week: string = 'Weekly1';
  DropdownPassFail: any;
  QCloder: boolean;

  constructor(private mis: DataQualityMisService, private router: Router, private dataQ: DataQualityMisService) {
    localStorage.getItem('Day')
    console.log(localStorage.getItem('Day'));
    localStorage.getItem('week')
    console.log(localStorage.getItem('week'));
    // data.REPORT_NAME
    localStorage.getItem('data')
    console.log(localStorage.getItem('data'))
    this.Module = localStorage.getItem('data');
    console.log(" this.Module", this.Module);

  }

  ngOnInit(): void {
    this.sendData("data");
this.viewAllModule();
  }

dropdown1: any;
dropdown2: any;


sendData(data: any): void {
  this.QCloder = true;
    // console.log(data, "Send values");
    this.dropdown1 =  data.dropdown1;
    this.dropdown2 = data.dropdown2;
    
    //  console.log(this.dropdown1,this.dropdown2, "drop");
     let obj = {
      moduleId: '503',
      request_action: 'ViewAllModule',
      dropdown1 :data.dropdown1,
    dropdown2 :data.dropdown2
    }
    this.mis.AllModule(obj).subscribe((result) =>{
console.log(result, "resultttttttttttttt")
this.QCloder = false;
    })
    
     

}

viewAllModule(){
  this.QCloder = true;
    let obj = {
      moduleId: '503',
      request_action: 'all-modules',
    }

    this.mis.AllModule(obj).subscribe((res: any) => {
      this.ModuleName = res.response_text[0].ModuleName;
      this.Pass_case = res.response_text[0].Module_Pass;
      this.Fail_case = res.response_text[0].Module_Fail;
      this.DropdownPassFail = res.response_text[0].Cases;
      this.QCloder = false;
      
      // const result1 = this.DropdownPassFail.filter(s => s.includes(data.dropdown1));
      // const result = this.DropdownModule.filter(s => s.includes(data.dropdown2));
      // console.log(result1, result, "result");




      if (this.chart1) {
        this.chart1.destroy();
      }
    
      var ctx = document.getElementById("canvas") as HTMLCanvasElement;
      this.chart1 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.ModuleName,
          datasets: [{
            label: 'PASS',
            data: this.Pass_case,
            backgroundColor: 'lightblue'
          },
          {
            label: 'FAIL',
            data: this.Fail_case,
            backgroundColor: 'lightpink',
          }
          ]
        },
        options: {
          title: {
            display: true,
            position: 'bottom',
            fontSize: 15
          },
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              stacked: true,

            }],
            yAxes: [{
              stacked: true,
            }],

          },
          responsive: true,
          maintainAspectRatio: false,
        },

      });
    })
  }


  redirectPage() {
    localStorage.setItem('Day', this.Day);
    console.log(localStorage.getItem('Day'));
    localStorage.setItem('week', this.week);
    console.log(localStorage.getItem('week'));
    this.router.navigate(['/Mis-Module'])

  }

}
