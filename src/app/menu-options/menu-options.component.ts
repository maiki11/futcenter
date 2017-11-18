import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AF } from "app/providers/db";
import { User } from "firebase";


@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss']
})
export class MenuOptionsComponent implements OnInit {
@Input() menu:string;
isLoggedIn: String = ""
user_email: String = ""
user_displayname: String = ""
user:User
  constructor(private router: Router, public afService: AF) {
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") 
    this.user_email = localStorage.getItem("user_email")
    this.user_displayname = localStorage.getItem("user_displayname")
  }

  logout(){
    this.afService.logout()
    location.reload()
  }

}
