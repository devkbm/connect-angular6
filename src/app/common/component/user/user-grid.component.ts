import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AggridFunction } from '../../grid/aggrid-function';

import { UserService } from '../../service/user.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { User } from '../../model/user-info';
import { ResponseList } from '../../model/response-list';


@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent extends AggridFunction implements OnInit {

  protected userList: User[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private userService: UserService,
              private appAlarmService: AppAlarmService) {

    super([]);

    this.columnDefs = [
        {
          headerName: '',
          width: 34,
          cellStyle: {'text-align': 'center', 'padding': '0px'},
          cellRenderer: 'buttonRenderer',
          cellRendererParams: {
            onClick: this.onEditButtonClick.bind(this),
            label: '',
            iconType: 'form'
          }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      {headerName: '아이디',        field: 'userId',  width: 100 },
      {headerName: '이름',          field: 'name',    width: 100 },
      {headerName: '계정잠금여부',  field: 'accountNonLocked',      width: 120 },
      {headerName: '계정만료여부',  field: 'accountNonExpired',     width: 120 },
      {headerName: '비번만료여부',  field: 'credentialsNonExpired', width: 120 }
    ];

    this.getRowNodeId = function(data) {
      return data.userId;
    };
  }

  ngOnInit() {
    this.getUserList();
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
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

  private selectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  private rowDbClicked(event) {
    this.rowDoubleClicked.emit(event.data);
  }

}
