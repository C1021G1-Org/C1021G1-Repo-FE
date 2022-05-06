import {Component, OnInit} from '@angular/core';
import {TicketService} from "../ticket.service";
import {Ticket} from "../model/ticket";
import {MatDialog} from "@angular/material/dialog";
import {AbortTicketComponent} from "../abort-ticket/abort-ticket.component";
import {MatSnackBar} from "@angular/material/snack-bar";

declare var paypal: any;


@Component({
  selector: 'app-payment-ticket',
  templateUrl: './payment-ticket.component.html',
  styleUrls: ['./payment-ticket.component.css']
})
export class PaymentTicketComponent implements OnInit {
  ticketList: Ticket[];

  indexPagination: number = 0;
  totalPagination: number;

  // SonNH Trạng thái button paypal
  isPaypalLoad: Boolean = false;

  // SonNH list mã ticket cần thanh toán
  listTicketToPay: any[] = [];

  //SonNH mã ticket thêm vào list ticket cần thanh toán
  codeTicketToAdd: string;


  totalPrice: number;
  finalPrice: number;

  ticket: Ticket;

  priceForEachTicket: number;

  constructor(private ticketService: TicketService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.getALlTicketByCustomerId();
  }

  getALlTicketByCustomerId() {
    this.ticketService.getAllTicketByCustomerId(1,0).subscribe(value => {
      this.ticketList = value.content;
      this.totalPagination = value['totalPages'];
      if ((this.ticketList.length/5)!=0){
        this.totalPagination = (Math.round((this.ticketList.length/5)+1))
      }
      console.log(this.totalPagination)

    })
  }

  //Hiển thị dialog hủy thanh toán
  abortTicket(codeTicket: string) {
    const dialog = this.dialog.open(AbortTicketComponent, {
      width: "700px",
      data: codeTicket
    })
    dialog.afterClosed().subscribe(value => {

      this.ngOnInit();

    })
  }

  codeTicketTopay: string;


  //SonNH gọi dịch vụ thanh toán
  private totalpr: any;
  private pric: any;


  callPaypal() {
    this.getTotalPrice();
    if (this.isPaypalLoad == false) {
      this.isPaypalLoad = true;
      let t = this;
      paypal.Button.render({
        // Configure environment
        env: 'sandbox',
        client: {
          sandbox: 'demo_sandbox_client_id',
          production: 'demo_production_client_id'
        },
        // Customize button (optional)
        locale: 'en_US',
        style: {
          size: 'small',
          color: 'gold',
          shape: 'rect',
        },
        commit: true,
        // SonNH Set up a payment
        payment: function (data, actions) {
          return actions.payment.create({
            transactions: [{
              amount: {
                total: t.finalPrice,
                currency: 'USD'
              }
            }]
          });
        },
        // Execute the payment
        onAuthorize: function (data, actions) {
          return actions.payment.execute().then(function () {
            // Show a confirmation message to the buyer
            t.pay();
            t.getALlTicketByCustomerId();
            t.snackBar.open("Thanh toán thành công!", "Xác nhận", {
              duration: 3000
            });

            t.sendEmailConfirmPayment();
          });
        }
      }, '#paypal-button')
    }


  }

  //SonNh thêm ticket để thanh toán

  addTicketToPay(element, codeTicket: string) {
    console.log(element.checked)
    if (!this.listTicketToPay.includes(codeTicket) && element.checked) {
      console.log("Khi chọn ticket")
      console.log(codeTicket)
      this.codeTicketToAdd = codeTicket;
      this.listTicketToPay.push(this.codeTicketToAdd);
      console.log(this.listTicketToPay);
      this.codeTicketToAdd = null;
      console.log(this.codeTicketToAdd)
    } else {
      console.log("bỏ chọn")
      for (let i = 0; i < this.listTicketToPay.length; i++) {
        if (this.listTicketToPay[i] === codeTicket) {
          this.listTicketToPay.splice(i, 1);
        }
      }
    }
    console.log(this.listTicketToPay);
  }

  //SonNH lấy danh sách code cần thanh toán
  getListToPay() {
    for (let i = 0; this.listTicketToPay.length; i++) {
      this.ticketService.getTicketInfo(this.listTicketToPay[i]).subscribe(value => {
        this.ticket = value;
        this.totalPrice += this.ticket.priceTicket;
        this.ticket = null;
      })
    }
  }


  pay() {
    // SonNH gửi list mã vé cần thanh toán qua back end!
    for (let i = 0; i < this.listTicketToPay.length; i++) {
      this.codeTicketTopay = this.listTicketToPay[i]
      console.log("vé cần thanh toán" + this.codeTicketTopay)
      this.ticketService.payTickets(this.listTicketToPay).subscribe(value => {
        console.log("Thanh toán vé: " + this.listTicketToPay)
      })
    }
  }

  getTotalPrice() {
    // SonNH gửi list mã vé cần thanh toán qua back end và nhận về tổng giá vé cần thanh toán!
    for (let i = 0; i < this.listTicketToPay.length; i++) {
      this.codeTicketTopay = this.listTicketToPay[i]
      console.log("Vé cần thanh toán:" + this.codeTicketTopay)
      this.ticketService.getTotalPrice(this.listTicketToPay).subscribe(value => {
        this.finalPrice = value;
        console.log("Gửi list ticket qua back end")
      }, error => {
        console.log(error)
      }, () => {
        console.log("Tổng tiền từ back end gửi về:" + this.finalPrice)
      })
    }

  }

  sendEmailConfirmPayment() {
    const priceVND = Math.round(this.finalPrice*23000)
    const quantity = this.listTicketToPay.length;
    const nameCustomer = this.ticketList[0].customer.nameCustomer;
    this.ticketService.confirmEmailPayment(priceVND, nameCustomer, quantity).subscribe(value => {
      console.log("Gửi email")
    })
  }

//  SonNH phaan trang
  getTicketPage(pageNumber: number) {
    this.ticketService.getAllTicketByCustomerId(1,pageNumber).subscribe((data: any) => {
      console.log(this.ticketList)
      this.ticketList = data.content;
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
      this.getTicketPage(this.indexPagination);
    } else {
      console.log('het trang nextPage')
    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination--;
      console.log(this.indexPagination)
      this.getTicketPage(this.indexPagination);
    } else {
      console.log('het trang  previous')
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination - 1;
    console.log(this.totalPagination)
    this.getTicketPage(this.indexPagination);
  }
}
