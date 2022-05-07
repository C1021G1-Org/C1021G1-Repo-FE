import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {BodyComponent} from './layout/body/body.component';
import {SignUpComponent} from './login/sign-up/sign-up.component';
import {SignInComponent} from './login/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxPaginationModule} from "ngx-pagination";
import {CdkTableModule} from "@angular/cdk/table";

import {NewsModule} from "./news/news.module";
import {environment} from "../environments/environment";
import {AngularFireModule} from '@angular/fire';
import {ToastrModule} from "ngx-toastr";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    SignUpComponent,
    SignInComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    DragDropModule,
    NgxPaginationModule,
    CdkTableModule,

    NewsModule,

    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressBarModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ],
  providers: [
    MatDialogModule,
    MatSnackBarModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
