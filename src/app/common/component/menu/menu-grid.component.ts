import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


import { AggridFunction } from '../../grid/aggrid-function';

import { MenuService } from '../../service/menu.service';
import { AppAlarmService } from '../../service/app-alarm.service';
import { ResponseList } from '../../model/response-list';
import { Menu } from '../../model/menu';

@Component({
  selector: 'app-menu-grid',
  templateUrl: './menu-grid.component.html',
  styleUrls: ['./menu-grid.component.css']
})
export class MenuGridComponent extends AggridFunction implements OnInit {

  @Output()
  rowSelected = new EventEmitter();

  @Input()
  menuGroupCode: string;

  protected menuList: Menu[];

  constructor(private menuService: MenuService,
    private appAlarmService: AppAlarmService) {
      super([
        {headerName: 'No',            valueGetter: 'node.rowIndex + 1', width: 80 },
        {headerName: '메뉴그룹코드',  field: 'menuGroup.menuGroupCode', width: 80 },
        {headerName: '메뉴코드',      field: 'menuCode',                width: 100 },
        {headerName: '메뉴명',        field: 'menuName',                width: 150 },
        {headerName: '메뉴타입',      field: 'menuType.name',           width: 100 },
        {headerName: '상위메뉴',      field: 'parent.menuCode',         width: 100 },
        {headerName: '순번',          field: 'sequence',                width: 80 },
        {headerName: '프로그램',      field: 'program.programCode',     width: 100 }
      ]);

      this.getRowNodeId = function(data) {
          return data.menuCode;
      };
  }

  ngOnInit() {

  }

  public getMenuList() {

    this.menuService
        .getMenuList(this.menuGroupCode)
        .subscribe(
          (model: ResponseList<Menu>) => {
              if (model.total > 0) {
                  this.menuList = model.data;
              } else {
                  this.menuList = null;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  private selectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }
}
