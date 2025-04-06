// Copyright (C) 2019-2020 NSEIT Limited, Mumbai. All rights reserved.
//
// This program and the accompanying materials are made available
// under the terms described in the LICENSE file which accompanies
// this distribution. If the LICENSE file was not attached to this
// distribution or for further clarifications, please contact
// legal@nseit.com.
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userType = '';
  userName='';

  // misReportDate : any;
  // updateDateTime() {
  //   interval(1000).pipe(
  //     map(() => formatDate(new Date(), "dd/MM/yyyy", "en"))
  //   ).subscribe(date => {
  //     this.misReportDate = date;
  //     console.log(date, "continue");
      
  //   });
  // }

  constructor(private router: Router, private login :LoginService) {
  }

  ngOnInit() {
    
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(user);
    let userName_ = sessionStorage.getItem('userName');
    //console.log(JSON.stringify( userName_))
    // sessionStorage.setItem('userType', userType);
    let userType_ = sessionStorage.getItem('userType');
    
    console.log('layout :: user >>', user, userType_ );
    console.log('layout :: userNAme >>', user, userName_);

    if ( userType_ || userName_) {
      this.userType = userType_; 
      this.userName = userName_;

    }
    else {
      this.userType = 'Profile'; 
      this.userName =  sessionStorage.getItem('userName');   
    }
    console.log('layout :: userType >>', this.userType);


    // this.updateDateTime();
  }

  logout() {
  }

  gotoPage(pageName: string) {
    var userid= localStorage.getItem  ('userid' )
    this.login.logout( this.userName ).subscribe(data=>{
      console.log(this.userName)
      this.router.navigate([pageName]);
    })
    
  }



  //   @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: any) {
  //   event.preventDefault();
  //   if (confirm('Are you sure you want to reload?')) {
  //     window.location.reload();
  //   }
  // }
  
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // event.preventDefault();
    navigator.sendBeacon('https://nonpayoutcheckval.sbilife.co.in/core/logout', this.userName); // Sends logout request
  }
}
