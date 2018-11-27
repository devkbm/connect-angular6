import { Component, OnInit } from '@angular/core';
import { ProgramGridComponent } from './program-grid.component';
import { ProgramFormComponent } from './program-form.component';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  visible = false;

  constructor(private drawerService: NzDrawerService) { }

  ngOnInit() {
  }

  open(): void {
    // this.visible = true;

    const drawerRef: NzDrawerRef = this.drawerService.create<ProgramFormComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzContent: ProgramFormComponent,
      nzContentParams: {
        value: 'text'
      }
    });

    //drawerRef.open();

  }

  close(): void {
    this.visible = false;
  }

  getProgramList(grid: ProgramGridComponent) {
    grid.getProgramList();
  }

  initForm(form: ProgramFormComponent) {
    form.programForm.reset();
    this.open();
  }

  saveProgram(form: ProgramFormComponent) {
    form.submitProgram();
  }

  deleteProgram(form: ProgramFormComponent) {
    form.deleteProgram();
  }

  selectedItem(item, form) {
    this.open();
    form.patchValue(item);
  }

  applyGridSavedData(form: ProgramFormComponent, grid: ProgramGridComponent) {
    this.close();
    const node = grid.getRowNode(form.programForm.get('programCode').value);
    if ( node != null ) {
      grid.setRowData(node, form.programForm.value);
    } else {
      grid.addRow(form.programForm.value);
    }
  }

}
