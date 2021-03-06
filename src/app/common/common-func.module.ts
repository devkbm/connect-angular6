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
import { AuthorityFormComponent } from './component/authority/authority-form.component';
import { AuthorityGridComponent } from './component/authority/authority-grid.component';
import { AuthorityComponent } from './component/authority/authority.component';
import { UserGridComponent } from './component/user/user-grid.component';
import { UserFormComponent } from './component/user/user-form.component';
import { UserComponent } from './component/user/user.component';
import { ProgramFormComponent } from './component/program/program-form.component';
import { ProgramGridComponent } from './component/program/program-grid.component';
import { ProgramComponent } from './component/program/program.component';
import { MenuGroupGridComponent } from './component/menu/menu-group-grid.component';
import { MenuGridComponent } from './component/menu/menu-grid.component';
import { MenuComponent } from './component/menu/menu.component';
import { ButtonRendererComponent } from './grid/renderer/button-renderer.component';
import { UserDuplicationValidatorDirective } from './validator/user-duplication-validator.directive';
import { TermComponent } from './component/terms/term.component';
import { TermGridComponent } from './component/terms/term-grid.component';
import { TermFormComponent } from './component/terms/term-form.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    AppRoutingModule
  ],
  declarations: [
    UserDuplicationValidatorDirective,
    LoginComponent,
    ButtonRendererComponent,
    UserFormComponent,
    UserGridComponent,
    UserComponent,
    MenuFormComponent,
    MenuGridComponent,
    MenuGroupFormComponent,
    MenuGroupGridComponent,
    MenuComponent,
    ProgramFormComponent,
    ProgramGridComponent,
    ProgramComponent,
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent,
    TermGridComponent,
    TermFormComponent,
    TermComponent
  ],
  exports: [
    LoginComponent,
    UserFormComponent,
    UserGridComponent,
    UserComponent,
    MenuFormComponent,
    MenuGroupFormComponent,
    ProgramFormComponent,
    ProgramGridComponent,
    ProgramComponent,
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent,
    TermComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    LoginService,
    UserService
  ]
})
export class CommonFuncModule { }
