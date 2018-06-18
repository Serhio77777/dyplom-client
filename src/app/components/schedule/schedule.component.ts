import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import ScheduleModel from './schedule.model';
// import RegistrationForm from './registration.form';
import { MatPaginator, PageEvent, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { EventsService } from '../../services/events.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../popups/modal/modal.component';
import { ErrorComponent } from '../popups/error/error.component';
import { format, parse, startOfDay} from 'date-fns';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.template.html',
  styleUrls: ['./schedule.styles.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  public model: ScheduleModel = new ScheduleModel();
  // private form: RegistrationForm;
  private loading = false;
  public isFormErrorMessage: boolean = false;

  @ViewChild('table') paginatorTable: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private bus: BusService,
    private events: EventsService
  ) {
    // this.model = new RegistrationModel();
    // this.form = new RegistrationForm(this.model);
  }

  // start form validation (to show what is wrong)
  private invalidForm(): void {
    // this.form.validate();
    this.isFormErrorMessage = true;
  }
  private openDialog(event: any, id: number, data?: any): void {
    if (data) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '90%',
        data: {
          eventName: event,
          id: id,
          data: data
        }
      });
    } else {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '90%',
        data: {
          eventName: event,
          id: id
        }
      });
      }
  }

  private setData(data): void {
    this.model.dataSchedule = data;
    this.model.tableData = [
      {
        position: 1,
        day: 'Monday',
        time: data.monday
      },
      {
        position: 2,
        day: 'Tuesday',
        time: data.tuesday
      },
      {
        position: 3,
        day: 'Wednesday',
        time: data.wednesday
      },
      {
        position: 4,
        day: 'Thursday',
        time: data.thursday
      },
      {
        position: 5,
        day: 'Friday',
        time: data.friday
      },
      {
        position: 6,
        day: 'Saturday',
        time: data.saturday
      },
      {
        position: 7,
        day: 'Sunday',
        time: data.sunday
      }
    ];
  }

  private setBuzyData(data): void {
    this.model.saveData = Array.from(data);
    data = Array.from(data).filter((element: any) => {
      if (startOfDay(parse(element.date)).getTime() === startOfDay(parse(this.model.date)).getTime()) {
        element.date = format(element.date, 'DD/MM/YYYY');
        return element;
      }
    });
    this.model.buzyTableData = new MatTableDataSource(Array.from(data));
    this.model.buzyTableData.paginator = this.paginatorTable;
  }

  public onChange(): void {
    const data = Array.from(this.model.saveData).filter((element: any) => {
      if (startOfDay(parse(element.date)).getTime() === startOfDay(parse(this.model.date)).getTime()) {
        element.date = format(element.date, 'DD/MM/YYYY');
        return element;
      }
    });
    this.model.buzyTableData = new MatTableDataSource(Array.from(data));
    this.model.buzyTableData.paginator = this.paginatorTable;
  }

  public create (): void {
    this.bus.publish(this.events.requested.data.schedule.create, {
      date: format(this.model.dateNew, 'YYYY-MM-DD'),
      value: this.model.timeNew
    });
  }

  // start validation functionality
  private clearData(): void {
    this.model.dateNew = '';
    this.model.timeNew = '';
  }

  public deleteBuzy(id): void {
    this.bus.publish(this.events.requested.data.schedule.delete, id);
  }

  public editBuzy(id): void {
    this.openDialog('requested.data.schedule.editBuzy', id);
  }

  public edit(id): void {
    this.openDialog('requested.data.schedule.edit', this.model.dataSchedule, this.model.tableData.find(element => element.position === id));
  }

  // start registration request
  // private registration(): void {
  //   this.bus.publish(this.events.requested.data.registration);
  // }

  // subscribe on validation success/failure
  public subscribe(): void {
    this.bus.subscribe(this.events.received.schedule.failure, this.invalidForm, this);
    this.bus.subscribe(this.events.received.schedule.one.success, this.setData, this);
    this.bus.subscribe(this.events.received.schedule.buzy.success, this.setBuzyData, this);
    this.bus.subscribe(this.events.received.schedule.create.success, this.clearData, this);
  }

  // unsubscribe on validation success/failure
  public unSubscribe(): void {
    this.bus.unsubscribe(this.events.received.schedule.failure, this.invalidForm);
    this.bus.unsubscribe(this.events.received.schedule.one.success, this.setData);
    this.bus.unsubscribe(this.events.received.schedule.buzy.success, this.setBuzyData);
    this.bus.unsubscribe(this.events.received.schedule.create.success, this.clearData);
  }

  // make subscribe on a component initialization
  public ngOnInit(): void {
    this.bus.publish(this.events.requested.data.schedule.one);
    this.bus.publish(this.events.requested.data.schedule.buzy);
    this.subscribe();
  }

  // make unsubscribe before destroying component
  public ngOnDestroy(): void {
    this.unSubscribe();
  }

}
