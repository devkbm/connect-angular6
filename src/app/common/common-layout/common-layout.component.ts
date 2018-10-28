import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';

import { AppAlarmService } from '../service/app-alarm.service';
import { MenuService } from '../service/menu.service';

import { MenuGroup } from '../model/menu-group';
import { MenuHierarchy } from '../model/menu-hierarchy';
import { ResponseList } from '../model/response-list';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})
export class CommonLayoutComponent implements OnInit {

  isCollapsed: Boolean = false;
  selectedValue: string;
  message: string;
  menuGroupCode: string;

  menuGroupList: MenuGroup[];
  menuItems: MenuHierarchy[];

  @ViewChild('treeCom') treeCom;

  constructor(private appAlarmService: AppAlarmService,
              private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.appAlarmService.currentMessage.subscribe(message => this.message = message);

    const stringMenuGroupList = sessionStorage.getItem('menuGroupList');
    this.menuGroupList = JSON.parse(stringMenuGroupList);

    console.log('선택된 메뉴그룹' + sessionStorage.getItem('selectedMenuGroup'));

    this.selectedValue = sessionStorage.getItem('selectedMenuGroup');

    if (this.selectedValue != null) {
      this.selectMenuGroup(this.selectedValue);
    }
  }

  sendMen(mess) {
    this.menuGroupCode = mess;
  }

  selectMenuGroup(value: string): void {

    sessionStorage.setItem('selectedMenuGroup', value);

    this.menuService
      .getMenuHierarchy(value)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuItems = model.data;
          } else {
            this.menuItems = null;
          }

          const seledtedMenu = sessionStorage.getItem('selectedMenu');
          console.log(this.treeCom);
          this.treeCom.nzSelectedKeys = [seledtedMenu];

        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('메뉴 조회 완료');
        }
      );
  }

  selectMenu(event: NzFormatEmitEvent): void {
    // console.log(event, event.selectedKeys, event.keys, event.nodes);
    // console.log(event.nodes[0].origin);
    const node = event.nodes[0].origin;
    sessionStorage.setItem('selectedMenu', node.key);

    this.router.navigate(['/home/' + node.url]);
  }

}
