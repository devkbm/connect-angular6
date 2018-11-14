import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { UserService } from '../../service/user.service';

import { AppAlarmService } from '../../service/app-alarm.service';
import { ResponseObject } from '../../model/response-object';
import { User } from '../../model/user-info';

import { AppError } from '../../error/app-error';
import { UserNotFoundError } from '../../error/user-not-found-error';
import { ResponseList } from '../../model/response-list';
import { Authority } from '../../model/authority';
import { MenuGroup } from '../../model/menu-group';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  authList;
  menuGroupList;

  public userForm: FormGroup;

  passwordConfirm: String;
  popup: boolean;

  @Output()
  dataSaved = new EventEmitter();

  @Output()
  dataDeleted = new EventEmitter();

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {

    this.userForm = this.fb.group({
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

  public getUser(userId: string) {
    this.userService
      .getUser(userId)
      .subscribe(
        (model: ResponseObject<User>) => {
          if (model.total > 0) {
            this.userForm.patchValue(model.data);
          } else {
            this.userForm.reset();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
          this.userForm.reset();
        },
        () => {
          console.log('완료');
        }
      );
  }

  public registerUser() {
    /*if ( this.isValidPassword !== true ) {
      return;
    }*/

    this.userService
      .registerUser(this.userForm.value)
      .subscribe(
        (model: ResponseObject<User>) => {          
          this.appAlarmService.changeMessage(model.message);
          this.dataSaved.emit(this.userForm.value);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public deleteUser() {
    this.userService
      .deleteUser(this.userForm.value)
      .subscribe(
        (model: ResponseObject<User>) => {          
          this.appAlarmService.changeMessage(model.message);
          this.dataDeleted.emit(this.userForm.value);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.popup = false;          
        }
      );
  }

  protected checkUser() {
    this.userService
      .checkUser(this.userForm.get('userId').value)
      .subscribe(
        (model: ResponseObject<User>) => {          
          this.appAlarmService.changeMessage(model.message);
        },
        (err: AppError) => {          
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