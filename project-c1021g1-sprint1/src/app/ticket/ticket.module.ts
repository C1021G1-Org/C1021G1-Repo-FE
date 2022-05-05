import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { PaymentTicketComponent } from './payment-ticket/payment-ticket.component';
import { ListHistoryTicketComponent } from './list-history-ticket/list-history-ticket.component';
import { PrintTicketComponent } from './print-ticket/print-ticket.component';
import { DeleteTicketComponent } from './delete-ticket/delete-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { DetailTicketComponent } from './detail-ticket/detail-ticket.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [ListTicketComponent, EditTicketComponent, PaymentTicketComponent, ListHistoryTicketComponent, PrintTicketComponent, DeleteTicketComponent, CreateTicketComponent, DetailTicketComponent],
    imports: [
        CommonModule,
        TicketRoutingModule,
        NgxPaginationModule,
        FormsModule,
        MatDialogModule
    ]
})
export class TicketModule { }
