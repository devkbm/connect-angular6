import { Component, OnInit } from '@angular/core';
import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';
import { MenuFormComponent } from './menu-form.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  protected menuGroupFormVisible = false;
  protected menuFormVisible = false;

  constructor() { }

  ngOnInit() {
  }

  menuGroupFormOpen(): void {
    this.menuGroupFormVisible = true;
  }

  menuGroupFormClose(): void {
    this.menuGroupFormVisible = false;
  }

  menuFormOpen(item, form: MenuFormComponent): void {
    this.menuFormVisible = true;

    form.getMenu(item.menuGroup.menuGroupCode, item.menuCode);
  }

  menuFormClose(): void {
    this.menuFormVisible = false;
  }

  getMenuGroupList(grid: MenuGroupGridComponent): void {
    grid.getMenuGroupList();
  }

  getMenuList(grid: MenuGridComponent): void {
    grid.getMenuList();
  }

  selectMenuGroup(item, grid: MenuGridComponent): void {    
    grid.menuGroupCode = item.menuGroupCode;
    grid.getMenuList();
  }


}
