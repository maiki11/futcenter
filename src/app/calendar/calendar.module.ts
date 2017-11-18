import { SharedPipesModule } from '../shared/';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdChipsModule, MdSelectModule, MdOptionModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar.component';
import { FilterPipe, SortByPipe } from '../shared/pipes/pipes';
import { Ng2BootstrapModule } from 'ngx-bootstrap/ng2-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    MdChipsModule,
    MdSelectModule,
    MdOptionModule,
    MdInputModule,
    FormsModule,
    MdSnackBarModule,
    SharedPipesModule
  ],
  //declarations: [MatchDetailComponent, MatchesComponent]
})
export class MatchesModule { }
