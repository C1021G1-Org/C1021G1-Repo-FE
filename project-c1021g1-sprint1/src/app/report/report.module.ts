import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { CreateReportComponent } from './create-report/create-report.component';
import { StatisticComponent } from './statistic/statistic.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [CreateReportComponent, StatisticComponent],
  exports: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule
  ]
})
export class ReportModule { }
