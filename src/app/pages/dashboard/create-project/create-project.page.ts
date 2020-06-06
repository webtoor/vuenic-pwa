import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.page.html',
  styleUrls: ['./create-project.page.scss'],
})
export class CreateProjectPage implements OnInit {
  createProjectForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createProjectForm = this.formBuilder.group({
      'project_type' : [null, [Validators.required]],
    });
   }

  ngOnInit() {
  }

}
