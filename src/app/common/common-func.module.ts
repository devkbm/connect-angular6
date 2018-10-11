import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { BoardFormComponent } from '../board/component/board-form.component';
import { BoardModule } from '../board/board.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserFormComponent } from './user/user-form.component';
import { UserService } from './service/user.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    BoardModule
  ],
  declarations: [
    LoginComponent,
    UserFormComponent
  ],
  exports: [
    LoginComponent,
    UserFormComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    LoginService,
    UserService
  ]
})
export class CommonFuncModule { }
