import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { Article } from '../model/article';
import { BoardService } from '../service/board.service';
import { ResponseList } from 'src/app/common/model/response-list';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent extends AggridFunction implements OnInit {

  protected articleList: Article[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private boardService: BoardService) {
    super([]);

    this.columnDefs = [
      {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 70,
          cellStyle: {'text-align': 'center'}
      },
      {
          headerName: '제목',
          field: 'title',
          width: 500
      },
      {
          headerName: '등록일자',
          field: 'createdDt',
          width: 100
      },
      {
          headerName: '수정일자',
          field: 'modifiedDt',
          width: 100
      }
    ];

    this.getRowNodeId = function(data) {
        return data.authority;
    };
  }

  ngOnInit() {
    this.setWidthAndHeight('100%', '600px');
  }

  getArticleList(fkBoard): void {
    this.boardService
        .getArticleList(fkBoard)
        .subscribe(
          (model: ResponseList<Article>) => {
              if (model.total > 0) {
                  this.articleList = model.data;
              } else {
                  this.articleList = null;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

}
