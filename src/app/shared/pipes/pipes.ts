import { Team } from '../../page/shared/team';
import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../../page/shared/match';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: Match[], term: string): any {
        if (term) {
            term = term.toLowerCase();
        }
        console.log(items)
        return term
            ? items.filter(item => item.team1.name.toLowerCase().indexOf(term) !== -1 || item.team2.name.toLowerCase().indexOf(term) !== -1 || item.league.toLowerCase().indexOf(term) !== -1 )
            : items;
    }
}

@Pipe({
    name: 'startdate',
    pure: false
})
export class StartDatePipe implements PipeTransform {
    transform(items: Match[], startDate: any): any {
        //if (startDate) {
        // startDate =  new Date(startDate.year, startDate.month - 1, startDate.day, 0).getTime()
        //}
        return startDate ? items.filter(item =>
            startDate <= item.startDate
        ) : items
    }
}
@Pipe({
    name: 'teamPipe',
    pure: false
})
export class TeamPipe implements PipeTransform {
    transform(items: Team[], term: string): any {
        if (term) {
         term = term.toLowerCase()
        }
        return term ? items.filter(item =>
                        item.title.toLowerCase().indexOf(term) !== -1
                    ) : items
    }
}
@Pipe({
    name: 'enddate',
    pure: false
})
export class EndDatePipe implements PipeTransform {
    transform(items: Match[], endDate: any): any {
        //if (term) {
        // term =  new Date(term.year, term.month - 1, term.day, 23).getTime()
        //}
        return endDate ? items.filter(item =>
                        endDate >= item.startDate
                    ) : items
    }
}

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], sortedBy: string, sortBy: string): any {
        if(sortBy=="asc")
            return items.sort((a, b) => b[sortedBy] - a[sortedBy]);
        else
            return items.sort((a, b) => a[sortedBy] - b[sortedBy]);
    }
}
