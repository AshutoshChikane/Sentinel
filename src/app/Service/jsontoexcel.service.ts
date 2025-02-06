import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as _  from 'lodash';
import { HttpClient } from '@angular/common/http';
import { ngxCsv } from 'ngx-csv';
import { parse } from 'json2csv';



const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class JsontoexcelService {
 
 

  constructor( private http:HttpClient) { }
  
// Function for export file from json to xlsx 
  public exportAsExcelFile(json: any[], excelFileName: string): void {
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
   
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    console.log('saveAsExcelFile ::: filename ==',fileName);
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


// Function for export file from json to csv 

  public exportAsCSVFile(json: any[], excelFileName: string): void {
      var options = { 
      fieldSeparator: ',',
      // quoteStrings: '"',
      // decimalseparator: '.',
      // showLabels: false, 
      // showTitle: false,
      // title: '',
      // useBom: true,
      noDownload: true,
      headers :[]
      
    };
    var abc = new ngxCsv(json, excelFileName , options);
    const csv = convertToCSV(json);
    var exportedFileName = excelFileName + '.csv' || 'export.csv';
    
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const convert = navigator as any
    if (convert.msSaveBlob) {
      convert.msSaveBlob(blob, exportedFileName);
    }
    else {
      var link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      console.log(link)
    }
  }



  // public exportAsJSONFile(data: any[], fileName: string): void {

  // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([this.jsonData]);
  // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // // Save the workbook as an Excel file
  // XLSX.writeFile(wb, 'output.xlsx');

  // }




  }
  

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr)

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')

}




