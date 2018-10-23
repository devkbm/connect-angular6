import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { BoardService } from '.././service/board.service';

import { ResponseObject } from '../../common/model/response-object';
import { Board } from '.././model/board';

@Component({
  selector: 'app-board',
  templateUrl: './board-form.component.html',
  styles: ['']
})
export class BoardFormComponent implements OnInit {

  boardForm: FormGroup;

  board: Board;

  constructor(private fb: FormBuilder,
              private boardService: BoardService) { }

  ngOnInit() {
    this.board = new Board();
    
    this.boardForm = this.fb.group({
      menuGroupCode     : [ null, [ Validators.required ] ],
      menuCode          : [ null, [ Validators.required ] ],
      menuName          : [ null, [ Validators.required ] ],
      parentMenuCode    : [ null],
      sequence          : [ null],
      program           : [ null]
    });

  }

  getBoard(id: number) {
    this.boardService.getBoard(this.board.pkBoard)
      .subscribe(
        (model: ResponseObject<Board>) => {
          if (model.data) {
            this.board = model.data;
          } else {
            this.board = new Board();
          }
        },
        (err) => {},
        () => {}
    );
  }

  private saveBoard(f) {
    console.log(f);
    this.boardService
      .saveBoard(this.board)
      .subscribe(
        (model: ResponseObject<Board>) => {
          console.log(model);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  private deleteBoard() {
    this.boardService
      .deleteBoard(this.board)
      .subscribe(
        (model: ResponseObject<Board>) => {
          console.log(model);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  private setParentBoard(ppkBoard) {
    this.board.ppkBoard = ppkBoard;
  }

}
