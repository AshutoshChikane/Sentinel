import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-dashboard',
  templateUrl: './choose-dashboard.component.html',
  styleUrls: ['./choose-dashboard.component.scss']
})
export class ChooseDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(user);
    let userName_ = sessionStorage.getItem('userName');
    let userType_ = sessionStorage.getItem('userType');

    console.log('layout :: user >>', user, userType_ );
    console.log('layout :: userNAme >>', user, userName_);
  }

  DataQuality(){
    this.router.navigate(['dashboard-page']);

  }
  DefectTracker(){
    this.router.navigate(['DefectTracker']);

  }
  VALUATION(){
    this.router.navigate(['main-valuation'])
  }

  ProjectTracker(){
    this.router.navigate(['Project-Tracker'])
  }
}
