import { duration } from 'moment';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { League } from './league';
import { TournamentService } from '../../page/shared/tournament.service';
import * as firebase from 'firebase/app';
@Injectable()
export class LeagueService {

  private basePath = '/leagues';

  leagues: FirebaseListObservable<any[]> = null; //  list of objects
  league: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase, private tournamentService: TournamentService) {

  }

  getItemsList(query = {}): FirebaseListObservable<any[]> {
    this.leagues = this.db.list(this.basePath, {
      query: query
    });
    return this.leagues
  }
  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<any> {
    const itemPath = `${this.basePath}/${key}`;
    this.league = this.db.object(itemPath)

    return this.league
  }

  createItem(item: League): void {
    this.db.app.database().ref(this.basePath).push(item).then(res => {
      const value = {}
      value[res.key] = true
      this.tournamentService.addLeague(item.tournamentId, value)
    })
      .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateItem(key: string, value: any, callback): void {
    this.leagues.update(key, value)
      .then(snapshot => {
        callback(snapshot)
      })
      .catch(error => this.handleError(error))
  }
  addTeam(key: string, value: any): void {
    this.db.app.database().ref(this.basePath + '/' + key + '/teams').update(value).then(a => {
      console.log('save team')
    }).catch(error => {
      this.handleError(error)
    })
  }
  deleteTeam(key: string, tid: string): void {
    this.db.app.database().ref(this.basePath + '/' + key + '/teams/' + tid).remove( a => {
      console.log('deleted team')
    }).catch(error => {
      this.handleError(error)
    })
  }
  // Deletes a single item
  deleteItem(key: string): void {
      this.db.database.ref(`${this.basePath}/${key}/`).update({'active': false})
    // this.leagues.remove(key)
    //   .catch(error => this.handleError(error))
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.leagues.remove()
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }

}
