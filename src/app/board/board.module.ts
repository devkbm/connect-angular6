import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardService } from './service/board.service';
import { FormsModule } from '@angular/forms';
import { BoardTreeComponent } from './component/board-tree.component';
import { BoardFormComponent } from './component/board-form.component';
import { ArticleFormComponent } from './component/article-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    BoardTreeComponent,
    BoardFormComponent,
    ArticleFormComponent
  ],
  providers: [
    BoardService
  ],
  exports: [
    BoardFormComponent
  ]
})
export class BoardModule { }
