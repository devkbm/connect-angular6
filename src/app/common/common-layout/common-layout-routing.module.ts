import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonLayoutComponent } from './common-layout.component';

import { BoardFormComponent } from '../../board/component/board-form.component';
import { ArticleFormComponent } from '../../board/component/article-form.component';

import { MenuFormComponent } from '../component/menu/menu-form.component';
import { MenuGroupFormComponent } from '../component/menu/menu-group-form.component';
import { ProgramFormComponent } from '../component/program/program-form.component';
import { AuthorityFormComponent } from '../component/authority/authority-form.component';
import { AuthorityGridComponent } from '../component/authority/authority-grid.component';
import { AuthorityComponent } from '../component/authority/authority.component';
import { UserFormComponent } from '../component/user/user-form.component';
import { UserGridComponent } from '../component/user/user-grid.component';
import { UserComponent } from '../component/user/user.component';
import { ProgramGridComponent } from '../component/program/program-grid.component';

const layoutroutes: Routes = [
  {
    path: 'home', component: CommonLayoutComponent,
    children: [
      {path: 'boardForm',     component: BoardFormComponent},
      {path: 'articleForm',   component: ArticleFormComponent},
      {path: 'userForm',      component: UserFormComponent},
      {path: 'userGrid',      component: UserGridComponent},
      {path: 'user',          component: UserComponent},
      {path: 'menuForm',      component: MenuFormComponent},
      {path: 'menuGroupForm', component: MenuGroupFormComponent},
      {path: 'programForm',   component: ProgramFormComponent},
      {path: 'programGrid',   component: ProgramGridComponent},
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
