import { Component, OnInit, Output, EventEmitter } from '@angular/core';


import { AggridFunction } from '../aggrid-function';
import { MenuGroup } from '../../model/menu-group';
import { MenuService } from '../../service/menu.service';
import { AppAlarmService } from '../../service/app-alarm.service';
import { ResponseList } from '../../model/response-list';

@Component({
  selector: 'app-menu-group-grid',
  templateUrl: './menu-group-grid.component.html',
  styleUrls: ['./menu-group-grid.component.css']
})
export class MenuGroupGridComponent extends AggridFunction implements OnInit {

  @Output()
  rowSelected = new EventEmitter();

  protected menuGroupList: MenuGroup[];

  constructor(private menuService: MenuService,
              private appAlarmService: AppAlarmService) {
    super([
      {headerName: 'No',            valueGetter: 'node.rowIndex + 1', width: 80 },
      {headerName: '메뉴그룹코드',  field: 'menuGroupCode',     width: 150 },
      {headerName: '메뉴그룹명',    field: 'menuGroupName',     width: 200 },
      {headerName: '설명',          field: 'description',     width: 300 }
    ]);

    this.getRowNodeId = function(data) {
        return data.menuGroupCode;
    };
  }

  ngOnInit() {
    this.getMenuGroupList();    
  }

  public getMenuGroupList(): void {
    this.menuService
        .getMenuGroupList()
        .subscribe(
          (model: ResponseList<MenuGroup>) => {
              if (model.total > 0) {
                  this.menuGroupList = model.data;
              } else {
                  this.menuGroupList = null;
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
