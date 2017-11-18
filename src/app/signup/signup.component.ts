import { Component, OnInit } from '@angular/core';
import { UserModel } from "app/page/shared/user";
import { AF } from "app/providers/db";
import { Router } from "@angular/router";
//import { User } from '../page/shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: UserModel;
  constructor(public afService: AF, private router: Router) { 
    this.user = new UserModel();
}

  ngOnInit() {
  }
  
  registerUser(){
    //console.log(this.user)
    this.afService.registerUser(this.user.email,this.user.password).then((user) => {
      this.router.navigate(['']);
    }).catch((error)=> {
      console.log(error.message)
    })
  }
}
