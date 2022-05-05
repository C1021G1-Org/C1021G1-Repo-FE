import {Component, Inject, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Ticket} from "../model/ticket";
import {TicketDTO} from "../model/TicketDTO";

@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.css']
})
export class DeleteTicketComponent implements OnInit {

  ticketId: number;
  tickets: any;
  nameTicket: any;
  id: any;

  constructor(public dialogRef: MatDialogRef<DeleteTicketComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ticketService: TicketService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.ticketId = data;
  }

  ngOnInit(): void {
    this.tickets = this.data.data1.codeTicket;
    this.nameTicket = this.data.data1.buyerTicket;
    this.id = this.data.data1.idTicket;
  }

  deleteTicket() {
    this.ticketService.getDeleteTicket(this.id).subscribe(() => {
    }, () => {
      this.snackBar.open('Delete Faild!', 'OK');
    }, () => {
      this.dialogRef.close();
      this.snackBar.open('Delete Successfully!', 'OK');
      this.router.navigateByUrl('');
    });
  }
}
