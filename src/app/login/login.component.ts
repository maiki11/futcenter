import { Component, OnInit } from '@angular/core';
import { AF } from "app/providers/db";
import {Router} from "@angular/router";
import { UserModel } from "app/page/shared/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user:UserModel;

  constructor(public afService: AF, private router: Router) { this.user = new UserModel(); }
  login() {
    this.afService.login().then((data) => {
      localStorage.setItem("isLoggedIn", "true")
      location.reload()
      this.router.navigate(['']);
    })
  }
  loginwithemail(){
    this.afService.loginwithemail(this.user.email,this.user.password).then((user) => {
      localStorage.setItem("isLoggedIn", "true")
      location.reload()
      this.router.navigate(['']);
    }).catch((error)=> {
      console.log(error.message)
    })
  }

  ngOnInit() {
  }

}
