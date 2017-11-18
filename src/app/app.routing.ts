import { ModuleWithProviders } from '@angular/core';
//import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { PageComponent } from './page/page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//layout
import { FullLayoutComponent } from './layouts/full-layout.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    }/*,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
    ]
  },*/
  {path: '', component: PageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  {path: 'inicio', component: PageComponent},
  {path: 'calendario', component: CalendarComponent},

  /*{path: 'tournaments', component: TournamentsComponent},
  {path: 'tournament/:id', component: LeaguesComponent},
  {path: 'leagues', component: LeaguesComponent},
  {path: 'league/:id', component: TeamComponent},
  {path: 'teams', component: TeamComponent},
  {path: 'stadium', component: StadiumComponent},
  {path: '**', component: HomePageComponent}, //cualquier ruta aunque no exista se usa **/
];
/*
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})*/
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);