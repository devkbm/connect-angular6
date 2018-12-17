import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { Authority } from 'src/app/common/model/authority';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent extends AggridFunction implements OnInit {

  protected authorityList: Authority[];
  

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService) { 
    super([]);

    this.columnDefs = [
      {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 70,
          cellStyle: {'text-align': 'center'}
      },
      {
          headerName: '권한',
          field: 'authority',
          width: 100
      },
      {
          headerName: '설명',
          field: 'description',
          width: 500,
          autoHeight: true
      }
    ];

    this.getRowNodeId = function(data) {
        return data.authority;
    };
  }

  ngOnInit() {
  }

}
