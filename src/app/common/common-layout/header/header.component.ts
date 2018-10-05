import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppAlarmService } from '../../service/app-alarm.service';
import { MenuService } from '../../service/menu.service';
import { MenuGroup } from '../../model/menu-group';
import { MenuHierarchy } from '../../model/menu-hierarchy';
import { ResponseObject } from '../../model/response-object';
import { ResponseList } from '../../model/response-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Connect';
  menuGroupList: MenuGroup[];

  @Output()
  menuChanged: EventEmitter<String> = new EventEmitter();


  constructor(private menuService: MenuService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    const stringMenuGroupList = sessionStorage.getItem('menuGroupList');
    this.menuGroupList = JSON.parse(stringMenuGroupList);
    console.log(this.menuGroupList);
  }

  private getMenuGroup(menuGroupCode: string) {
    this.menuService
      .getMenuGroup(menuGroupCode)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          if ( model.total > 0 ) {

          } else {

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

  // 직접 메뉴를 조회하는게 아니라 이벤트 발생해야함
  // 메뉴트리 컴포넌트에서 메뉴가 조회되도록 수정 필요
  public getMenuList(menuGroupCode: string) {
    console.log(menuGroupCode);

    this.menuChanged.emit(menuGroupCode);

    /*this.menuService
      .getMenuHierarchy(menuGroupCode)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            console.log(model.data);
          } else {

          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );*/

  }

}
