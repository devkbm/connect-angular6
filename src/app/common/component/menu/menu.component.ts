import { Component, OnInit } from '@angular/core';
import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuGroupFormVisible = false;
  menuFormVisible;

  constructor() { }

  ngOnInit() {
  }

  menuGroupFormOpen(): void {
    this.menuGroupFormVisible = true;
  }

  menuGroupFormClose(): void {
    this.menuGroupFormVisible = false;
  }

  getMenuGroupList(grid: MenuGroupGridComponent): void {
    grid.getMenuGroupList();
  }

  getMenuList(grid: MenuGridComponent): void {
    grid.getMenuList();
  }

  selectMenuGroup(item, grid: MenuGridComponent): void {
    console.log(item);
    grid.menuGroupCode = item.menuGroupCode;
    grid.getMenuList();
  }


}
