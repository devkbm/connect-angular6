import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from '../service/menu.service';
import { ProgramService } from '../service/program.service';
import { AppAlarmService } from '../service/app-alarm.service';

import { ResponseList } from '../model/response-list';
import { ResponseObject } from '../model/response-object';
import { Menu } from '../model/menu';
import { Program } from '../model/Program';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styles: ['']
})
export class MenuFormComponent implements OnInit {

  @Input()
  menuGroupCode: string;

  menuForm: FormGroup;
  programList;

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private programService: ProgramService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {

    this.menuForm = this.fb.group({
      menuGroupCode     : [ null, [ Validators.required ] ],
      menuCode          : [ null, [ Validators.required ] ],
      menuName          : [ null, [ Validators.required ] ],
      parentMenuCode    : [ null],
      sequence          : [ null],
      program           : [ null]
    });

    this.getProgramList();

  }

  private getMenu() {
    this.menuService
      .getMenu(this.menuForm.value)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          console.log(model);
          if ( model.total > 0 ) {
            this.menuForm.patchValue(model.data);
          } else {
            this.menuForm.reset();
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('메뉴 조회 완료');
        }
      );
  }

  private submitMenu() {
    this.menuService
      .registerMenu(this.menuForm.value)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          console.log(model);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('메뉴 등록 완료');
        }
      );
  }

  private getProgramList() {
    this.programService
      .getProgramList()
      .subscribe(
        (model: ResponseList<Program>) => {
          console.log(model.data);
          if (model.total > 0) {
            this.programList = model.data;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('프로그램 조회 완료');
        }
      );
  }

}
