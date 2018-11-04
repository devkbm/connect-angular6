import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from '../service/user.service';
import { AppAlarmService } from '../service/app-alarm.service';

import { ResponseObject } from '../model/response-object';

import { Authority } from '../model/authority';
import { ResponseList } from '../model/response-list';

@Component({
  selector: 'app-authority-grid',
  templateUrl: './authority-grid.component.html',
  styleUrls: ['./authority-grid.component.css']
})
export class AuthorityGridComponent implements OnInit {

    columnDefs = [
        {headerName: '아이디',    field: 'id',     width: 100 },
        {headerName: '권한',    field: 'authority',     width: 100 },
        {headerName: '설명',    field: 'description',   width: 200 }
    ];

    @Output()
    rowSelected = new EventEmitter();

    public authorityList: Authority[];
    private gridApi;
    private gridColumnApi;

    constructor(private userService: UserService,
                private appAlarmService: AppAlarmService) { }

    ngOnInit() {
        this.getAuthority();
    }

    private onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    public getAuthority(): void {
        this.userService
            .getAuthorityList()
            .subscribe(
                (model: ResponseList<Authority>) => {
                    if (model.total > 0) {
                        this.authorityList = model.data;
                    } else {
                        this.authorityList = null;
                    }
                    this.appAlarmService.changeMessage(model.message);
                },
                (err) => {
                    console.log(err);
                },
                () => {}
            );
    }

    public addRow(newItem: Authority) {
        const res = this.gridApi.updateRowData({ add: [newItem] });
        // this.gridApi.setRowData([newItem]);
    }

    public clearData() {
        this.gridApi.setRowData([]);
    }

    public getRowNode(id) {
        return this.gridApi.getRowNode('1');
        //return this.gridApi.getDisplayedRowAtIndex(0);
    }

    public setData(rowNode, colnm, data) {
        rowNode.setDataValue(colnm, data);
    }

    private selectionChanged(event) {
        const selectedRows = this.gridApi.getSelectedRows();

        this.rowSelected.emit(selectedRows[0]);
    }

}
