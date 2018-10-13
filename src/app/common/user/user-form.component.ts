import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { UserService } from '../service/user.service';

import { AppAlarmService } from '../service/app-alarm.service';
import { ResponseObject } from '../model/response-object';
import { User } from '../model/user-info';

import { AppError } from '../error/app-error';
import { UserNotFoundError } from '../error/user-not-found-error';
import { ResponseList } from '../model/response-list';
import { Authority } from '../model/authority';
import { MenuGroup } from '../model/menu-group';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: ['']
})
export class UserFormComponent implements OnInit {

  authList;
  menuGroupList;

  validateForm: FormGroup;

  listOfOption = [
                  {label: '11', value: '111'}
                , {label: '22', value: '222'}
                , {label: '33', value: '333'}
                ];  

  passwordConfirm: String;
  popup: boolean;

  @Output() messageChanged: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      userId          : [ null, [ Validators.required ] ],
      name            : [ null, [ Validators.required ] ],
      enabled         : [ true ],
      password        : [ null, [ Validators.required ] ],
      authorityList   : [ null],
      menuGroupList   : [ null]
    });

    this.getAuthorityList();
    this.getMenuGroupList();

  }

  private getUser() {
    this.userService
      .getUser(this.validateForm.get('userId').value)
      .subscribe(
        (model: ResponseObject<User>) => {
          if (model.total > 0) {
            this.validateForm.patchValue(model.data);
          } else {
            this.validateForm.reset();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
          this.validateForm.reset();
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
      .registerUser(this.validateForm.value)
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
      .deleteUser(this.validateForm.value)
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
      .checkUser(this.validateForm.get('userId').value)
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

    /*if ( this.user.password === this.passwordConfirm) {
      // 폼 검증 수행해야 함
    } else {
      // 폼 검증 실패
    }*/

  }

  private getAuthorityList() {
    this.userService
      .getAuthorityList()
      .subscribe(
        (model: ResponseList<Authority>) => {
          if (model.total > 0) {
            this.authList = model.data;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  private getMenuGroupList() {
    this.userService
      .getMenuGroupList()
      .subscribe(
        (model: ResponseList<MenuGroup>) => {
          if (model.total > 0) {
            this.menuGroupList = model.data;
          }
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
