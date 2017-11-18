import { Component, OnInit, Input, OnDestroy } from '@angular/core';
// import { Match } from '../../../../layout/matches/shared/match';
// import { TeamService } from '../../../../layout/teams/shared/team.service';
// import { Team } from '../../../../layout/teams/shared/team';
// import { MatchService } from '../../../../layout/matches/shared/match.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Match } from 'app/page/shared/match';
import { TeamService } from 'app/page/shared/team.service';
import { PageService } from 'app/page/shared/page.service';
import { Team } from 'app/page/shared/team';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.scss']
})
export class MatchItemComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  @Input() match: Match = new Match()
  constructor(
    private teamSvc: TeamService,
    private matchSvc: PageService,
    private router: Router) { }

  ngOnInit() {
    let List_teams: Team[] = []
    let List_match: Match[] = []
    this.subscription = this.teamSvc.getItemsList().subscribe(teams => {
      List_teams = teams
    })
    
  }
  onSelect() {
    this.router.navigate(['/matches', this.match.$key]);
  }
  ngOnDestroy() {
     this.subscription.unsubscribe();
  }


}
