import { Component } from '@angular/core';
import {AF} from "./providers/db";
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'body',
    templateUrl: "./app.component.html",
    styleUrls: ["./app.style.scss"]
})
export class AppComponent {
  public isLoggedIn: boolean;
  public isPage: boolean = true;
  constructor(public afService: AF, private router: Router) {
    this.afService.af.authState.subscribe (
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          //this.router.navigate(['']);
          this.isLoggedIn = false;
        }
        else {
          console.log("Successfully Logged in.");
          this.isLoggedIn = true;
          localStorage.setItem("user_displayname", auth.displayName)
          localStorage.setItem("user_email", auth.email)
          localStorage.setItem("isLoggedIn", "true")
          this.router.navigate(['']);
        }
      }
    );
  }
  logout() {
    this.afService.logout();
  }

 }
