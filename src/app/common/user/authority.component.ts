import { Component, OnInit } from '@angular/core';
import { AuthorityGridComponent } from './authority-grid.component';
import { AuthorityFormComponent } from './authority-form.component';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedItem(item, form) {
    form.patchValue(item);
  }

  getAuthorityList(grid: AuthorityGridComponent) {
    grid.getAuthority();
  }

  saveAuthority(form: AuthorityFormComponent) {
    form.saveAuthority();
  }

  deleteAuthority(form: AuthorityFormComponent) {
    form.deleteAuthority();
  }

  addRow(form: AuthorityFormComponent, grid: AuthorityGridComponent) {
    grid.getRowNode(form.authorityForm.get('authority').value);
  }

  initForm(form: AuthorityFormComponent) {
    form.authorityForm.reset();
  }

  applyGridSavedData(form: AuthorityFormComponent, grid: AuthorityGridComponent) {
    const node = grid.getRowNode(form.authorityForm.get('authority').value);
    if ( node != null ) {
      grid.setRowData(node, form.authorityForm.value);
    } else {
      grid.addRow(form.authorityForm.value);
    }
  }

}
