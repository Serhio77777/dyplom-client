import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
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
  public dataSource: any = new MatTableDataSource([]);
  public tableIdexes: any = ['position', 'status', 'dateCreation', 'diagnosis', 'actions'];

  @ViewChild(MatPaginator) paginatorTable: MatPaginator;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private router: Router
  ) {}

  public setData (data): void {
    this.model = data;
    this.dataSource = new MatTableDataSource(data.notes);
    this.dataSource.paginator = this.paginatorTable;
  }
  public edit (): void {
    this.router.navigate([`edit/${localStorage.getItem('patientId')}`]);
  }
  public delete (data): void {
    this.bus.publish(this.events.requested.data.patients.delete);
  }
  public deleteNote (id): void {
    localStorage.setItem('noteId', id);
    this.bus.publish(this.events.requested.data.note.delete);
  }
  public editNote (id): void {
    localStorage.setItem('noteId', id);
    this.router.navigate([`edit-note/${id}`]);
  }
  public createNote (): void {
    this.router.navigate([`create-note`]);
  }
  public showMoreNote (id): void {
    localStorage.setItem('noteId', id);
    this.router.navigate([`note/${id}`]);
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
