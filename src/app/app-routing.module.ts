import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProcessPageComponent } from './process-page/process-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StampDutyDashboardComponent } from './stamp-duty-dashboard/stamp-duty-dashboard.component';
import { ViewQCDataComponent } from './view-qcdata/view-qcdata.component';
import { PreCheckingComponent } from './pre-checking/pre-checking.component';
import { UlipPrecheckingComponent } from './ulip-prechecking/ulip-prechecking.component';
import { QueryComponent } from './query/query.component';
import { BulkApprovalComponent } from './bulk-approval/bulk-approval.component';
import { BulkPassFailComponent } from './bulk-pass-fail/bulk-pass-fail.component';
import { DuelistPassFailComponent } from './duelist-pass-fail/duelist-pass-fail.component';
import { DuelistApprovalComponent } from './duelist-approval/duelist-approval.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ExistingProductComponent } from './existing-product/existing-product.component';
import { ProductMisComponent } from './product-mis/product-mis.component';
import { MisReportComponent } from './mis-report/mis-report.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchAllDataComponent } from './fetch-all-data/fetch-all-data.component';
import { TabledashboardComponent } from './tabledashboard/tabledashboard.component';
import { VALUATIONComponent } from './valuation/valuation.component';
import { ChooseDashboardComponent } from './choose-dashboard/choose-dashboard.component';
import { DefectTrackerComponent } from './defect-tracker/defect-tracker.component';
import { ValuationDataComponent } from './valuation-data/valuation-data.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { MISComponent } from './mis/mis.component';
import { MISDashboardComponent } from './misdashboard/misdashboard.component';
import { MisModuleComponent } from './mis-module/mis-module.component';
import { MenuPageComponent } from './mis-graph-ac/menu-page/menu-page.component'
import { MisGraphComponent } from './mis-graph/mis-graph.component';
import { MainValuationComponent } from './main-valuation/main-valuation.component';
import { AllModuleGraphComponent } from './all-module-graph/all-module-graph.component';
import { ValSummaryComponent } from './val-summary/val-summary.component';
import { AllSummaryComponent } from './all-summary/all-summary.component';
import { ProjectTrackerComponent } from './project-tracker/project-tracker.component';
import { ValuationMisComponent } from './valuation-mis/valuation-mis.component';
import { ValuationDashboardComponent } from './valuation-dashboard/valuation-dashboard.component';
import { MonthOnMonthComponent } from './month-on-month/month-on-month.component';
import { MBoundarydashComponent } from './mboundarydash/mboundarydash.component';
import { BoundarysComponent } from './boundarys/boundarys.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'mis',
  component : MISComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  { path: 'home', pathMatch: 'full', redirectTo: 'login' },
  {
    path: '',
    component: LayoutComponent,
    // canActivateChild: [AuthGuard],
    children: [
      // {
      //   path: 'dq-dashboard',
      //   component: DqDashboardPageComponent

      // },
      // {
      //   path: 'dq-date-range',
      //   component: DqDateRangeComponent

      // },
      {
        // path: 'dashboard',
        // component: DashboardComponent,
		    path: 'dashboard-page',
        component: DashboardPageComponent, 
      },
      {
        path: '',
        //component: DashboardComponent,
        component: DashboardPageComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'process',
        component: ProcessPageComponent
      },
      {
        path:'change-password',
        component: ChangePasswordComponent
      },
      {
        path:'stampduty-dashboard',
        component:  StampDutyDashboardComponent
      },
      {
        path:'view-qcdata',
        component:  ViewQCDataComponent
      },
      {
        path: 'prechecking-dashboard',
        component: PreCheckingComponent
      },
      {
        path: 'ulip-prechecking-dashboard',
        component: UlipPrecheckingComponent
      },
      {
        path: 'claim-dashboard',
        component: QueryComponent
      },
      {
        path: 'bulk-approval-dashboard',
        component: BulkApprovalComponent
      },
      {
        path: 'pass-fail-approval',
        component: BulkPassFailComponent
      },
      {
        path: 'duelist-dashboard',
        component: DuelistPassFailComponent
      },
      {
        path: 'duelist-approval',
        component: DuelistApprovalComponent
      },
      {
        path: 'mis-report',
        component: MisReportComponent
      },
      {
		    path: 'product-dashboard',
        component: ProductDashboardComponent, 
      },
      {
		    path: 'new-product',
        component: NewProductComponent, 
      },
      {
        path:'existing-product',
        component:ExistingProductComponent
      },
      {
        path:'product-mis',
        component:ProductMisComponent
      },
      {
        path:'fetch-data',
        component: FetchDataComponent

      },
      {
        path: 'fetch-all-data',
        component: FetchAllDataComponent
      },
      {
        path:'tabledashboard',
      component:TabledashboardComponent
      },
      {
        path:'VALUATION',
        component:VALUATIONComponent
      },
      {
        path:'ChooseDashboardComponent',
        component:ChooseDashboardComponent
      },
      {
        path:'DefectTracker',
      component:DefectTrackerComponent
      },
      {
        path:'valuation-data',
      component : ValuationDataComponent
      },
      {
        path:'update-data',
      component : UpdateDataComponent
      },
      // {
      //   path:'mis',
      // component : MISComponent
      // },
      {
        path:'mis-Dashboard',
      component : MISDashboardComponent
      },
      {
        path:'Mis-Module',
      component : MisModuleComponent
      },
      {
        path:'Mis-Module-Ac',
      component : MenuPageComponent
      },
      {
        path:'mis-graph',
      component : MisGraphComponent
      },
      {
        path:'main-valuation',
        component:MainValuationComponent
      },
      {
        path:'all-module-graph',
        component:AllModuleGraphComponent
      },
      {
        path: 'val-summary',
        component: ValSummaryComponent
      },
      {
        path: 'All-Summary',
        component: AllSummaryComponent
      },
      {
        path: 'Project-Tracker',
        component: ProjectTrackerComponent
      },
      {
        path: 'Val-Mis',
        component:ValuationMisComponent
      },
      {
        path: 'Val-Dashboard',
        component: ValuationDashboardComponent
      },
      {
        path: 'Val-MonthOnMonth',
        component:MonthOnMonthComponent
      },
      {
        path:'Mboundry',
        component:MBoundarydashComponent
      },
      {
        path: 'boundarys',
        component:BoundarysComponent
      }

    ]
  }
  /*{
    path: 'process',
    component: ProcessPageComponent
  },
  */
 /*
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
	  path:'change-password',
	  component: ChangePasswordComponent
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
