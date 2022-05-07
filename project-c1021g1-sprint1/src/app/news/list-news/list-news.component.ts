import { Component, OnInit } from '@angular/core';
import {NewsService} from "../news.service";
import {News} from "../news";
import {MatDialog} from "@angular/material/dialog";
import {DeleteNewsComponent} from "../delete-news/delete-news.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  newsList : News[] = [];
  indexPagination: number = 0;
  totalPagination: number;
  listNewsNotPagination: News[] = [];
  checkRoleAdmin: boolean;
  constructor(private newService : NewsService,
              private dialog : MatDialog,
              private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newService.getAllNews(0).subscribe((data: any) => {
      this.newsList = data.content;
      this.totalPagination = data['totalPages'];
    })
    this.newService.getAllNewsNotPaging().subscribe((data:any) => {
      this.listNewsNotPagination = data.content;
      if ((this.listNewsNotPagination.length % 5) != 0) {
        this.totalPagination = (Math.round(this.listNewsNotPagination.length / 5)) + 1;
      }
    })
    this.appearButton();
  }
  openDialog(id) {
    this.newService.getNewsById(id).subscribe(data => {
      const dialogRef = this.dialog.open(DeleteNewsComponent, {
        width: '500px',
        data: {datal: data},
      });
      dialogRef.afterClosed().subscribe(next => {
        this.ngOnInit();
      });
    });
  }

  getNewsPerPage(pageNumber: number) {
    this.newService.getAllNews(pageNumber).subscribe((data: any) => {
      this.newsList = data.content;
    });
  }


  firstPage() {
    this.indexPagination = 0;
    this.ngOnInit();
  }

  nextPage() {
    if (this.indexPagination < this.totalPagination - 1) {
      this.indexPagination++;
      this.getNewsPerPage(this.indexPagination);
    } else {
      this.snackBar.open('Bạn đang ở trang cuối cùng', 'Ok')
    }

  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination--;
      this.getNewsPerPage(this.indexPagination);
    } else {
      this.snackBar.open('Bạn đang ở trang đầu tiên', 'Ok')
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination -1;
    this.getNewsPerPage(this.indexPagination);
  }

  appearButton() {
   this.checkRoleAdmin = sessionStorage.getItem('roles').includes('ADMIN', 0);
  }

}
