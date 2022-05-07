import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../model/category";
import {NewsService} from "../service/news.service";
import {CategoryService} from "../service/category.service";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent implements OnInit {
  flag: boolean = false;
  newsForm: FormGroup = new FormGroup({
    nameNews: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")])),

    codeNews: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern("^TT-[0-9]{4}$")])),

    dateNews: new FormControl('',
      Validators.compose([Validators.required])),

    imageNews: new FormControl('',
      Validators.compose([Validators.required])),

    titleNews: new FormControl('',
      Validators.compose([Validators.required])),

    descriptionNews: new FormControl('',
      Validators.compose([Validators.required])),

    category: new FormControl('',
      Validators.compose([Validators.required])),

  })

  category: Category[];
  private selectedImage: any = null;
  imageThis: string="https://firebasestorage.googleapis.com/v0/b/maybay-40ca7.appspot.com/o/06-05-2022094405AM?alt=media&token=9784592e-a840-4c6d-ac83-e7ad6796060f";



  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private router: Router,
    private alertService: AlertService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit() {
    this.getAllCategory()
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(category => {
      this.category = category;
    })
  }

  save() {
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.newsForm.get('imageNews').patchValue(url);

          // Call API to create vaccine
          this.newsService.saveNews(this.newsForm.value).subscribe(() => {
            this.router.navigateByUrl('news/list-news').then(r => this.alertService.showMessage("Thêm mới thành công!"));
          })
        });
      })
    ).subscribe();
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageThis = event.target.result;
      };
    }
  }
}
