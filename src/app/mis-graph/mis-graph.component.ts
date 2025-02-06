import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { DataQualityMisService } from '../Service/data-quality-mis.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { Console, error } from 'console';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-mis-graph',
  templateUrl: './mis-graph.component.html',
  styleUrls: ['./mis-graph.component.scss']
})
export class MisGraphComponent implements OnInit {

  misReportDate = formatDate(new Date(), "dd/MM/yyyy", "en");
  Weekly: boolean;
  Daily: boolean;
  Monthly: boolean;
  daygraph: any;
  report_name: any;
  ctx: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>;
  Day: string = 'Daily1';
  week: string = 'Weekly1';

  toppings = new FormControl();
  displayMessage: boolean;
  QCloder: boolean;
  Module_date: any;



  constructor(private router: Router, private mis: DataQualityMisService, private http: HttpClient, public es: JsontoexcelService) {

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

  chart1: any = null;
  myChart: any = null;
  myChart1: any = null;
  myChart2: any = null;
  // chartData: any = null;
  // myChart5: any = null;
  DropdownData: any;
  Module: any;
  TransDate: any;
  Total_Cases: any;
  Pass_Cases: any;
  Fail_Cases: any
  Pass_Fail_Value: any;
  Json_Data: any;
  Pass_Value: any;
  Fail_Value: any;
  DATA: any;
  moduleName: any;
  pass: any;
  fail: any;
  date_wise: any;
  Date_pass: any;
  Date_fail: any;
  DateList: any;
  openConfirmationBox: boolean = false;
  messagePopup: any;
  searchText: any;
  Sub_ModuleName;
  Sub_ModuleData;
  dropdown_Month: any;
  Download: any;
  MainDash :boolean= false;
  MonthDash:boolean= false;
  Redirect: boolean = false;
  ook: boolean = false;
  count: any;

  ngOnInit(): void {

    this.dashboard();
    // this.Selection('Today');
    // this.MainDash = true;


  }

  // filteredData: any[] = [];
  // Selection(selectedModule: string): void {

  //   if (this.Download) {
  //     this.filteredData = this.Download.filter(item => item.Current === selectedModule);
  //     console.log(this.filteredData, "fffffffffffffffff");
  //     this.updateBarChart(this.filteredData);

  //   }

  // }

  // product(data1: any){
  //   console.log("hiii data", data1)
  //   this.mayur = data1
  //   this.updateBarChart(this.filteredData);

  //     }


  Selection(selectedModule: string): void {
    this.MainDash = false
    this.MonthDash= true;
    this.QCloder = true
    console.log(selectedModule, "i am ")
    let obj = {
      Module: this.Module,
      moduleId: 505,
      Month: selectedModule,
      request_action: 'misgraph'
    }
    this.mis.DQgraph(obj).subscribe((json_data: any) => {
console.log(json_data, "object")



  console.log('data.. coming soon', json_data.response_text[0]);
  this.Json_Data = json_data.response_text[0]

  if(this.Json_Data === undefined || null ){
    this.openConfirmationBox = true;
    this.messagePopup = json_data.response_message;
    this.ook =false;
    this.Redirect = true
  }
  else{
  this.DateList = this.Json_Data.DateList
  console.log(this.DateList);

  // this.Download = json_data.response_text;
    this.Download = json_data.response_text[0];

  // this.Selection('Today');


  this.dropdown_Month = this.Json_Data.Last_Months;
  console.log(this.dropdown_Month, "this.dropdown_Month");

  this.openConfirmationBox = true;
  this.messagePopup = json_data.response_message;
  this.Redirect = false;
  this.ook =true
  this.QCloder = false;
  // this.updateBarChart(this.filteredData);


  // -------------------------mayur-------------------------------------
  this.Module_date = this.Json_Data.Module_date;
  this.TransDate = this.Json_Data.TransDate;
  this.Total_Cases = this.Json_Data.Total;
  this.Pass_Cases = this.Json_Data.Pass_Cases;
  this.Fail_Cases = this.Json_Data.Fail_Cases;
  if(this.Fail_Cases == 0){
    this.count = true;
  }
  else{
    this.count = false;
  }

  if (this.myChart) {
    this.myChart.destroy();
  }
  const piePassValue = this.Json_Data.Pass_Cases;
  const pieFailValue = this.Json_Data.Fail_Cases;

  var ctx2 = document.getElementById("pie-chart") as HTMLCanvasElement;
  this.myChart = new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['PASS', 'FAIL'],
      datasets: [{
        data: [piePassValue, pieFailValue],
        backgroundColor: ["lightblue", "lightpink"],
      }],


    },
    options: {
      animation: {
        onComplete: function () {
          const chartInstance = this.chart;
          const ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '9px Arial';
      
          this.data.datasets.forEach((dataset, i) => {
            const meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach((element, index) => {
              const angle = element._model.startAngle + (element._model.endAngle - element._model.startAngle) / 2;
              const radius = element._model.innerRadius + (element._model.outerRadius - element._model.innerRadius) / 2;
              const xPos = element._model.x + (Math.cos(angle) * radius);
              const yPos = element._model.y + (Math.sin(angle) * radius);
      
              const data = dataset.data[index];
              if (data !== null) {
                ctx.fillText(data, xPos, yPos);
              }
            });
          });
        }
      },
      
      legend: {
        display: true,
        position: 'right',
        align: "end"
      },
      title: {
        display: true,
        text: this.Module + ' ('+this.TransDate +')',
        position: 'bottom',
        fontSize: 12,
        padding: 0,

      },

      responsive: true,
      maintainAspectRatio: false,
    }
  });





  if (this.chart1) {
    this.chart1.destroy();
  }
  const passValue = this.Json_Data.Total_Month_Pass;
  const failValue = this.Json_Data.Total_Month_Fail;

  var ctx1 = document.getElementById('barChartData') as HTMLCanvasElement;
  this.chart1 = new Chart(ctx1, {

    type: 'bar',

    data: {
      labels: ['PASS', 'FAIL'],
      datasets: [{
        data: [passValue, failValue],
        backgroundColor: ['lightblue', 'lightpink']
      }],

    },

    options: {

      animation: {
        onComplete: function () {
          const chartInstance = this.chart;
          const ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.font = '10px Arial';

          ctx.textBaseline = 'top'; 
          this.data.datasets.forEach((dataset, i) => {
            const meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach((bar, index) => {
              const data = dataset.data[index];
              if (data !== null) {
                const xPos = bar._model.x;
                const yPos = bar._model.y;
                ctx.fillText(data, xPos, yPos - 7);
              }
            });
          });
        }
      },
      
       title: {
        display: true,
        text: this.Module + "(For the month)",
        position: 'bottom',
        fontSize: 12,
        padding: 0
      },
      legend: {
        display: false,
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




  if (this.myChart1) {
    this.myChart1.destroy();
  }

  const Sub_ModuleName = this.Json_Data.Product_Id;
  const Sub_ModuleData = this.Json_Data.Product_data;

  var ctx4 = document.getElementById('chart-sub') as HTMLCanvasElement;
  this.myChart1 = new Chart(ctx4, {
    type: 'bar',

    data: {
      labels: Sub_ModuleName,
      datasets: [
        //   {
        //   label: this.DATA[0],
        //   data: this.SubModData,
        //   backgroundColor: 'lightblue'
        // },
        {
          label: 'FAIL',
          data: Sub_ModuleData,
          backgroundColor: 'lightpink',
          // barThickness: 1,
        }
      ]
    },

    options: {
      animation: {
        onComplete: function () {
          const chartInstance = this.chart;
          const ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.font = '9px Arial';
  
          this.data.datasets.forEach((dataset, i) => {
            const meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach((bar, index) => {
              const data = dataset.data[index];
              if (data !== null) {
                const xPos = bar._model.x;
                const yPos = bar._model.y;
                ctx.fillText(data, xPos, yPos - 5); // Adjust the offset for label position
              }
            });
          });
        }
      },

      title: {
        display: true,
        text: this.Module + ' ('+this.TransDate +')',
        position: 'bottom',
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

        if (this.myChart2) {
      this.myChart2.destroy();
    }

      const date_wise = this.Json_Data.Date_wise;
const Date_fail = this.Json_Data.Date_fail;

var ctx4 = document.getElementById('Chart') as HTMLCanvasElement;
this.myChart2 = new Chart(ctx4, {
  type: 'bar',

  data: {
    labels: date_wise,

    datasets: [
      //   {
      //   label: this.DATA[0],
      //   data: this.Date_pass,
      //   backgroundColor: 'lightblue'
      // },
      {
        label: 'FAIL',
        data: Date_fail,
        backgroundColor: 'lightpink',

      }
    ]
  },

  options: {
    animation: {
      onComplete: function () {
        const chartInstance = this.chart;
        const ctx = chartInstance.ctx;
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font = '9px Arial';

        this.data.datasets.forEach((dataset, i) => {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const data = dataset.data[index];
            if (data !== null) {
              const xPos = bar._model.x;
              const yPos = bar._model.y;
              ctx.fillText(data, xPos, yPos - 5); // Adjust the offset for label position
            }
          });
        });
      }
    },
    title: {
      display: true,
      text: this.Module + " ( Transaction date wise ) ",
      position: 'bottom',
      fontSize: 12
    },
    legend: {
      display: true,
      // position: 'right'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          fontSize: 10
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          fontSize: 9
        }
      }],

    },
    responsive: true,
    maintainAspectRatio: false,
  },
});





  }

    })
  }


  dashboard() {
    this.MainDash = true
    this.MonthDash= false;

    // let url='/core/misgraph';
    this.QCloder = true
    let obj = {
      Module: this.Module,
      moduleId: 502,
date: this.misReportDate,
      request_action: 'misgraph'
    }
    // Fetch JSON data
    this.mis.DQgraph(obj).subscribe((json_data: any) => {
      
      console.log('data.. coming soon', json_data.response_text[0]);
      this.Json_Data = json_data.response_text[0]
      if(this.Json_Data === undefined || null ){
        this.openConfirmationBox = true;
        this.messagePopup = json_data.response_message;
        this.Redirect = true;
        this.ook =false
      }
      else{
      this.DateList = this.Json_Data.DateList
      console.log(this.DateList);

      // this.Download = json_data.response_text;
      this.Download = json_data.response_text[0];
      // this.Selection('Today');


      this.dropdown_Month = this.Json_Data.Last_Months;
      console.log(this.dropdown_Month, "this.dropdown_Month");

      this.openConfirmationBox = true;
      this.messagePopup = json_data.response_message;
      this.QCloder = false;
      this.Redirect = false;
       this.ook =true
      // this.updateBarChart(this.filteredData);


      // -------------------------mayur-------------------------------------

      this.Module_date = this.Json_Data.Module_date
      this.TransDate = this.Json_Data.TransDate
      this.Total_Cases = this.Json_Data.Total;
      this.Pass_Cases = this.Json_Data.Pass_Cases;
      this.Fail_Cases = this.Json_Data.Fail_Cases;
      // alert(this.Fail_Cases)
      if(this.Fail_Cases == 0){
        this.count = true;
      }
      else{
        this.count = false;
      }

      if (this.myChart) {
        this.myChart.destroy();
      }
      const piePassValue = this.Json_Data.Pass_Cases;
      const pieFailValue = this.Json_Data.Fail_Cases;

      var ctx2 = document.getElementById("pie-chart") as HTMLCanvasElement;
      this.myChart = new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: ['PASS', 'FAIL'] ,
          datasets: [{
            data: [piePassValue, pieFailValue],
            backgroundColor: ["lightblue", "lightpink"],
          }],


        },
        options: {
          animation: {
            onComplete: function () {
              const chartInstance = this.chart;
              const ctx = chartInstance.ctx;
              ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = '9px Arial';
          
              this.data.datasets.forEach((dataset, i) => {
                const meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach((element, index) => {
                  const angle = element._model.startAngle + (element._model.endAngle - element._model.startAngle) / 2;
                  const radius = element._model.innerRadius + (element._model.outerRadius - element._model.innerRadius) / 2;
                  const xPos = element._model.x + (Math.cos(angle) * radius);
                  const yPos = element._model.y + (Math.sin(angle) * radius);
          
                  const data = dataset.data[index];
                  if (data !== null) {
                    ctx.fillText(data, xPos, yPos);
                  }
                });
              });
            }
          },
          
          
          
          legend: {
            display: true,
            position: 'right',
            align: "end"
          },
          title: {
            display: true,
            text: this.Module + ' ('+this.TransDate +')',
            position: 'bottom',
            fontSize: 12,
            padding: 0,

          },

          responsive: true,
          maintainAspectRatio: false,
        }
      });





      if (this.chart1) {
        this.chart1.destroy();
      }
      const passValue = this.Json_Data.Total_Month_Pass;
      const failValue = this.Json_Data.Total_Month_Fail;

      var ctx1 = document.getElementById('barChartData') as HTMLCanvasElement;
      this.chart1 = new Chart(ctx1, {

        type: 'bar',

        data: {
          labels: ['PASS', 'FAIL'],
          datasets: [{
            data: [passValue, failValue],
            backgroundColor: ['lightblue', 'lightpink']
          }],

        },

        options: {
          animation: {
            onComplete: function () {
              const chartInstance = this.chart;
              const ctx = chartInstance.ctx;
              ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              ctx.font = '10px Arial';

              ctx.textBaseline = 'top'; 
              this.data.datasets.forEach((dataset, i) => {
                const meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                  const data = dataset.data[index];
                  if (data !== null) {
                    const xPos = bar._model.x;
                    const yPos = bar._model.y;
                    ctx.fillText(data, xPos, yPos - 7);
                  }
                });
              });
            }
          },
          
          title: {
            display: true,
            text: this.Module + "(For the month)",
            position: 'bottom',
            fontSize: 12,
            padding: 0
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              stacked: true,

            }],
            yAxes: [{
              stacked: true,
            }],
          },
          plugins: {
            datalabels: {
              anchor: 'center',
              align: 'center',
              color: 'pink',
              formatter: (value, context) => {
                return value; // Display the value of the bar
              }
            }
          },

          responsive: true,
          maintainAspectRatio: false,

        },

      });




      if (this.myChart1) {
        this.myChart1.destroy();
      }

      const Sub_ModuleName = this.Json_Data.Product_Id;
      const Sub_ModuleData = this.Json_Data.Product_data;

      var ctx4 = document.getElementById('chart-sub') as HTMLCanvasElement;
      this.myChart1 = new Chart(ctx4, {
        type: 'bar',

        data: {
          labels: Sub_ModuleName,
          datasets: [
            //   {
            //   label: this.DATA[0],
            //   data: this.SubModData,
            //   backgroundColor: 'lightblue'
            // },
            {
              label: 'FAIL',
              data: Sub_ModuleData,
              backgroundColor: 'lightpink',
              // barThickness: 1,
            }
          ]
        },

        options: {
          animation: {
            onComplete: function () {
              const chartInstance = this.chart;
              const ctx = chartInstance.ctx;
              ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              ctx.font = '9px Arial';
      
              this.data.datasets.forEach((dataset, i) => {
                const meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                  const data = dataset.data[index];
                  if (data !== null) {
                    const xPos = bar._model.x;
                    const yPos = bar._model.y;
                    ctx.fillText(data, xPos, yPos - 5); // Adjust the offset for label position
                  }
                });
              });
            }
          },

          title: {
            display: true,
            text: this.Module + ' ('+this.TransDate +')',
            position: 'bottom'
          },
          legend: {
            display: true,
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





            if (this.myChart2) {
          this.myChart2.destroy();
        }

          const date_wise = this.Json_Data.Date_wise;
    const Date_fail = this.Json_Data.Date_fail;

    var ctx4 = document.getElementById('Chart') as HTMLCanvasElement;
    this.myChart2 = new Chart(ctx4, {
      type: 'bar',

      data: {
        labels: date_wise,

        datasets: [
          //   {
          //   label: this.DATA[0],
          //   data: this.Date_pass,
          //   backgroundColor: 'lightblue'
          // },
          {
            label: 'FAIL',
            data: Date_fail,
            backgroundColor: 'lightpink',

          }
        ]
      },

      options: {
        animation: {
          onComplete: function () {
            const chartInstance = this.chart;
            const ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.font = '9px Arial';
    
            this.data.datasets.forEach((dataset, i) => {
              const meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                const data = dataset.data[index];
                if (data !== null) {
                  const xPos = bar._model.x;
                  const yPos = bar._model.y;
                  ctx.fillText(data, xPos, yPos - 5); // Adjust the offset for label position
                }
              });
            });
          }
        },
        title: {
          display: true,
          text: this.Module + " ( Transaction date wise ) ",
          position: 'bottom',
          fontSize: 12
        },
        legend: {
          display: true,
          // position: 'right'
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              fontSize: 10
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              fontSize: 9
            }
          }],

        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    }
    // ,
    // (error)=> {
    //   console.log( error.messageType)
      
    }
    
    );


  }

  // updateBarChart( data:any ): void {
  //   console.log(data , "data is updated")
  //   this.Module_date = data[0].Module_date
  //   this.Module = data[0].Module; //yes


  //   if(data[0].Current === "Today"){
  //   this.Total_Cases = data[0].Total;
  //   this.Pass_Cases = data[0].Pass_Cases;
  //   this.Fail_Cases = data[0].Fail_Cases;
  //   }
  //   else{
  //   this.Total_Cases = data[0].Total_Month;
  //   this.Pass_Cases = data[0].Total_Month_Pass;
  //   this.Fail_Cases = data[0].Total_Month_Fail;
  //   }

  //   this.openConfirmationBox = true;


  //     //-------------------------------------Bar chart------------------------------------------------

  //   if (this.chart1) {
  //     this.chart1.destroy();
  //   }

  //   if (!data || data.length === 0) {
  //     return;
  //   }

  //   const passValue = data[0].Total_Month_Pass;
  //   const failValue = data[0].Total_Month_Fail;

  //   var ctx1 = document.getElementById('barChartData') as HTMLCanvasElement;
  //   this.chart1 = new Chart(ctx1, {

  //     type: 'bar',

  //     data: {
  //       labels: ['PASS', 'FAIL'],
  //       datasets: [{
  //         data: [passValue, failValue ],
  //         backgroundColor: ['lightblue', 'lightpink']
  //       }],

  //     },

  //     options: {
  //       title: {
  //         display: true,
  //         text: data[0].Module + "(MONTH)",
  //         position: 'bottom',
  //         fontSize: 12,
  //         padding: 0
  //       },
  //       legend: {
  //         display: false,
  //       },
  //       scales: {
  //         xAxes: [{
  //           stacked: true,

  //         }],
  //         yAxes: [{
  //           stacked: true,
  //         }],
  //       },

  //       responsive: true,
  //       maintainAspectRatio: false,

  //     },

  //   });

  //   //-------------------------------------PIE------------------------------------------------

  //   if (this.myChart) {
  //     this.myChart.destroy();
  //   }

  //   if (!data || data.length === 0) {
  //     return;
  //   }
  // if(data[0].Current === "Today"){
  //   const piePassValue = data[0].Pass_Cases;
  //   const pieFailValue = data[0].Fail_Cases;

  //   var ctx2 = document.getElementById("pie-chart") as HTMLCanvasElement;
  //   this.myChart = new Chart(ctx2, {
  //     type: 'pie',
  //     data: {
  //       labels: ['PASS', 'FAIL'],
  //       datasets: [{
  //         data: [piePassValue, pieFailValue],
  //         backgroundColor: ["lightblue", "lightpink"],
  //       }],


  //     },
  //     options: {
  //       legend: {
  //         display: true,
  //         position: 'right',
  //         align: "end"
  //       },
  //       title: {
  //         display: true,
  //         text: this.Module ,
  //         position: 'bottom',
  //         fontSize: 12,
  //         padding: 0,

  //       },

  //       responsive: true,
  //       maintainAspectRatio: false,
  //     }
  //   });
  // }
  // else{
  //   const Total_Month_Pass = data[0].Total_Month_Pass;
  //   const Total_Month_Fail = data[0].Total_Month_Fail;

  //   var ctx2 = document.getElementById("pie-chart") as HTMLCanvasElement;
  //   this.myChart = new Chart(ctx2, {
  //     type: 'pie',
  //     data: {
  //       labels: ['PASS', 'FAIL'],
  //       datasets: [{
  //         data: [Total_Month_Pass, Total_Month_Fail],
  //         backgroundColor: ["lightblue", "lightpink"],
  //       }],


  //     },
  //     options: {
  //       legend: {
  //         display: true,
  //         position: 'right',
  //         align: "end"
  //       },
  //       title: {
  //         display: true,
  //         text: this.Module ,
  //         position: 'bottom',
  //         fontSize: 12,
  //         padding: 0,

  //       },

  //       responsive: true,
  //       maintainAspectRatio: false,
  //     }
  //   });
  // }


  //   //------------------------------------Module wise -------------------------------------------

  //   if (this.myChart1) {
  //     this.myChart1.destroy();
  //   }

  //   if (!data || data.length === 0) {
  //     return;
  //   }

  //   const Sub_ModuleName = data[0].Sub_ModuleName;
  //   const Sub_ModuleData = data[0].Sub_ModuleData;

  //   var ctx4 = document.getElementById('chart-sub') as HTMLCanvasElement;
  //   this.myChart1 = new Chart(ctx4, {
  //     type: 'bar',

  //     data: {
  //       labels: Sub_ModuleName,
  //       datasets: [
  //         //   {
  //         //   label: this.DATA[0],
  //         //   data: this.SubModData,
  //         //   backgroundColor: 'lightblue'
  //         // },
  //         {
  //           label: 'FAIL',
  //           data: Sub_ModuleData,
  //           backgroundColor: 'lightpink',
  //           // barThickness: 1,
  //         }
  //       ]
  //     },

  //     options: {

  //       title: {
  //         display: true,
  //         text: this.Module,
  //         position: 'bottom'
  //       },
  //       legend: {
  //         display: true
  //       },
  //       scales: {
  //         xAxes: [{
  //           stacked: true,            
  //         }],
  //         yAxes: [{
  //           stacked: true,

  //         }],
  //       },
  //       responsive: true,
  //       maintainAspectRatio: false,

  //     },

  //   });


  //   //------------------------------------------Date wise -------------------------------------------


  //   if (this.myChart2) {
  //     this.myChart2.destroy();
  //   }

  //   if (!data || data.length === 0) {
  //     return;
  //   }

  //   const date_wise = data[0].Date_wise;
  //   const Date_fail = data[0].Date_fail;

  //   var ctx4 = document.getElementById('Chart') as HTMLCanvasElement;
  //   this.myChart2 = new Chart(ctx4, {
  //     type: 'bar',

  //     data: {
  //       labels: date_wise,

  //       datasets: [
  //         //   {
  //         //   label: this.DATA[0],
  //         //   data: this.Date_pass,
  //         //   backgroundColor: 'lightblue'
  //         // },
  //         {
  //           label: 'FAIL',
  //           data: Date_fail,
  //           backgroundColor: 'lightpink',

  //         }
  //       ]
  //     },

  //     options: {
  //       title: {
  //         display: true,
  //         text: this.Module,
  //         position: 'bottom',
  //         fontSize: 12
  //       },
  //       legend: {
  //         display: true,
  //         // position: 'right'
  //       },
  //       scales: {
  //         xAxes: [{
  //           stacked: true,
  //           ticks: {
  //             fontSize: 10
  //           }
  //         }],
  //         yAxes: [{
  //           stacked: true,
  //           ticks: {
  //             fontSize: 9
  //           }
  //         }],

  //       },
  //       responsive: true,
  //       maintainAspectRatio: false,
  //     },
  //   });


  //   // ------------------------------Product wise----------------------------------------------


  // }


  redirectPage() {

    localStorage.setItem('Day', this.Day);
    console.log(localStorage.getItem('Day'));
    localStorage.setItem('week', this.week);
    console.log(localStorage.getItem('week'));
    this.router.navigate(['/Mis-Module'])

  }


  showAlert(response: any) {
    this.openConfirmationBox = false;
  }

  showMessage() {
    this.displayMessage = false;
  }


  


  exportAsCSV() {
    console.log(this.Download, "down");
    // this.flattenData();
    // this.es.exportAsCSVFile(this.Download, 'Download');

    // this.es.exportAsExcelFile(this.Download, 'Download');

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.flattenData());
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    XLSX.writeFile(workbook, 'exported_data.xlsx');
    
    
  }


  flattenData(): any[] {
  const flattenedData = [];

  for (let i = 0; i < this.Download.Date_wise.length; i++) {
    if (i < this.Download.Date_fail.length) {
      const row = {
        Module_date: i === 0 ? this.Download.Module_date : '',
        Module: i === 0 ? this.Download.Module : '',
        Total: i === 0 ? this.Download.Total : '',
        Fail_Cases: i === 0 ? this.Download.Fail_Cases : '',
        Pass_Cases: i === 0 ? this.Download.Pass_Cases : '',
        Total_Month: i === 0 ? this.Download.Total_Month : '',
        Total_Month_Pass: i === 0 ? this.Download.Total_Month_Pass : '',
        Total_Month_Fail: i === 0 ? this.Download.Total_Month_Fail : '',
        Date_wise: this.Download.Date_wise[i],
        Date_fail: this.Download.Date_fail[i],
        Product_Id: this.Download.Product_Id[i],
        Product_data: this.Download.Product_data[i],
        Last_Months: this.Download.Last_Months[i],
      };

      flattenedData.push(row);
    }
  }

  return flattenedData;
}

}


