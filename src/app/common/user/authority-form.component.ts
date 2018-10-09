import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from '../service/user.service';
import { AppAlarmService } from '../service/app-alarm.service';

import { ResponseObject } from '../model/response-object';

import { Authority } from '../model/authority';

@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styles: ['']
})
export class AuthorityFormComponent implements OnInit {

  auth: Authority;

  constructor(private userService: UserService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    this.auth = new Authority();
  }

  private getAuthority() {
    this.userService
      .getAuthority(this.auth.authority)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          if (model.total > 0) {
            this.auth = model.data;
          } else {
            this.auth = new Authority();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  private registerAuthority() {
    this.userService
      .registerAuthority(this.auth)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          console.log(model);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

}
