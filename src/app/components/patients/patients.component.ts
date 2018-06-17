import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent, MatTableDataSource } from '@angular/material';
import { PatientsModel, PatientsFormModel } from './patients.model';
import { BusService } from '../../services/bus.service';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
import PatientsForm from './patients.form';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.template.html',
  styleUrls: ['./patients.styles.scss']
})
export class PatientsComponent implements OnInit, OnDestroy {

  public model: PatientsModel = new PatientsModel();
  private form: PatientsForm = new PatientsForm(new PatientsFormModel());
  public pageEvent: PageEvent;

  @ViewChild('table') paginatorTable: MatPaginator;
  @ViewChild('card') paginatorCard: MatPaginator;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private router: Router
  ) {}

  public setData (data): void {
    this.model.cardData = data.patients;
    this.model.tableData = new MatTableDataSource(data.patients);
    this.model.tableData.paginator = this.paginatorTable;
  }
  public delete (id): void {
    this.bus.publish(this.events.requested.data.patients.delete, id);
  }
  public edit (id): void {
    localStorage.setItem('patientId', id);
    this.router.navigate([`edit/${id}`]);
  }
  public create (): void {
    this.router.navigate([`create`]);
  }
  public showMore (id): void {
    localStorage.setItem('patientId', id);
    this.router.navigate([`patient/${id}`]);
  }
  public reloadAllMoments (id): void {
    this.bus.publish(this.events.requested.data.patients.all);
  }
  // subscribe on validation success/failure
  public subscribe(): void {
    this.bus.subscribe(this.events.received.patients.all.success, this.setData, this);
    this.bus.subscribe(this.events.received.patients.delete.success, this.reloadAllMoments, this);
  }

   // unsubscribe on validation success/failure
  public unSubscribe(): void {
    this.bus.unsubscribe(this.events.received.patients.all.success, this.setData);
    this.bus.unsubscribe(this.events.received.patients.delete.success, this.reloadAllMoments);
  }

   // make subscribe on a component initialization
  public ngOnInit(): void {
    this.model.tableData.paginator = this.paginatorTable;
    this.form.formGroup.valueChanges.subscribe(data => {
      this.form.model.searchValue = data.searchValue;
      this.form.model.dataType = data.dataType;
      setTimeout(() => this.model.tableData.paginator = data.dataType === 'table' ? this.paginatorTable : this.paginatorCard);
    });
    this.bus.publish(this.events.requested.data.patients.all);
    this.subscribe();
  }

   // make unsubscribe before destroying component
  public ngOnDestroy(): void {
    this.unSubscribe();
  }

}
