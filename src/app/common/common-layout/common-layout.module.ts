import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { CommonLayoutRoutingModule } from './common-layout-routing.module';

import { CommonLayoutComponent } from './common-layout.component';
import { AppAlarmService } from '../service/app-alarm.service';
import { MenuService } from '../service/menu.service';
import { ProgramService } from '../service/program.service';

import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

/*import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuService } from '../common-service/menu.service';
import { ProgramService } from '../common-service/program.service';
import { MenuTreeComponent } from './sidebar/menu-tree.component';
import { MenuTreeNodeComponent } from './sidebar/menu-tree-node.component';*/

@NgModule({
  imports: [
    CommonModule,
    CommonLayoutRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ],
  declarations: [
    CommonLayoutComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent
    /*MainComponent,
    SidebarComponent,
    MenuTreeComponent,
    MenuTreeNodeComponent*/
  ],
  providers: [
    AppAlarmService,
    MenuService,
    ProgramService
  ],
  exports: [CommonLayoutComponent]
})
export class CommonLayoutModule { }
