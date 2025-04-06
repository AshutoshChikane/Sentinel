import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchDataProcessService {

  constructor( private httpClient : HttpClient ) { }

  ngOnInIt() {
  }


  public fetchData (data){
    console.log('inside fetchData DQ')
    let url = '/core/fetchData';
    // let url="../../assets/summaryrider.json"
    // let url="../../assets/dataQuality.json"
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      // params: processDetails
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , data, options ); //TODO remove comments
  }
  

  

  
  
}
