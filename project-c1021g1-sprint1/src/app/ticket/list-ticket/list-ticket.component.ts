import {Component, OnInit} from '@angular/core';
import {Ticket} from "../model/ticket";
import {TicketService} from "../ticket.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteTicketComponent} from "../delete-ticket/delete-ticket.component";
import {TicketDTO} from "../model/TicketDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  indexPagination: number = 0;

  totalPagination: number;

  tickets: TicketDTO[] = [];

  listTicketNotPagination: TicketDTO[] = [];


  constructor(private ticketService: TicketService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.ticketService.getAllTicket(0).subscribe(data => {
      this.tickets = data['content'];
      this.totalPagination = data['totalPages'] - 1;
      // console.log('  this.totalPagination: ' + this.totalPagination)
    });
    // this.ticketService.getAllTicketNotPagination().subscribe((data: Ticket[]) => {
    //   this.listTicketNotPagination = data['content'];
    //   if ((this.listTicketNotPagination.length % 5) != 0) {
    //     this.totalPagination = (Math.round(this.listTicketNotPagination.length / 5)) + 1;
    //   }
    // })
  }

  searchTicket(value: string, value2: string, page = 0) {
    this.ticketService.search(value, value2, page).subscribe(data => {
        this.tickets = data['content'];
        this.indexPagination = 0;
        this.totalPagination = data['totalPages'] - 1;
        this.snackBar.open("Tìm kiếm thành công!", 'OK', {
          duration: 2000
        })
      },
      () => {
        this.snackBar.open("Không tìm thấy!", 'Error', {
          duration: 2000
        })
      })

  }

  // <<
  firstPage(option: string, keyword: string) {
    this.indexPagination = 0;
    this.searchTicket(option, keyword);
  }

  // >
  nextPage(option: string, keyword: string) {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    } else {
      this.ticketService.search(option, keyword, this.indexPagination).subscribe(data => {
        this.tickets = data['content'];
      })
    }
  }

  // <
  previousPage(option: string, keyword: string) {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination < 0) {
      this.indexPagination = 0;
      this.ngOnInit();
    } else {
      this.ticketService.search(option, keyword, this.indexPagination).subscribe(data => {
        this.tickets = data['content'];
      })
    }
  }

  // >>
  lastPage(option: string, keyword: string) {
    this.indexPagination = this.totalPagination;
    this.ticketService.search(option, keyword, this.totalPagination).subscribe(data => {
      this.tickets = data['content'];
    })
  }

  deleteTicket(id) {
    this.ticketService.getTicketById(id).subscribe(data => {
      const dialogRef = this.dialog.open(DeleteTicketComponent, {
        width: '780px',
        data: {data1: data}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  };


}
