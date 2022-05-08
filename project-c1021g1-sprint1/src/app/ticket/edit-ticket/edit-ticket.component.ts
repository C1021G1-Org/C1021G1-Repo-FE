import { Component, OnInit } from '@angular/core';
import {TicketService} from "../ticket.service";
import {ITicket} from "../model/ticket/i-ticket";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  id;
  ticket: ITicket;
  day1: string;
  month1: string;
  year1: string;
  time1: string;
  datetime1: string;

  constructor(private ticketService: TicketService,
              private router: Router,
              private activatedRouted: ActivatedRoute
              ) {}
  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe(data => {
      this.id = data.get('id');
      this.ticketService.getTicketById(this.id).subscribe(data => {
        this.ticket = data
        this.year1 = (this.ticket.seat.flightSeat.dateStart).slice(0, 4);
        this.month1 = (this.ticket.seat.flightSeat.dateStart).slice(5, 7);
        this.day1 = (this.ticket.seat.flightSeat.dateStart).slice(8, 10);
        this.time1 = (this.ticket.seat.flightSeat.dateStart).slice(11, this.ticket.seat.flightSeat.dateStart.length);
        this.datetime1 = this.day1 + "-" + this.month1 + "-" + this.year1 + " " + this.time1;
        console.log(this.datetime1)
        this.editTicketForm.setValue(this.ticket);
      })
    });
  }



  editTicketForm = new FormGroup( {
    id: new FormControl(),
    buyerTicket : new FormControl('', [Validators.required ,Validators.minLength(10)]),
    emailTicket: new FormControl('',[Validators.required, Validators.email]),
    phoneTicket: new FormControl(""),
    genderTicket: new FormControl(""),
    statusTicket:  new FormControl(""),
    priceTicket:  new FormControl(""),
    delFlagTicket:  new FormControl(""),
    pointTicket :  new FormControl(""),
    birthdayTicket:  new FormControl(""),
    codeTicket: new FormControl(""),
    seat: new FormControl(""),
    customer: new FormControl("")

  });

  public getTicket() {
    this.ticketService.getTicketById(this.id).subscribe(value =>
      console.log(value)
    )
  };

  public editTicket() {
        this.ticketService.editTicketById(this.id, this.editTicketForm.value).subscribe(value => {
          console.log(this.editTicketForm.value);
          console.log(this.datetime1)
        });
    }
}

