import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent, MatTableDataSource } from '@angular/material';
import { BusService } from '../../services/bus.service';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.template.html',
  styleUrls: ['./patient.styles.scss']
})
export class PatientComponent implements OnInit, OnDestroy {
  public model: any = {patient: {}};

  constructor(
    private bus: BusService,
    private events: EventsService,
    private router: Router
  ) {}

  public setData (data): void {
    this.model = data;
  }
  public edit (): void {
    this.router.navigate([`edit/${localStorage.getItem('patientId')}`]);
  }
  public delete (data): void {
    this.bus.publish(this.events.requested.data.patients.delete);
  }
  public goBack (): void {
    // TODO: patient
    this.router.navigate(['home']);
  }
  // subscribe on validation success/failure
  public subscribe(): void {
    this.bus.subscribe(this.events.received.patients.one.success, this.setData, this);
    this.bus.subscribe(this.events.received.patients.delete.success, this.goBack, this);
  }

   // unsubscribe on validation success/failure
  public unSubscribe(): void {
    this.bus.unsubscribe(this.events.received.patients.one.success, this.setData);
    this.bus.unsubscribe(this.events.received.patients.delete.success, this.goBack);
  }

   // make subscribe on a component initialization
  public ngOnInit(): void {
    this.bus.publish(this.events.requested.data.patients.one);
    this.subscribe();
  }

   // make unsubscribe before destroying component
  public ngOnDestroy(): void {
    this.unSubscribe();
  }

}
