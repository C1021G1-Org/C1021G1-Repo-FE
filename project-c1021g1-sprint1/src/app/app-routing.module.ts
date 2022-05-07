import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeRoutingModule} from "./employee/employee-routing.module";



// const routes: Routes = [  {
//   path: 'news',
//   loadChildren: () => import('./news/news.module').then(module => module.NewsModule)
// },];

const routes: Routes = [
  {
    path: "news", loadChildren: () => import('./news/news.module').then(mod => mod.NewsModule)
  },
  { path: 'employee',
    loadChildren: () => import ('./employee/employee.module').then(module => module.EmployeeModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EmployeeRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
