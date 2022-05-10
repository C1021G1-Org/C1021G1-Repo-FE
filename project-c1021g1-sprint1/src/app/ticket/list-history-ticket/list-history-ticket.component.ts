import {Component, OnInit} from '@angular/core';
import {Ticket} from "../model/ticket";
import {TicketService} from "../ticket.service";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-list-history-ticket',
  templateUrl: './list-history-ticket.component.html',
  styleUrls: ['./list-history-ticket.component.css']
})
export class ListHistoryTicketComponent implements OnInit {
  ticketHistoryList: Ticket[];
  indexPagination: number = 0;
  totalPagination: number;
  sortedData: Ticket[];

  fightFrom: string;
  fightTo: string;


  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.getHistoryTicketByCustomerId();


  }

  getHistoryTicketByCustomerId() {
    this.ticketService.getHistoryTicketByCustomerId(1, 0).subscribe(value => {
      this.ticketHistoryList = value.content;
      this.totalPagination = value['totalPages'];
      console.log("lấy list ticket thành công")
      if ((this.ticketHistoryList.length % 5) != 0) {
        this.totalPagination = (Math.round((this.ticketHistoryList.length / 5) + 1))
      }
    })
  }

  //SonNH Phân trang
  getTicketPerPage(pageNumber: number) {

    this.ticketService.getHistoryTicketByCustomerId(1, pageNumber).subscribe((data: any) => {
      console.log(this.ticketHistoryList)
      console.log('no search')
      this.ticketHistoryList = data.content;
      this.totalPagination = data['totalPages']
    });
  }

  firtPage() {
    this.indexPagination = 0;
    this.ngOnInit();
  }

  nextPage() {
    if (this.indexPagination < this.totalPagination - 1) {
      this.indexPagination++;
      console.log(this.indexPagination)
      this.getTicketPerPage(this.indexPagination);
    } else {
      console.log('het trang nextPage')
    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination--;
      console.log(this.indexPagination)
      this.getTicketPerPage(this.indexPagination);
    } else {
      console.log('het trang  previous')
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination - 1;
    console.log(this.totalPagination)
    this.getTicketPerPage(this.indexPagination);
  }



}

