import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from '../service/user.service';
import { AppAlarmService } from '../service/app-alarm.service';

import { User } from '../model/user-info';
import { ResponseList } from '../model/response-list';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {

  protected columnDefs;
  protected getRowNodeId;
  private gridApi;
  private gridColumnApi;

  protected style = {
      width: '100%',
      height: '100%'
  };

  protected userList: User[];

  @Output()
  rowSelected = new EventEmitter();

  constructor(private userService: UserService,
              private appAlarmService: AppAlarmService) {

    this.columnDefs = [
      {headerName: 'No',            valueGetter: 'node.rowIndex + 1', width: 80 },
      {headerName: '아이디',        field: 'userId',  width: 200 },
      {headerName: '이름',          field: 'name',    width: 100 },
      {headerName: '계정잠금여부',  field: 'accountNonLocked',      width: 100 },
      {headerName: '계정만료여부',  field: 'accountNonExpired',     width: 100 },
      {headerName: '비번만료여부',  field: 'credentialsNonExpired', width: 100 }
    ];

    this.getRowNodeId = function(data) {
      return data.authority;
    };
  }

  ngOnInit() {

  }

  private onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

      // this.gridApi.setDomLayout('autoHeight');
  }

  setWidthAndHeight(width, height) {
    this.style = {
        width: width,
        height: height
    };
  }

  public getUserList(): void {
    this.userService
        .getUserList()
        .subscribe(
          (model: ResponseList<User>) => {
              if (model.total > 0) {
                  this.userList = model.data;
              } else {
                  this.userList = null;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
      );
  }

  public addRow(newItem: User) {
    const res = this.gridApi.updateRowData({ add: [newItem] });
  }

  public clearData() {
    this.gridApi.setRowData([]);
  }

  public getRowNodeByIndex(index: number) {
    return this.gridApi.getDisplayedRowAtIndex(index);
  }

  public getRowNode(id) {
    return this.gridApi.getRowNode(id);
  }

  /**
   * @description setDatas
   * @Param rowNode
   * @Param colnm
   * @Param data
   */
  public setData(rowNode, colnm, data) {
    rowNode.setDataValue(colnm, data);
  }

  /**
   * @Param rowNode
   * @Param data row에 적용될 data(객체)
   */
  public setRowData(rowNode, data) {
    rowNode.setData(data);
  }

  private selectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

}
