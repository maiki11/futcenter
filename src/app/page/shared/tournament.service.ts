import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Tournament } from './tournament';

@Injectable()
export class TournamentService {

  private basePath: string = '/tournaments';

  Tournaments: FirebaseListObservable<any[]>; //  list of objects
  Tournament: FirebaseObjectObservable<any>; //   single object

  constructor(private db: AngularFireDatabase) { }

  getItemsList(query={}): FirebaseListObservable<any[]>  {
    this.Tournaments = this.db.list(this.basePath, {
      query: query
    });
    return this.Tournaments
  }
  // Return a single observable item
  getItem(key: string): FirebaseObjectObservable<any> {
    const itemPath =  `${this.basePath}/${key}`;
    this.Tournament = this.db.object(itemPath)
    return this.Tournament
  }

  createItem(item: Tournament): void  {
    this.Tournaments.push(item)
    .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateItem(key: string, value: any, callback): void {
    this.Tournaments.update(key, value).then(snapshot => {
      callback(snapshot)
    }) .catch(error => {
        callback(error.message)
        this.handleError(error)})
  }

  addLeague(key:string, value:any):void {
    this.db.app.database().ref(this.basePath+"/"+key+"/leagues").update(value).then(a =>{
      console.log("save League")
    }).catch(error => {
      this.handleError(error)
    })
  }

  // Deletes a single item
  deleteItem(key: string): void {
      this.Tournaments.remove(key)
        .catch(error => this.handleError(error))
  }

  // Deletes the entire list of items
  deleteAll(): void {
      this.Tournaments.remove()
        .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }


}
