import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdSnackBarModule,MaterialModule} from '@angular/material';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { CarouselModule } from 'ng2-bootstrap/carousel';

import {AF} from "./providers/db";
// Routing Module
import { routing, appRoutingProviders } from './app.routing';
//import { Router } from "@angular/router";
//import { RouterModule, Routes} from "@angular/router";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { PageComponent } from './page/page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { SideBarMenuPageComponent } from './side-bar-menu-page/side-bar-menu-page.component';
import { UploadComponent } from './upload/upload.component';

//Services
import { PageService } from './page/shared/page.service';

import { LOCALE_ID } from '@angular/core';
import { MenuOptionsComponent } from './menu-options/menu-options.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from "@angular/router/router";
import { CalendarComponent } from './calendar/calendar.component';

import {DatepickerModule} from 'ng2-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharedPipesModule } from 'app/shared';

/*export const firebaseConfig = {
    apiKey: "AIzaSyBSxsSnTSgo_NkWdSxzWxASplCh3GhClHg",
    authDomain: "lacanchita-55caa.firebaseapp.com",
    databaseURL: "https://lacanchita-55caa.firebaseio.com",
    projectId: "lacanchita-55caa",
    storageBucket: "lacanchita-55caa.appspot.com",
    messagingSenderId: "187709839691"
};*/

export const firebaseConfig = {
    apiKey: "AIzaSyDgR2n2SOpn0p9ONbMb6u4ypdbwAdVfVFE",
    authDomain: "futcenter-2a726.firebaseapp.com",
    databaseURL: "https://futcenter-2a726.firebaseio.com",
    projectId: "futcenter-2a726",
    storageBucket: "futcenter-2a726.appspot.com",
    messagingSenderId: "504494714009"
  };

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    ChartsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    MaterialModule,
    MdSnackBarModule,
    BsDatepickerModule.forRoot(),
    SharedPipesModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    PageComponent,
    MenuPageComponent,
    SideBarMenuPageComponent,
    MenuOptionsComponent,
    UploadComponent,
    LoginComponent,
    SignupComponent,
    CalendarComponent
  ],
  providers: [AF,appRoutingProviders,PageService,{provide: LOCALE_ID, useValue: "sp-SP"}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);