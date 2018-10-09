import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from '../service/user.service';

import { AppAlarmService } from '../service/app-alarm.service';
import { ResponseObject } from '../model/response-object';
import { User } from '../model/user-info';

import { AppError } from '../error/app-error';
import { UserNotFoundError } from '../error/user-not-found-error';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: ['']
})
export class UserFormComponent implements OnInit {

  user: User;
  passwordConfirm: String;
  private isValidPassword: boolean;
  private isPasswordEmpty: boolean;
  private isPasswordConfirmEmpty: boolean;

  popup: boolean;

  @Output() messageChanged: EventEmitter<string> = new EventEmitter();

  constructor(private userService: UserService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    this.user = new User();
  }

  private getUser() {
    this.userService
      .getUser(this.user.userId)
      .subscribe(
        (model: ResponseObject<User>) => {
          if (model.total > 0) {
            this.user = model.data;
          } else {
            this.user = new User();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
          this.user = new User();
        },
        () => {
          console.log('완료');
        }
      );
  }

  private registerUser() {
    /*if ( this.isValidPassword !== true ) {
      return;
    }*/

    this.userService
      .registerUser(this.user)
      .subscribe(
        (model: ResponseObject<User>) => {
          console.log(model);
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

  private deleteUser() {
    this.userService
      .deleteUser(this.user)
      .subscribe(
        (model: ResponseObject<User>) => {
          console.log(model);
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.popup = false;
          console.log('완료');
        }
      );
  }

  private checkUser() {
    this.userService
      .checkUser(this.user.userId)
      .subscribe(
        (model: ResponseObject<User>) => {
          console.log(model);
          this.appAlarmService.changeMessage(model.message);
        },
        (err: AppError) => {
          console.log(err);
          if (err instanceof UserNotFoundError) {
            console.log('유저정보가 없음');
          }
        },
        () => {
          console.log('완료');
        }
      );
  }

  private validPassword(field) {

    if ( this.user.password === this.passwordConfirm) {
      // 폼 검증 수행해야 함
    } else {
      // 폼 검증 실패
    }

  }

  private checkEmptyPassword() {
    this.user.password === '' ? this.isPasswordEmpty = true : this.isPasswordEmpty = false;
  }

  private checkEmptyPasswordConfirm() {
    this.passwordConfirm === '' ? this.isPasswordConfirmEmpty = true : this.isPasswordConfirmEmpty = false;
  }

  private onClick(name) {
    console.log(name);
  }

  onValueChange(event) {
    console.log(event);
  }
}
