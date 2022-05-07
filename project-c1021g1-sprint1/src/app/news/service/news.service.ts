import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {News} from "../model/news";
import {NewDto} from "../dto/newDto";


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private URL = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
  constructor(private http: HttpClient) { }
  getAllNews(): Observable<News[]>{
    return this.http.get<News[]>(this.URL+'/api/news/list-news');
  }
  saveNews(news): Observable<NewDto>{
    console.log(news)
    return this.http.post<NewDto>(this.URL+ '/api/news/create', JSON.stringify(news),this.httpOptions)
  }
  findNewsById(id: number): Observable<News>{
    return this.http.get<News>(this.URL+ '/api/news/list-news/' +id);
  }
  updateNews(newsDto: NewDto, id: number): Observable<NewDto>{
    console.log(newsDto)
    return this.http.patch<NewDto>(this.URL + '/api/news/update/' +id, JSON.stringify(newsDto), this.httpOptions);
  }
}
