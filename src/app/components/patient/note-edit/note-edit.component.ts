import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import NoteEditModel from './note-edit.model';
import NoteEditForm from './note-edit.form';
import { Location } from '@angular/common';
import { BusService } from '../../../services/bus.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit, OnDestroy {

  private model: NoteEditModel;
  private form: NoteEditForm;
  private loading = false;
  public isFormErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private bus: BusService,
    private location: Location,
    private events: EventsService
  ) {
    this.model = new NoteEditModel();
    this.form = new NoteEditForm(this.model);
  }

  public setData (data): void {
    this.model = data;
    this.form.patchForm(data);
  }
  // start form validation (to show what is wrong)
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  public goBack (): void {
    this.location.back();
  }

  private edit(): void {
    this.bus.publish(this.events.requested.data.note.edit, this.form.model);
  }

  // subscribe on validation success/failure
  public subscribe(): void {
    this.bus.subscribe(this.events.received.note.one.success, this.setData, this);
    this.bus.subscribe(this.events.received.note.edit.success, this.goBack, this);
  }

  // unsubscribe on validation success/failure
  public unSubscribe(): void {
    this.bus.unsubscribe(this.events.received.note.one.success, this.setData);
    this.bus.unsubscribe(this.events.received.note.edit.success, this.goBack);
  }

  // make subscribe on a component initialization
  public ngOnInit(): void {
    this.bus.publish(this.events.requested.data.note.one);
    this.subscribe();
  }

  // make unsubscribe before destroying component
  public ngOnDestroy(): void {
    this.unSubscribe();
  }
}
