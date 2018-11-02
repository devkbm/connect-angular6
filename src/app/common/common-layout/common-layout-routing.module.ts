import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonLayoutComponent } from './common-layout.component';

import { BoardFormComponent } from '../../board/component/board-form.component';
import { ArticleFormComponent } from '../../board/component/article-form.component';
import { UserFormComponent } from '../user/user-form.component';
import { MenuFormComponent } from '../menu/menu-form.component';
import { AuthorityFormComponent } from '../user/authority-form.component';
import { MenuGroupFormComponent } from '../menu/menu-group-form.component';
import { ProgramFormComponent } from '../menu/program-form.component';
import { BoardTreeComponent } from 'src/app/board/component/board-tree.component';
import { AuthorityGridComponent } from '../user/authority-grid.component';
import { AuthorityComponent } from '../user/authority.component';

const layoutroutes: Routes = [
  {
    path: 'home', component: CommonLayoutComponent,
    children: [
      {path: 'boardForm',     component: BoardFormComponent},
      {path: 'articleForm',   component: ArticleFormComponent},
      {path: 'boardTree',     component: BoardTreeComponent},
      {path: 'userForm',      component: UserFormComponent},
      {path: 'menuForm',      component: MenuFormComponent},
      {path: 'menuGroupForm', component: MenuGroupFormComponent},
      {path: 'programForm',   component: ProgramFormComponent},
      {path: 'authForm',      component: AuthorityFormComponent},
      {path: 'authGrid',      component: AuthorityGridComponent},
      {path: 'auth',          component: AuthorityComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(layoutroutes)],
  exports: [RouterModule]
})
export class CommonLayoutRoutingModule { }
