import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProgramService } from '../../service/program.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseList } from '../../model/response-list';
import { Program } from '../../model/Program';
import { AggridFunction } from '../aggrid-function';

@Component({
  selector: 'app-program-grid',
  templateUrl: './program-grid.component.html',
  styleUrls: ['./program-grid.component.css']
})
export class ProgramGridComponent extends AggridFunction implements OnInit {

  @Output()
  rowSelected = new EventEmitter();

  protected programList: Program[];

  constructor(private programService: ProgramService,
              private appAlarmService: AppAlarmService) {

    super([
      {headerName: 'No',            valueGetter: 'node.rowIndex + 1', width: 80 },
      {headerName: '프로그램코드',  field: 'programCode',     width: 150 },
      {headerName: '프로그램명',    field: 'programName',     width: 200 },
      {headerName: 'Url',           field: 'url',             width: 200 },
      {headerName: '설명',          field: 'description',     width: 300 }
    ]);

    this.getRowNodeId = function(data) {
        return data.programCode;
    };
  }

  ngOnInit() {
    this.getProgramList();

    this.setWidthAndHeight('100%', '700px');
  }

  public getProgramList(): void {
    this.programService
        .getProgramList()
        .subscribe(
          (model: ResponseList<Program>) => {
              if (model.total > 0) {
                  this.programList = model.data;
              } else {
                  this.programList = null;
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
