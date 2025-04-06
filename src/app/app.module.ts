import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './shared.module';
import { MessageDialog } from './dialog/message/message.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { KatexModule } from 'ng-katex';
import { MatPaginatorModule } from '@angular/material/paginator';
import {HttpRequestInterceptor} from './http-request-interceptor';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProcessPageComponent } from './process-page/process-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
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
import { ExistingProductComponent } from './existing-product/existing-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductMisComponent } from './product-mis/product-mis.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MisReportComponent } from './mis-report/mis-report.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchAllDataComponent } from './fetch-all-data/fetch-all-data.component';
import { TabledashboardComponent } from './tabledashboard/tabledashboard.component';
import { VALUATIONComponent } from './valuation/valuation.component';
import { ChooseDashboardComponent } from './choose-dashboard/choose-dashboard.component';
import { DefectTrackerComponent } from './defect-tracker/defect-tracker.component';
import { DefectPipe } from './defect-tracker/defect.pipe';
import { ValuationDataComponent } from './valuation-data/valuation-data.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { MISComponent } from './mis/mis.component';
import { MISDashboardComponent } from './misdashboard/misdashboard.component';
import { MisModuleComponent } from './mis-module/mis-module.component';
import { MisGraphComponent } from './mis-graph/mis-graph.component';
import { MainValuationComponent } from './main-valuation/main-valuation.component';
import { MispipePipe } from './mis-graph/mispipe.pipe';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AllModuleGraphComponent } from './all-module-graph/all-module-graph.component';
import { ValSummaryComponent } from './val-summary/val-summary.component';
import { AllSummaryComponent } from './all-summary/all-summary.component';
import { ProjectTrackerComponent } from './project-tracker/project-tracker.component';
import { ValuationMisComponent } from './valuation-mis/valuation-mis.component';
import { ValuationDashboardComponent } from './valuation-dashboard/valuation-dashboard.component';
import { MonthOnMonthComponent } from './month-on-month/month-on-month.component';
import { MBoundarydashComponent } from './mboundarydash/mboundarydash.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BoundarysComponent } from './boundarys/boundarys.component';
import { SummarytablesComponent } from './summarytables/summarytables.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    MessageDialog,
    DashboardPageComponent,
    ProcessPageComponent,
    ChangePasswordComponent,
    StampDutyDashboardComponent,
    ViewQCDataComponent,
    PreCheckingComponent,
    UlipPrecheckingComponent,
    QueryComponent,
    BulkApprovalComponent,
    BulkPassFailComponent,
    DuelistPassFailComponent,
    DuelistApprovalComponent,
    ProductDashboardComponent,
    ExistingProductComponent,
    NewProductComponent,
    ProductMisComponent,
    MisReportComponent,
    FetchDataComponent,
    FetchAllDataComponent,
    TabledashboardComponent,
    VALUATIONComponent,
    ChooseDashboardComponent,
    DefectTrackerComponent,
    DefectPipe,
    ValuationDataComponent,
    UpdateDataComponent,
    MISComponent,
    MISDashboardComponent,
    MisModuleComponent,
    MisGraphComponent,
    MainValuationComponent,
    MispipePipe,
    AllModuleGraphComponent,
    ValSummaryComponent,
    AllSummaryComponent,
    ProjectTrackerComponent,
    ValuationMisComponent,
    ValuationDashboardComponent,
    MonthOnMonthComponent,
    MBoundarydashComponent,
    BoundarysComponent,
    SummarytablesComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatToolbarModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MaterialFileInputModule,
    MatGridListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatSortModule,
    MatProgressBarModule,
    KatexModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    // BackButtonDisableModule.forRoot({
    //   preserveScrollPosition: true,
  
    // })
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageDialog
  ]
})
export class AppModule {
}
