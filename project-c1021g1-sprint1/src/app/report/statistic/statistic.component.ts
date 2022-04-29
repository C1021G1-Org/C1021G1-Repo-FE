import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import {ReportService} from "../report.service";
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  select1 = '';
  select2 = '';
  private option : any;
  private chart: any;
  selectShape: any;
  nameEmployee: any;

  startMonth: number;
  endMonth: number;

  constructor(private reportServiceService: ReportService) { }

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

   if (this.selectShape == 1){
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
   }else{
    this.reportServiceService.getAllReportEmployee().subscribe(value =>{
      console.log(value +"dsgdg")
      for (let i = 0; i < value.length; i++){
        if (Number(value[i].monthEmployee)){
          this.startMonth = Number(value[i].sumPoint)
          this.nameEmployee = String(value[i].name_employee)
          console.log(this.startMonth);
          console.log(this.nameEmployee);
          this.chart = {
            chart: {
              type: 'bar'
            },
            title: {
              text: 'Stacked bar chart'
            },
            // xAxis: {
            //   categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            // },
            yAxis: {
              min: 0,
              title: {
                text: 'Total fruit consumption'
              }
            },
            legend: {
              reversed: true
            },
            plotOptions: {
              series: {
                stacking: 'normal'
              }
            },
            series: [
              {
                name: [this.nameEmployee[0],this.nameEmployee[1]],
                data: [this.startMonth[0],this.startMonth[1]]
              }
            ]
          };


        }
      }

      Highcharts.chart('chart',this.chart);
    })

   }


  }

}
