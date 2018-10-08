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

  constructor(private data: AppAlarmService,
              private menuService: MenuService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);

    const stringMenuGroupList = sessionStorage.getItem('menuGroupList');
    this.menuGroupList = JSON.parse(stringMenuGroupList);
    console.log(this.menuGroupList);
  }

  sendMen(mess) {
    this.menuGroupCode = mess;
    console.log(mess);
  }

  selectMenuGroup(value: string): void {
    console.log(value);

    this.menuService
      .getMenuHierarchy(value)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuItems = model.data;
          } else {
            this.menuItems = null;
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

  selectMenu(event: NzFormatEmitEvent): void {
    //console.log(event, event.selectedKeys, event.keys, event.nodes);
    console.log(event.nodes[0].origin.url);
    // console.log(event.keys[0]);
     this.router.navigate(['/home/' + event.nodes[0].origin.url]);

  }

}
