import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.page.html',
  styleUrls: ['./delete-confirm.page.scss'],
})
export class DeleteConfirmPage implements OnInit {
  funcStatus
  constructor(public route : ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.funcStatus = this.router.getCurrentNavigation().extras.state.funcStatus;
        console.log(this.funcStatus)
      }
    });
  }
}
