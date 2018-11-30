import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGridComponent } from './user-grid.component';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  drawerVisible = false;

  queryKey = 'userId';
  queryValue = '';

  @ViewChild('userGrid')
  grid: UserGridComponent;

  @ViewChild('userForm')
  form: UserFormComponent;

  constructor() { }

  ngOnInit() {
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  openDrawer() {
    this.drawerVisible = true;
  }

  editDrawOpen(item) {
    this.form.getUser(item.userId);
    this.openDrawer();
  }

  getUserList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.grid.getUserList();
  }

  saveUser() {
    this.form.registerUser();
  }

  deleteUser() {
    this.form.deleteUser();
  }

  addRow() {
    this.grid.getRowNode(this.form.userForm.get('authority').value);
  }

  initForm() {
    this.form.userForm.reset();
  }

  applyGridSavedData() {
    const node = this.grid.getRowNode(this.form.userForm.get('userId').value);
    if ( node != null ) {
      this.grid.setRowData(node, this.form.userForm.value);
    } else {
      this.grid.getUserList();
    }
  }

}
