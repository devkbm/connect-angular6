import { MenuGroupFormComponent } from './menu-group-form.component';
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

  protected selectedMenuGroupCode:string = null;

  constructor() { }

  ngOnInit() {
  }

  menuGroupFormOpen(item, form: MenuGroupFormComponent): void {
    this.menuGroupFormVisible = true;

    form.menuGroupForm.patchValue(item);
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
    this.menuGroupFormClose();    
    grid.getMenuGroupList();
  }

  getMenuList(grid: MenuGridComponent): void {
    this.menuFormClose();
    grid.getMenuList(this.selectedMenuGroupCode);
  }

  selectMenuGroup(item, grid: MenuGridComponent): void {
    this.selectedMenuGroupCode = item.menuGroupCode;    
    this.getMenuList(grid);
  }


}
