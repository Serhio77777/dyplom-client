import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import EditModel from './edit.model';
import EditForm from './edit.form';
import { BusService } from '../../../services/bus.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.template.html',
  styleUrls: ['./edit.styles.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  private model: EditModel;
  private form: EditForm;
  private loading = false;
  public isFormErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private bus: BusService,
    private events: EventsService
  ) {
    this.model = new EditModel();
    this.form = new EditForm(this.model);
  }

  // start form validation (to show what is wrong)
  public setData (data): void {
    this.model = data;
    this.form.patchForm(data.patient);
    console.log(this.form)
  }
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  public goBack (): void {
    // TODO: patient
    this.router.navigate(['home']);
  }

  private edit(): void {
    this.bus.publish(this.events.requested.data.patients.edit, this.form.model);
  }

  // subscribe on validation success/failure
  public subscribe(): void {
    this.bus.subscribe(this.events.received.patients.one.success, this.setData, this);
    this.bus.subscribe(this.events.received.patients.edit.success, this.goBack, this);
   }

   // unsubscribe on validation success/failure
  public unSubscribe(): void {
    this.bus.unsubscribe(this.events.received.patients.one.success, this.setData);
    this.bus.unsubscribe(this.events.received.patients.edit.success, this.goBack);
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
