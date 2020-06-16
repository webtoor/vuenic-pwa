import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conf-project',
  templateUrl: './conf-project.page.html',
  styleUrls: ['./conf-project.page.scss'],
})
export class ConfProjectPage implements OnInit {
  user_project_id;
  constructor(public httpService: AuthService, public route : ActivatedRoute,) { 
    this.user_project_id = this.route.snapshot.paramMap.get('user_project_id');
  }

  ngOnInit() {
    this.getUserProject()
  }

  getUserProject(){
    this.httpService.GetRequest('user-project/' + this.user_project_id).subscribe(res => {
      console.log(res);
      if(res.status == 200){
      }
    });
  }

}
