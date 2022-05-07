import {Component, OnInit} from '@angular/core';
import {ICustomerType} from "../model/ICustomerType";
import {ICountries} from "../model/ICountries";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerType: ICustomerType[];
  country: ICountries[];
  customer: FormGroup;
  idCard: any;
  phone: any;
  emailValid: any;
  validation_messages = {
    nameCustomer: [
      {type: 'required', message: 'Vui lòng nhập họ và tên!'},
      {type: 'maxlength', message: 'Vui lòng nhập dưới 40 kí tự!'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số!'}
    ],
    emailCustomer: [
      {type: 'required', message: '  Vui lòng nhập email!'},
      {type: 'email', message: '  Vui lòng nhập email đúng định dạng ví dụ : nguyenvana@gmail.com!'},
      {type: 'maxlength', message: 'Vui lòng nhập dưới 40 kí tự!'},
    ],
    phoneCustomer: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại!'},
      {type: 'pattern', message: 'Vui lòng nhập số địa thoại đúng định dạng 090xxxxxxx hoặc 091xxxxxxx'}
    ],
    idCardCustomer: [
      {type: 'required', message: 'Vui lòng nhập CMND!'},
      {type: 'pattern', message: 'CMND phải đúng định dạng 10 số!'},
    ],
    countries: [
      {type: 'required', message: ' Vui lòng chọn quốc tịch!'},
    ],
    customerType: [
      {type: 'required', message: 'Vui lòng chọn loại khách hàng!'},
    ],
    address: [
      {type: 'required', message: 'Vui lòng nhập địa chỉ!'},
      {type: 'minlength', message: 'Vui lòng trên 5 kí tự!'},
      {type: 'maxlength', message: 'Vui lòng nhập dưới 40 kí tự!'},
    ],
  }


  constructor(private customerService: CustomerService,
              private snackBar: MatSnackBar,
              private router: Router, private active: ActivatedRoute, private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.customer = new FormGroup({
      id: new FormControl(''),
      nameCustomer: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴýÝỶỸửữựỵ ỷỹ]*$/), Validators.maxLength(40)]),
      genderCustomer: new FormControl('',),
      birthdayCustomer: new FormControl('', Validators.required),
      idCardCustomer: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      phoneCustomer: new FormControl('', [Validators.required, Validators.pattern(/^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]),
      emailCustomer: new FormControl('', [Validators.required, Validators.email,Validators.maxLength(40)]),
      addressCustomer: new FormControl('',[ Validators.required,Validators.minLength(5),Validators.maxLength(40)]),
      delFlagCustomer: new FormControl(''),
      pointCustomer: new FormControl(''),
      imageCustomer: new FormControl(''),
      countries: new FormControl(''),
      customerType: new FormControl(''),


    });
    this.customerService.getAllCountries().subscribe(data1 => {
      this.country = data1;
      this.customerService.getAllCustomerType().subscribe(data2 => {
        this.customerType = data2;
        this.customerService.finByIdCustomer(Number((this.active.snapshot.paramMap.get('id')))).subscribe(data3 => {
          this.customer.patchValue(data3);
        });
      });
    });
  }

  update() {
    if (this.customer.valid) {
      this.customerService.updateCustomer(Number(this.active.snapshot.paramMap.get('id')), this.customer.value).subscribe(data => {
        this.router.navigateByUrl('/list-customer');
        this.snackBar.open('Đã cập nhật thành công', 'OK');
      }, error => {
        this.idCard = error.error.idCardCustomer
        this.phone = error.error.phoneCustomer
        this.emailValid = error.error.emailCustomer
        this.snackBar.open('Dữ liệu đang bị lỗi', 'OK');
      });
    }
  }
  isEmpty() {
    this.idCard = ''
    this.phone = ''
    this.emailValid = ''
  }

}
