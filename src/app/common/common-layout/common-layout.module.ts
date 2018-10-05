import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonLayoutRoutingModule } from './common-layout-routing.module';
import { CommonLayoutComponent } from './common-layout.component';
import { AppAlarmService } from '../service/app-alarm.service';
import { MenuService } from '../service/menu.service';
import { ProgramService } from '../service/program.service';

import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';


/*import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuService } from '../common-service/menu.service';
import { ProgramService } from '../common-service/program.service';
import { MenuTreeComponent } from './sidebar/menu-tree.component';
import { MenuTreeNodeComponent } from './sidebar/menu-tree-node.component';*/

@NgModule({
  imports: [
    CommonModule,
    CommonLayoutRoutingModule
  ],
  declarations: [
    CommonLayoutComponent,
    MainComponent,
    HeaderComponent
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
