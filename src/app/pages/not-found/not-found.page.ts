import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {

  constructor(public menu: MenuController) {
    this.menu.enable(false);

   }

  ngOnInit() {
  }

}
