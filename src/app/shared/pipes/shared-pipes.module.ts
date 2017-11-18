import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndDatePipe, FilterPipe, SortByPipe, StartDatePipe, TeamPipe } from './pipes';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [FilterPipe, SortByPipe, StartDatePipe, EndDatePipe, TeamPipe],
    declarations: [FilterPipe, SortByPipe, StartDatePipe, EndDatePipe, TeamPipe]
})
export class SharedPipesModule { }
