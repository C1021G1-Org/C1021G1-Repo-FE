import {Component, OnInit} from '@angular/core';
import {NewsService} from "../news.service";
import {ActivatedRoute} from "@angular/router";
import {News} from "../news";

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css']
})
export class DetailNewsComponent implements OnInit {
  id: number;
  newsDetail: News;

  constructor(private service: NewsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.getNewsById(this.id).subscribe(data => {
      this.newsDetail = data;
    })
  }

}
