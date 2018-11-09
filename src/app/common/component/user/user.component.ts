import { Component, OnInit } from '@angular/core';
import { UserGridComponent } from './user-grid.component';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedItem(item, form) {    
    form.getUser(item.userId);    
  }

  getUserList(grid: UserGridComponent) {
    grid.getUserList();
  }

  saveUser(form: UserFormComponent) {
    form.registerUser();
  }

  deleteUser(form: UserFormComponent) {
    form.deleteUser();
  }

  addRow(form: UserFormComponent, grid: UserGridComponent) {
    grid.getRowNode(form.userForm.get('authority').value);
  }

  initForm(form: UserFormComponent) {
    form.userForm.reset();
  }

  applyGridSavedData(form: UserFormComponent, grid: UserGridComponent) {
    const node = grid.getRowNode(form.userForm.get('userId').value);
    if ( node != null ) {
      grid.setRowData(node, form.userForm.value);
    } else {
      grid.addRow(form.userForm.value);
    }
  }

  test(form: UserFormComponent, grid: UserGridComponent) {
    grid.selectCell(1,'userId');
  }

}
