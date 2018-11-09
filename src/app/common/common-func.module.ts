import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { BoardFormComponent } from '../board/component/board-form.component';
import { BoardModule } from '../board/board.module';
import { AppRoutingModule } from '../app-routing.module';

import { LoginService } from './service/login.service';
import { UserService } from './service/user.service';

import { LoginComponent } from './component/login/login.component';
import { MenuFormComponent } from './component/menu/menu-form.component';
import { MenuGroupFormComponent } from './component/menu/menu-group-form.component';
import { ProgramFormComponent } from './component/menu/program-form.component';
import { AuthorityFormComponent } from './component/authority/authority-form.component';
import { AuthorityGridComponent } from './component/authority/authority-grid.component';
import { AuthorityComponent } from './component/authority/authority.component';
import { UserGridComponent } from './component/user/user-grid.component';
import { UserFormComponent } from './component/user/user-form.component';
import { UserComponent } from './component/user/user.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    BoardModule
  ],
  declarations: [
    LoginComponent,
    UserFormComponent,
    UserGridComponent,
    UserComponent,
    MenuFormComponent,
    MenuGroupFormComponent,
    ProgramFormComponent,
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent
  ],
  exports: [
    LoginComponent,
    UserFormComponent,
    UserGridComponent,
    UserComponent,
    MenuFormComponent,
    MenuGroupFormComponent,
    ProgramFormComponent,
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    LoginService,
    UserService
  ]
})
export class CommonFuncModule { }
