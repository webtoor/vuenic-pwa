import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.page.html',
  styleUrls: ['./delete-confirm.page.scss'],
})
export class DeleteConfirmPage implements OnInit {
  deleteConfirmForm: FormGroup;
  funcStatus
  constructor(private formBuilder: FormBuilder, public route : ActivatedRoute, public router: Router) {
    this.deleteConfirmForm = this.formBuilder.group({
      'password' : [null, Validators.required],
    });  
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.funcStatus = this.router.getCurrentNavigation().extras.state.funcStatus;
        console.log(this.funcStatus)
      }
    });
  }
}
