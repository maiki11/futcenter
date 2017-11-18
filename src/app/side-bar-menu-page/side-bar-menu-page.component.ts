import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-menu-page',
  templateUrl: './side-bar-menu-page.component.html',
  styleUrls: ['./side-bar-menu-page.component.scss']
})
export class SideBarMenuPageComponent implements OnInit {
  public menu = 'side'
  constructor() { }

  ngOnInit() {
  }

}
