import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../service/news.service";
import {CategoryService} from "../service/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../model/category";
import {AlertService} from "../service/alert.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";
import {News} from "../model/news";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
  providers: [DatePipe]
})
export class EditNewsComponent implements OnInit {
  myDate  =new Date();
  loading: boolean = false;
  flag: boolean = false;
  imageThis = '';
  newsForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nameNews: new FormControl('',
      Validators.compose([Validators.required])),

    codeNews: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern("^TT-[0-9]{4}$")])),

    dateNews: new FormControl('',
      Validators.compose([Validators.required])),

    'presentDate': new FormControl((new Date()).toISOString().substring(0,10)),

    titleNews: new FormControl('',
      Validators.compose([Validators.required])),

    descriptionNews: new FormControl('',
      Validators.compose([Validators.required])),

    category: new FormControl(''),
    // Validators.compose([Validators.required])),
    imageNews: new FormControl('',
      Validators.compose([Validators.required])),
  })
  category: Category[];
  private news: News
  private selectedImage: any = null;
  private id: number

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {
  }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params.id;

    this.categoryService.getAllCategory().subscribe(category => {
      this.category = category;
      this.getNews(this.id);
      console.log(this.category)

    });



  }

  getNews(id: number) {
    return this.newsService.findNewsById(id).subscribe(data => {
      this.news = data
      this.newsForm.patchValue(this.news);
      this.imageThis = data.imageNews
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  update() {
    this.loading = true;
    // upload image to firebase
    const nameImg = this.getCurrentDateTime();
    // const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.newsForm.get('imageNews').patchValue(url);
          console.log(this.newsForm);
          this.newsService.updateNews(this.newsForm.value, this.activatedRoute.snapshot.params.id).subscribe(() => {
            console.log(this.newsForm)

            this.router.navigateByUrl('news/list-news').then(r => this.alertService.showMessage("cập nhập thành công!"));
            console.log(this.newsForm.get('category').value)
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
  // this.newsForm = new FormGroup({
  //   'presentDate': new FormControl((new Date()).toISOString().substring(0,10))
  // });
}

