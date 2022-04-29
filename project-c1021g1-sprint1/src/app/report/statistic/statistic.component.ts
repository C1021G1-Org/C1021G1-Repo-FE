import { Component, OnInit } from '@angular/core';
import {ReportServiceService} from "../service/report-service.service";
import * as Highcharts from "highcharts";
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  select1 = '';
  select2 = '';
  private option : any;

  startMonth: number;
  endMonth: number;

  constructor(private reportServiceService: ReportServiceService) { }

  ngOnInit(): void {
  }


  reportStatistic() {
    console.log('selec1' + this.select1)
    console.log('selec1' + this.select2)
    for (let i = 1; i <= 12; i++) {
      if (this.select1 == '' + i + '') {
        this.startMonth = i;
      }
      if (this.select2 == '' + i + '') {
        this.endMonth = i;
      }
    }
    console.log("dfd" + this.startMonth);
    console.log("enđat" + this.endMonth);
    const currentDate = new Date();

    this.reportServiceService.getAllReport().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        switch (Number(data[i].monthStartDate)) {
          case this.startMonth:
            this.startMonth = Number(data[i].totalPrice);
            break;
          case this.endMonth:
            this.endMonth = Number(data[i].totalPrice);
            break;
        }
      }
      this.option = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Danh thu vé máy bay tháng ' + (currentDate.getMonth() + 1)
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [
            {
              name: 'Tháng' + this.select1,
              y: this.startMonth
            }
            , {
              name: 'Tháng' + this.select2,
              y: this.endMonth
            }
          ]
        }]
      };
      Highcharts.chart('container', this.option);
    });
  }
}
