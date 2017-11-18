
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, public af: AngularFireAuth, public db: AngularFireDatabase) { }
  login() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  /**
  * Logs the user in using their Email/Password combo
  * @param email
  * @param password
  * @returns {firebase.Promise<FirebaseAuthState>}
  */
  loginwithemail(email, password) {
    return this.af.auth.signInWithEmailAndPassword(email, password)
  }
  logout() {
    this.af.auth.signOut();
    localStorage.removeItem('isLoggedin');
  }
  /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password, name, type) {
    console.log(email)
    return this.af.auth.createUserWithEmailAndPassword(
      email,
      password
    ).then((user) => {
        // User created now create Firebase Database user
        return this.db.database.ref(`/users/${user.uid}`).update({
            name: name,
            email: email,
            rol: type
        });
    }).then(() => {
        this.router.navigate(['/login'])
    }).catch((error) => {
        // Error
        alert(`Error: ${error}`)
        console.log(error);
    });
  }
  /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.db.app.database().ref('registeredUsers/' + uid).set({
      name: name,
      email: email
    });
  }

  canActivate() {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
