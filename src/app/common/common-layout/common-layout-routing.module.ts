import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonLayoutComponent } from './common-layout.component';

import { BoardFormComponent } from '../../board/component/board-form.component';

import { BoardTreeComponent } from '../../board/component/board-tree.component';
import { ArticleFormComponent } from '../../board/component/article-form.component';
import { UserFormComponent } from '../user/user-form.component';

const layoutroutes: Routes = [
  {
    path: 'home', component: CommonLayoutComponent,
    children: [
      {path: 'boardForm',     component: BoardFormComponent},
      {path: 'menuForm',      component: BoardFormComponent},
      // {path: 'boardTree',     component: BoardTreeComponent},
      {path: 'articleForm',   component: ArticleFormComponent},
      {path: 'userForm',      component: UserFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(layoutroutes)],
  exports: [RouterModule]
})
export class CommonLayoutRoutingModule { }
