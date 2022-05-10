import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {News} from "./news";


@Injectable({
  providedIn: 'root'
})


export class NewsService {

  URL_LIST_NEWS = "http://localhost:8080/api/list-news";
  URL_DELETE_NEWS = "http://localhost:8080/api/delete-news";
s
  constructor(private http : HttpClient) { }

  getAllNews(index : number): Observable<News[]> {
    return this.http.get<News[]>(this.URL_LIST_NEWS + '?page=' + index);
  }

  deleteNews(id):Observable<News> {
    return this.http.delete<News>(this.URL_DELETE_NEWS + '/' + id);
  }

  getNewsById(id): Observable<News>{
    return this.http.get<News>(this.URL_LIST_NEWS + '/' + id);
  }

  getAllNewsNotPaging() {
    return this.http.get<News[]>(this.URL_LIST_NEWS + '/news-not-pagination');
  }

}
