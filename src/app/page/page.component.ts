import { Component, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { League } from './shared/league';
import { Match } from './shared/match';
import { Team } from './shared/team';
import { StandingMatch } from './shared/standing-match';
import { PageService } from './shared/page.service';
import * as firebase from 'firebase/app';
import "./page.component.js";
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0})),
          
        ]
      )]
    )
  ],
})
export class PageComponent implements OnInit {
  public isCard = true
  leagues: League[] = [];
  prevMatches: Match[] = [];
  teams: Team[] = [];
  leaguesTable: League[] = [];
  nextMatches: Match[] = [];
  teamsTable: StandingMatch[] = [];
  public page = 0;
  public keyLeagueSelected = "";
  public keyLeagueTableSelected = "";
  rForm: FormGroup;
  post: any;
  name: string = "";
  msg: string = "";
  email: string = "";
  constructor(
    public snackBar: MdSnackBar,
    private PageSvc: PageService
  ) {

  }


  ngOnInit() {
    
    this.rForm = new FormGroup({
      name: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),//, Validators.minLength(3)
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ])),//,Validators.email
      msg: new FormControl(null, Validators.required),//, Validators.maxLength(250)
    })

    this.PageSvc.getLeaguesList({
          //limitToLast: 10,
          //orderByChild: "tournamentId",
          //equalTo: tournament.$key
      }).subscribe((leagues: [League]) => {
          this.leagues = leagues
          this.leaguesTable = leagues
          if(this.leagues[0]){
            this.leagues[0].selected = true;
            this.keyLeagueSelected = this.leagues[0].$key
            this.keyLeagueTableSelected = this.leagues[0].$key
            //teams
            this.getTeams(this.keyLeagueSelected);
            //matches
            this.getMatches(this.keyLeagueSelected);
            this.changeLeagueTables();
          }
    })
  }

  sendMsg(post){
    this.msg = post.msg
    this.name = post.name
    this.email = post.email
    this.snackBar.open("Mensaje enviado correctamente", "", {
      duration: 5000,
    });
    this.rForm.reset();
    this.PageSvc.sendMail(post)
  }

  getTeams(key=this.keyLeagueSelected){
    this.PageSvc.getTeamsList({
          //limitToLast: 10,
          orderByChild: "/leagues/" + key,
          equalTo: true
      }).subscribe((teams: [Team]) => {
          this.teams = teams
    })
  }

  getMatches(key = this.keyLeagueSelected){
    var date = Date.now();
    var startDate = (Date.now()-7*24*60*60*1000);
    var endDate = (Date.now()+7*24*60*60*1000);
    let handle = this.PageSvc.getMatchesList({
          limitToLast: 20,
          orderByChild: "league",
          equalTo: key,
      }).subscribe((matches: Match[]) => {
        var teams;
        if(key == this.keyLeagueSelected){
          teams = this.teams
        }else{
          teams = this.teamsTable
        }
        matches.map(m => {
          m.team1 = teams.find(t => t.$key == m.team1);
          m.team2 = teams.find(t => t.$key == m.team2);
          m.footballDay = this.leagues.find(l => l.$key == key).journeys[m.footballDay]
          return m;
        })
        this.nextMatches = matches;
        this.prevMatches = matches;
        //next matches
        this.nextMatches = this.nextMatches.filter(m => m.startDate >= date && m.done==false ) // && m.startDate <= endDate
        console.log("siguientes juegos")
        console.log(matches)
        this.nextMatches = this.nextMatches.sort((a,b) => a.startDate-b.startDate);
        //last matches
        this.prevMatches = this.prevMatches.filter( m => m.startDate <= date && m.done==true ) //m => m.startDate >= startDate &&
        this.prevMatches = this.prevMatches.sort((a,b) => a.startDate-b.startDate);
        handle.unsubscribe()
    })
  }

  changeLeague(i){
    this.leagues.forEach(element => {
      element.selected = false;
    });
    this.leagues[i].selected = true
    this.keyLeagueSelected = this.leagues[i].$key
    this.getTeams(this.keyLeagueSelected);
    this.getMatches(this.keyLeagueSelected);
  }

  changeLeagueTables(i=this.keyLeagueSelected){
    this.PageSvc.getStandingMatchs(i,tablestanding => {
      this.teamsTable = tablestanding
      this.teamsTable = this.teamsTable.sort((a,b) => (b.gDiff-a.gDiff));
      this.teamsTable = this.teamsTable.sort((a,b) => ((b.wins*3+b.tie)-(a.wins*3+a.tie)) );
    });
  }

  getJourney(journeyKey){
      let league = this.leagues.find(l => l.journeys == journeyKey )
      return league.title
  }

  nextPageMatch(newPage){
    if(newPage<=this.nextMatches.length)
    this.page = newPage
  }

  prevPageMatch(newPage){
    if(newPage>=0)
      this.page = newPage
  }

}