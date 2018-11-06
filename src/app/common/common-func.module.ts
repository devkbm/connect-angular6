import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { BoardFormComponent } from '../board/component/board-form.component';
import { BoardModule } from '../board/board.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserFormComponent } from './user/user-form.component';
import { UserService } from './service/user.service';
import { MenuFormComponent } from './menu/menu-form.component';
import { AuthorityFormComponent } from './user/authority-form.component';
import { MenuGroupFormComponent } from './menu/menu-group-form.component';
import { ProgramFormComponent } from './menu/program-form.component';
import { AuthorityGridComponent } from './user/authority-grid.component';
import { AuthorityComponent } from './user/authority.component';

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
