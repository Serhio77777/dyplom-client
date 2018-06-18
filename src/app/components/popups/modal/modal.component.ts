import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BusService } from '../../../services/bus.service';
import { EventsService } from '../../../services/events.service';
import { Router } from '@angular/router';
import { format, parse } from 'date-fns';

@Component({
  selector: 'consentz-modal',
  templateUrl: './modal.template.html',
  styleUrls: ['./modal.styles.scss']
})
export class ModalComponent implements OnInit {
  public dateToSend: any = {};
  public timeToSend: any = {};
  public timeToSendSchedule: any = {};

  constructor(
    private router: Router,
    private bus: BusService,
    private events: EventsService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.eventName === 'requested.data.schedule.editBuzy') {
        this.dateToSend = new Date(this.data.id.date.split('/')[2], +this.data.id.date.split('/')[1] - 1, this.data.id.date.split('/')[0]);
        this.timeToSend = this.data.id.value;
      } else if (data.eventName === 'requested.data.schedule.edit') {
        this.timeToSendSchedule = data.data.time;
      }
    }

  public ngOnInit(): void {
  }

  public editBuzy() {
    this.bus.publish(this.events[this.data.eventName.split('.')[0]][this.data.eventName.split('.')[1]][this.data.eventName.split('.')[2]][this.data.eventName.split('.')[3]], {
      date: format(this.dateToSend, 'YYYY-MM-DD'),
      value: this.timeToSend
    });
  }

  public edit() {
    this.data.id[this.data.data.day.toLowerCase()] = this.timeToSendSchedule;
    console.log(this.data.id, this.data.data.day.toLowerCase())
    this.bus.publish(this.events[this.data.eventName.split('.')[0]][this.data.eventName.split('.')[1]][this.data.eventName.split('.')[2]][this.data.eventName.split('.')[3]], this.data.id);
  }
}
