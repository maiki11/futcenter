import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Match } from '../page/shared/match';
import { PageService } from '../page/shared/page.service';

import {DatepickerModule} from 'ng2-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  matches: Match[]
  startDate:string;
  endDate:string;
  sortType:string = "asc";
  _bsRangeValue: any = [new Date(), new Date()];
  get bsRangeValue(): any {
    return this._bsRangeValue;
  }

  set bsRangeValue(v: any) {
    this._bsRangeValue = v;
    this.startDate = this._bsRangeValue[0].getTime();
    this.endDate = this._bsRangeValue[1].getTime();
  }

  myForm: FormGroup;
  private subscription: ISubscription;
  term: String;
  constructor(private pageSvc: PageService,private formBuilder: FormBuilder) {//rogeliocota@hotmail.com
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null,
      range: null
    });
    this.matchesCalendar({});
  }

  matchesCalendar(query){
    this.subscription = this.pageSvc.getMatchesList(query).subscribe((matches: Match[]) => {
      this.matches = matches
      console.log("matches Calendar1")
      console.log(this.matches);
      this.matches.forEach((match, index) => {
        this.pageSvc.getItem(match.team1,"teams").subscribe(team => {
          this.matches[index].team1 = team
        })
        this.pageSvc.getItem(match.team2,"teams").subscribe(team => {
          this.matches[index].team2 = team
        })
        this.pageSvc.getItem(match.league,"leagues").subscribe(league => {
          this.matches[index].league = league
        })
      })
      console.log("matches Calendar")
      console.log(this.matches);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
