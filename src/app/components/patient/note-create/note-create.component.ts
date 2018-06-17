import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import NoteCreateModel from './note-create.model';
import NoteCreateForm from './note-create.form';
import { Location } from '@angular/common';
import { BusService } from '../../../services/bus.service';
import { EventsService } from '../../../services/events.service';


@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss']
})
export class NoteCreateComponent implements OnInit {

  private model: NoteCreateModel;
  private form: NoteCreateForm;
  private loading = false;
  public isFormErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private bus: BusService,
    private location: Location,
    private events: EventsService
  ) {
    this.model = new NoteCreateModel();
    this.form = new NoteCreateForm(this.model);
  }

  // start form validation (to show what is wrong)
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  public goBack (): void {
    this.location.back();
  }

  private create(): void {
    this.bus.publish(this.events.requested.data.note.create, this.form.model);
  }

  // subscribe on validation success/failure
  public subscribe(): void {
    this.bus.subscribe(this.events.received.note.create.success, this.goBack, this);
  }

  // unsubscribe on validation success/failure
  public unSubscribe(): void {
    this.bus.unsubscribe(this.events.received.note.create.success, this.goBack);
  }

  // make subscribe on a component initialization
  public ngOnInit(): void {
    this.subscribe();
  }

  // make unsubscribe before destroying component
  public ngOnDestroy(): void {
    this.unSubscribe();
  }
}
