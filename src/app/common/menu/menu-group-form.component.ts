import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from '../service/menu.service';
import { AppAlarmService } from '../service/app-alarm.service';

import { ResponseObject } from '../model/response-object';
import { MenuGroup } from '../model/menu-group';

@Component({
  selector: 'app-menu-group-form',
  templateUrl: './menu-group-form.component.html',
  styles: ['']
})
export class MenuGroupFormComponent implements OnInit {

  menuGroupForm: FormGroup;

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    this.menuGroupForm = this.fb.group({
      menuGroupCode   : [ null, [ Validators.required ] ],
      menuGroupName   : [ null, [ Validators.required ] ],
      description     : [ null]
    });

  }

  private getMenuGroup(menuGroupCode: string) {
    this.menuService
      .getMenuGroup(menuGroupCode)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          if ( model.total > 0 ) {
            this.menuGroupForm.patchValue(model.data);
          } else {
            this.menuGroupForm.reset();
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

  private submitMenuGroup() {
    this.menuService
      .registerMenuGroup(this.menuGroupForm.value)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
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
