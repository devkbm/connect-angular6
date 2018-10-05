import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { MenuService } from '../../common-service/menu.service';
import { AppAlarmService } from '../../common-service/app-alarm.service';
import { MenuGroup } from '../../common-service/menu-group';
import { ResponseObject } from '../../common-service/model/response-object';
import { Menu } from '../../common-service/menu';
import { MenuHierarchy } from '../../common-service/menu-hierarchy';
import { ResponseList } from '../../common-service/model/response-list';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styles: ['']
})
export class MenuTreeComponent implements OnInit, OnChanges {

  @Input() menuGroupCode: String;
  items: MenuHierarchy[];

  constructor(private menuService: MenuService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    // this.menuGroupCode = 'GROUP';
    console.log('MenuTreeComponent init');
  }

  /**
   * input 값 변경시 적용되는 이벤트
   * @param changes 변경값
   */
  ngOnChanges(changes: SimpleChanges) {

    const code = changes.menuGroupCode.currentValue;
    this.menuService
      .getMenuHierarchy(code)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          console.log(model);
          if ( model.total > 0 ) {
            this.items = model.data;
          } else {
            this.items = null;
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
