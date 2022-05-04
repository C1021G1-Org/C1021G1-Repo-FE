import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { CreateReportComponent } from './create-report/create-report.component';
import { StatisticComponent } from './statistic/statistic.component';


@NgModule({
  declarations: [CreateReportComponent, StatisticComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
