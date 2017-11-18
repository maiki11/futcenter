import { validateComponent } from 'codelyzer/walkerFactory/walkerFn';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Team } from './team';
import { LeagueService } from './league.service';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class TeamService {


    private basePath = '/teams';

    teams: FirebaseListObservable<any[]> = null; //  list of objects
    team: FirebaseObjectObservable<any>; //   single object

    constructor(private db: AngularFireDatabase,
        private leagueSvc: LeagueService,
        public af: AngularFireAuth) {

    }
    getItemsList(query = {}): FirebaseListObservable<any[]> {
        if (localStorage.getItem('uid')) {
            this.teams = this.db.list(this.basePath, {
                query: query
            });
            return this.teams
        }
        return null
    }
    // Return a single observable item
    getItem(key: string): FirebaseObjectObservable<any> {
        if (key.length > 0) {
            const itemPath = `${this.basePath}/${key}`;
            this.team = this.db.object(itemPath)
            return this.team
        }
    }

    createItem(item: Team, lid: string = null): void {
        item.createdBy = localStorage.getItem('uid')
        this.db.app.database().ref(this.basePath).push(item).then(res => {
            if (lid) {
                const value = {}
                value[item.$key] = false
                this.leagueSvc.addTeam(lid, value)
            }
        })
            .catch(error => this.handleError(error))
    }
    // Update an existing item
    updateItem(key: string, value: any, callback): void {
        this.teams.update(key, value)
            .then(snapshot => {
                callback(true)
            })
            .catch(error => {
                this.handleError(error)
                callback(false)
            })
    }
    deleteLeague(key: string, lid: string): void {
       this.db.database.ref(`${this.basePath}/${key}/leagues/${lid}`).remove()
    }
    addLeague(key: string, lid: string,value: boolean): void {
        this.db.database.ref(`${this.basePath}/${key}/leagues/${lid}`).set(value)
     }
     updateLeague(key: string, lid: string,value: any): void {
        this.db.database.ref(`${this.basePath}/${key}/leagues/`).update(value,error => {
            if(error){
                console.log("guardado")
            }
        })

     }
    addPlayer(key: string, value: any, callback): void {
        this.db.database.ref(`teams/${key}/players`).update(value, error => {
            if (error) {
                callback(false)
            }else {
              callback(true)
            }
        })
    }
    // Deletes a single item
    deleteItem(key: string): void {
        const val = {}
        val['active'] = false
        this.db.database.ref(`${this.basePath}/${key}`).update(val, error => {
            if (error) {
                alert('Eliminado incorrectamente, intentelo despues')
            }
            alert('Eliminado correctamente')
        })
    }

    // Deletes the entire list of items
    deleteAll(): void {
        this.teams.remove()
            .catch(error => this.handleError(error))
    }

    // Default error handling for all actions
    private handleError(error) {
        console.log(error)
    }

    public allTeamsInactive(){
        var teams = this.getItemsList()
        teams.forEach($0 =>{
            if($0.length>0){
                $0.forEach(item=>{
                    if(item.hasOwnProperty("leagues")){
                            console.log(item.leagues)
                        /*var aux = item.leagues.filter(
                            $0 => $0.$key === false)
                            console.log(aux)*/
                    }
                    
                })
            }
        })
        /*var query = {
            orderByChild: "leagues/" + this.league.$key,
            equalTo: true
        }
        this.teams = this.db.list(this.basePath, {
            query: query
        });
        return this.teams()*/
    }

}
