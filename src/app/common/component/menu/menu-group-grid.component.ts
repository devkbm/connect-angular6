import { Component, OnInit, Output, EventEmitter } from '@angular/core';


import { AggridFunction } from '../../grid/aggrid-function';
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
  
  @Output()
  editButtonClicked = new EventEmitter();

  protected menuGroupList: MenuGroup[];

  constructor(private menuService: MenuService,
              private appAlarmService: AppAlarmService) {    

    super([]);    

    this.columnDefs = [
      {headerName: 'No',            valueGetter: 'node.rowIndex + 1', width: 80, headerClass: 'text-center' },
      {headerName: '메뉴그룹코드',  field: 'menuGroupCode',     width: 150, cellStyle: {'text-align': 'center'} },
      {headerName: '메뉴그룹명',    field: 'menuGroupName',     width: 200 },
      {headerName: '설명',          field: 'description',       width: 300, headerClass: 'text-center' },
      {
        headerName: 'action',     
        width: 50, 
        cellStyle: {'text-align': 'center'},
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick1.bind(this),
          label: '',
          iconType: 'form'
        }
      }
    ];

    this.getRowNodeId = function(data) {
        return data.menuGroupCode;
    };
  }

  onBtnClick1(e) {
    console.log(e.rowData);
    this.editButtonClicked.emit(e.rowData);
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
