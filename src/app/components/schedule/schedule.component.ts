import { Component, OnInit } from '@angular/core';
import ScheduleModel from './schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.template.html',
  styleUrls: ['./schedule.styles.scss']
})
export class ScheduleComponent implements OnInit {

  public model: ScheduleModel = new ScheduleModel();

  constructor() { }

  public ngOnInit() {
  }

}
