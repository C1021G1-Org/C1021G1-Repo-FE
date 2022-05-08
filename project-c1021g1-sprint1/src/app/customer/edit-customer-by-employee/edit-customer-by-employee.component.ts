import {Component, Inject, OnInit} from '@angular/core';
import {CustomerService} from "../customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICustomerType} from "../model/ICustomerType";
import {ICountries} from "../model/ICountries";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import { IPersonalDto } from '../model/IPersonalDto';

@Component({
  selector: 'app-edit-customer-by-employee',
  templateUrl: './edit-customer-by-employee.component.html',
  styleUrls: ['./edit-customer-by-employee.component.css']
})
export class EditCustomerByEmployeeComponent implements OnInit {
  customerType: ICustomerType[];
  country: ICountries[];
  customerForm: FormGroup;
  selectedImage : any = null;
  imagePersonal : string = '';
  id : number;
  customer : IPersonalDto;
  routerLink : string = null;
  validation_messages = {
    nameCustomer: [
      {type: 'required', message: 'Vui lòng nhập họ và tên!'},
      {type: 'maxlength', message: 'Vui lòng nhập dưới 30 kí tự!'},
      {type: 'minlength', message: 'Vui lòng nhập trên 10 kí tự!'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số!'}
    ],
    emailCustomer: [
      {type: 'required', message: '  Vui lòng nhập email!'},
      {type: 'email', message: '  Vui lòng nhập email đúng định dạng ví dụ : nguyenvana@gmail.com!'},
    ],
    phoneCustomer: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại!'},
      {type: 'pattern', message: 'Vui lòng nhập số địa thoại đúng định dạng 090xxxxxxx hoặc 091xxxxxxx'}
    ],
    idCardCustomer: [
      {type: 'required', message: 'Vui lòng nhập CMND!'},
      {type: 'pattern', message: 'CMND phải đúng định dạng 12 số!'},
    ],
    countries: [
      {type: 'required', message: ' Vui lòng chọn quốc tịch!'},
    ],
    customerType: [
      {type: 'required', message: 'Vui lòng chọn loại khách hàng!'},
    ],
    birthdayCustomer: [
      {type: 'required', message: 'Vui lòng chọn loại khách hàng!'},
      {type: 'ageUnder', message: 'Bạn phải trên 18 tuổi và dưới 100 tuổi '},
    ],
    imageCustomer: [
      {type: 'required', message: 'Vui lòng chọn loại khách hàng!'},
    ],
  }
  constructor(private customerService: CustomerService,
              private snackBar: MatSnackBar,
              private router: Router, private active: ActivatedRoute, private formBuilder: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }
  ngOnInit(): void {
    // ThangDBX khoi tao form
    this.customerForm = new FormGroup({
      id: new FormControl(''),
      nameCustomer: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴýÝỶỸửữựỵ ỷỹ]*$/), Validators.maxLength(30), Validators.minLength(10)]),
      genderCustomer: new FormControl('',),
      birthdayCustomer: new FormControl('', [Validators.required,this.checkAge]),
      idCardCustomer: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]),
      phoneCustomer: new FormControl('', [Validators.required, Validators.pattern(/^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]),
      emailCustomer: new FormControl('', [Validators.required, Validators.email]),
      addressCustomer: new FormControl('', Validators.required),
      delFlagCustomer: new FormControl(''),
      imageCustomer: new FormControl(''),
      countries: new FormControl(''),
    });
    // THangDBX lay gia tri
    this.customerService.getAllCountries().subscribe((data : ICountries[])=> {
      this.country = data;
      this.customerService.findPersonalId(Number((this.active.snapshot.paramMap.get('id')))).subscribe(( data1: IPersonalDto) => {
        this.customerForm.patchValue(data1);
        this.id = data1.id;
        console.log(this.id + ' id is ::::')
        this.imagePersonal = data1.imageCustomer;
      });
    });
    this.routerLink = "/view-customer/" + this.id
  }
  //ThangDBX check tuoi tren 18
  checkAge(birthdayCustomer: AbstractControl) {
    console.log(birthdayCustomer.value);
    const birth = new Date(birthdayCustomer.value);
    const birthday = Date.now() - birth.getTime() - 86400000;
    const time = new Date(birthday);
    console.log(time.getUTCFullYear());
    const age = time.getUTCFullYear() - 1970;
    console.log(age);
    if (age < 18 || age > 100) {
      return {'ageUnder': true};
    }
    return null;
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    // if (event.target.files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]);
    //   reader.onload = (event: any) => {
    //     this.selectedImage = event.target.result;
    //   };
    // }
  }
  update() {
    // ThangDBX kiểm tra xem có update ảnh không ( ảnh k cần thiết phải có )
    if (this.selectedImage != null){
      // upload image to firebase
      this.customer = this.customerForm.value;
      // @ts-ignore
      console.log(this.customer.id + ' --- ' + this.customer.nameCustomer + '\n -------------------------------------------');
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // this.customerForm.patchValue({imageCustomer: url});
            this.customerForm.get('imageCustomer').patchValue(url);
            this.imagePersonal = url;
          });
        })
      )
        .subscribe();
    }
    //ThangDBX update
    // cap nhat thong tin
    if (this.customerForm.valid) {
      this.customerService.updatePersonalInfo(this.id, this.customerForm.value).subscribe(data => {
        this.snackBar.open('Đã cập nhật thành công', 'OK');
        this.router.navigateByUrl('/view-customer/' + this.id );
      }, error => {
        console.log(error);
        this.snackBar.open('Dữ liệu đang bị lỗi', 'OK');
      });
    }
  }
  private getCurrentDateTime() {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  back(){
    this.router.navigateByUrl('/view-customer/' + this.id );
  }
}
