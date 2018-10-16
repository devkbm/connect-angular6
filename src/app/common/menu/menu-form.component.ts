import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from '../../common-service/menu.service';
import { AppAlarmService } from '../../common-service/app-alarm.service';
import { MenuGroup } from '../../common-service/menu-group';
import { ResponseObject } from '../../common-service/model/response-object';
import { Menu } from '../../common-service/menu';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styles: ['']
})
export class MenuFormComponent implements OnInit {

  @Input()
  menuGroupCode: string;

  menu: Menu;

  validateForm: FormGroup;

  constructor(private menuService: MenuService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    this.menu = new Menu();
    this.menu.menuGroupCode = this.menuGroupCode;
    console.log('MenuFormComponent init');
  }

  private getMenu() {
    this.menuService
      .getMenu(this.menu)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          console.log(model);
          if ( model.total > 0 ) {
            this.menu = model.data;
          } else {
            this.menu = new Menu();
            this.menu.menuGroupCode = this.menuGroupCode;
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

  private submitMenu() {
    this.menuService
      .registerMenu(this.menu)
      .subscribe(
        (model: ResponseObject<Menu>) => {
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

  private onValueChange(value) {
    console.log(value);
  }

}
