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

import { Authority } from '../model/authority';

@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styles: ['']
})
export class AuthorityFormComponent implements OnInit {

  authorityForm: FormGroup;

  auth: Authority;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    this.authorityForm = this.fb.group({
      authority     : [ null, [ Validators.required ] ],
      description   : [ null]
    });
  }

  private getAuthority() {
    this.userService
      .getAuthority(this.authorityForm.get('authority').value)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          if (model.total > 0) {
            this.authorityForm.patchValue(model.data);
          } else {
            this.authorityForm.reset();
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
      .registerAuthority(this.authorityForm.value)
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
