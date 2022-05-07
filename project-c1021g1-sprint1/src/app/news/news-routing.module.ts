import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateNewsComponent} from "./create-news/create-news.component";
import {ListNewsComponent} from "./list-news/list-news.component";
import {EditNewsComponent} from "./edit-news/edit-news.component";


const routes: Routes = [
  {
    path:"news/list-news",
    component:ListNewsComponent
  },
  {
    path:"news/list-news/create",
    component:CreateNewsComponent
  },
  {
    path:"news/list-news/update/:id",
    component:EditNewsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}
