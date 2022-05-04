import {Component, OnInit} from '@angular/core';
import {Ticket} from "../model/ticket";
import {TicketService} from "../ticket.service";

@Component({
  selector: 'app-list-history-ticket',
  templateUrl: './list-history-ticket.component.html',
  styleUrls: ['./list-history-ticket.component.css']
})
export class ListHistoryTicketComponent implements OnInit {
  ticketHistoryList: Ticket[];
  p = 1;
  totalPage: number;
  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.getHistoryTicketByCustomerId();
  }

  getHistoryTicketByCustomerId() {
    this.ticketService.getHistoryTicketByCustomerId(1).subscribe(value => {
      this.ticketHistoryList = value
    }, error => {
      console.log(error)
    }, () => {
      console.log("lấy list ticket thành công")
    })
  }



}
