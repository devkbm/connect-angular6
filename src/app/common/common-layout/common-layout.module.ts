import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { CommonLayoutRoutingModule } from './common-layout-routing.module';

import { CommonLayoutComponent } from './common-layout.component';
import { AppAlarmService } from '../service/app-alarm.service';
import { MenuService } from '../service/menu.service';
import { ProgramService } from '../service/program.service';

@NgModule({
  imports: [
    CommonModule,
    CommonLayoutRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [
    CommonLayoutComponent
  ],
  providers: [
    AppAlarmService,
    MenuService,
    ProgramService
  ],
  exports: [CommonLayoutComponent]
})
export class CommonLayoutModule { }
