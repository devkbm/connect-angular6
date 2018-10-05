import { Component, OnInit } from '@angular/core';
import { AppAlarmService } from '../service/app-alarm.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css']
})
export class CommonLayoutComponent implements OnInit {

  message: string;
  menuGroupCode: string;

  constructor(private data: AppAlarmService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  sendMen(mess) {
    this.menuGroupCode = mess;
    console.log(mess);
  }

}
