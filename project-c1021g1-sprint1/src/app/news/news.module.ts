import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { ListNewsComponent } from './list-news/list-news.component';
import { DeleteNewsComponent } from './delete-news/delete-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { CreateNewsComponent } from './create-news/create-news.component';


@NgModule({
  declarations: [ListNewsComponent, DeleteNewsComponent, EditNewsComponent, CreateNewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
