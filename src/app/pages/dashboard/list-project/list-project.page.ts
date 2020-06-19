import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.page.html',
  styleUrls: ['./list-project.page.scss'],
})
export class ListProjectPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
