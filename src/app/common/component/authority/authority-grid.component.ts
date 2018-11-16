import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from '../../service/user.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { Authority } from '../../model/authority';
import { ResponseList } from '../../model/response-list';
import { AggridFunction } from '../aggrid-function';

@Component({
  selector: 'app-authority-grid',
  templateUrl: './authority-grid.component.html',
  styleUrls: ['./authority-grid.component.css']
})
export class AuthorityGridComponent extends AggridFunction implements OnInit {

    protected authorityList: Authority[];

    @Output()
    rowSelected = new EventEmitter();

    constructor(private userService: UserService,
                private appAlarmService: AppAlarmService) {

        super([
            {headerName: 'No',      valueGetter: 'node.rowIndex + 1', width: 80 },
            {headerName: '권한',    field: 'authority',     width: 100 },
            {headerName: '설명',    field: 'description',   width: 200 }
          ]);

        this.getRowNodeId = function(data) {
            return data.authority;
        };
    }

    ngOnInit() {
        this.getAuthority();

        //this.setWidthAndHeight('100%', '100%');
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

    private selectionChanged(event) {
        const selectedRows = this.gridApi.getSelectedRows();

        this.rowSelected.emit(selectedRows[0]);
    }

}
