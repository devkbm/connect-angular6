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

    protected columnDefs;
    protected getRowNodeId;
    private gridApi;
    private gridColumnApi;

    protected style = {
        width: '100%',
        height: '100%'
    };

    protected authorityList: Authority[];

    @Output()
    rowSelected = new EventEmitter();

    constructor(private userService: UserService,
                private appAlarmService: AppAlarmService) { 

        this.columnDefs = [
            {headerName: '권한',    field: 'authority',     width: 100 },
            {headerName: '설명',    field: 'description',   width: 200 }
        ];

        this.getRowNodeId = function(data) {
            return data.authority;
        };
    }

    ngOnInit() {
        this.getAuthority();

        this.setWidthAndHeight('100%', '700px');
    }

    setWidthAndHeight(width, height) {
        this.style = {
            width: width,
            height: height
        };
    }

    private onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        // this.gridApi.setDomLayout('autoHeight');
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

    public getRowNodeByIndex(index: number) {
        return this.gridApi.getDisplayedRowAtIndex(index); 
    }

    public getRowNode(id) {
        return this.gridApi.getRowNode(id);
    }

    /**
     * @description setDatas
     * @param rowNode
     * @param colnm
     * @param data
     */
    public setData(rowNode, colnm, data) {
        rowNode.setDataValue(colnm, data);
    }

    /**
     * @param rowNode
     * @param data row에 적용될 data(객체)
     */
    public setRowData(rowNode, data) {
        rowNode.setData(data);
    }

    private selectionChanged(event) {
        const selectedRows = this.gridApi.getSelectedRows();

        this.rowSelected.emit(selectedRows[0]);
    }

}
