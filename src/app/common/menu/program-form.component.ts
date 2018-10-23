import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ProgramService } from '../service/program.service';
import { AppAlarmService } from '../service/app-alarm.service';

import { ResponseObject } from '../model/response-object';
import { Program } from '../model/Program';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styles: ['']
})
export class ProgramFormComponent implements OnInit {

  programForm: FormGroup;

  constructor(private fb: FormBuilder,
              private programService: ProgramService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {

    this.programForm = this.fb.group({
      programCode   : [ null, [ Validators.required ] ],
      programName   : [ null, [ Validators.required ] ],
      url           : [ null, [ Validators.required ] ],
      description   : [ null]
    });
  }

  private getProgram() {
    this.programService
      .getProgram(this.programForm.get('programCode').value)
      .subscribe(
        (model: ResponseObject<Program>) => {
          console.log(model);
          if ( model.total > 0 ) {
            this.programForm.patchValue(model.data);
          } else {
            this.programForm.reset();
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('프로그램 조회 완료');
        }
      );
  }

  private submitProgram() {
    this.programService
      .registerProgram(this.programForm.value)
      .subscribe(
        (model: ResponseObject<Program>) => {
          console.log(model);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('프로그램 등록 완료');
        }
      );
  }

}