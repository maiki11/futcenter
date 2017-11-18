import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { League } from './league';
import { Match } from './match';
import { Team } from './team';
import { StandingMatch } from './standing-match';
import * as firebase from 'firebase/app';
@Injectable()
export class PageService {

  private leaguesPath: string = '/leagues';
  private matchesPath: string = '/matches';
  private teamsPath: string = '/teams';

  leagues: FirebaseListObservable<any[]> = null; //  list of objects
  league: FirebaseObjectObservable<any>; //   single object
  matches: FirebaseListObservable<any[]> = null; //  list of objects
  teams: FirebaseListObservable<any[]> = null; //  list of objects
  team: FirebaseListObservable<any[]> = null; //  list of objects
  item: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase) {

  }

  getLeaguesList(query = {}): FirebaseListObservable<any[]> {
    this.leagues = this.db.list(this.leaguesPath, {
      query: query
    });
    return this.leagues
  }

  getMatchesList(query = {}): FirebaseListObservable<any[]> {
    this.matches = this.db.list(this.matchesPath, {
      query
      // query: {
      //   // orderBy: 'team1',
      //   // equealTo: '-Ku6r2oETArd7XUU3NkS"',
      // }
    });
    return this.matches
  }

  getTeamsList(query = {}): FirebaseListObservable<any[]> {
    this.teams = this.db.list(this.teamsPath, {
      query: query
    });
    return this.teams
  }
  /*
    getTeam(query = {}): FirebaseListObservable<any[]> {
      this.team = this.db.list(this.teamsPath, {
        query: query
      });
      return this.teams
    }*/

  // Return a single observable item
  getItem(key: string, path): FirebaseObjectObservable<any> {
    const itemPath = `${path}/${key}`;
    this.item = this.db.object(itemPath)

    return this.item
  }

  // Default error handling for all actions
  private handleError(error) {
  }

  getStandingMatchs(lid: string, callback) {
    let query = {
      orderByChild: "/leagues/" + lid,
      equalTo: true
    }
    var teams: Team[] = []
    var matches: Match[] = []
    var standings: StandingMatch[] = []
    let h2 = this.db.list(this.teamsPath, { query }).subscribe((t: Team[]) => {
      teams = t
      let query = {
        orderByChild: "league/",
        equalTo: lid
      }
      this.db.list(this.matchesPath, { query }).subscribe((m: Match[] )=> {
        matches = m.filter(m=> m.done)
        teams.forEach(t => {
          var teamMatches = matches.filter(m => m.team1 == t.$key || m.team2 == t.$key )
          var standing = new StandingMatch()
          standing.gp = teamMatches.length
          standing.team = t.title
          standing.teamid = t.$key
          standing.photo = t.imageUrl
          teamMatches.forEach(match => {
            if (match.team1 == t.$key) {
              standing.gFor += match.result1
              standing.gAgainst += match.result2
              if (match.result1 > match.result2) {
                standing.wins += 1
              } else if (match.result1 < match.result2) {
                standing.loses += 1
              } else {
                standing.tie += 1
              }
            } else {
              if (match.result1 < match.result2) {
                standing.wins += 1
              } else if (match.result1 > match.result2) {
                standing.loses += 1
              } else {
                standing.tie += 1
              }
              standing.gAgainst += match.result1
              standing.gFor += match.result2
            }
          })
          standing.gDiff = standing.gFor - standing.gAgainst
          standings.push(standing)
        })
        callback(standings)
      })
    })
  }

  getStatistics(key: string) {
    let query = {
      orderByChild: "league",
      equalTo: key
    }

    let query2 = {
      orderByChild: "/leagues/" + key,
      equalTo: true
    }
    var teams = this.getTeamsList(query2);
    var standing: StandingMatch[] = [];
    var aux = new StandingMatch();
    let matches = this.db.list(this.matchesPath, query).subscribe(m => {
      m.forEach(match => {
        if (standing.find(match.team1)) {

        } else {
          aux
          standing.push();
        }
      });
    });
  }

  public sendMail(form){
    this.db.app.database().ref('/messages').push(form);
  }

}
