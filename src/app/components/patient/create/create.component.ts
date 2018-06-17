import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import CreateModel from './create.model';
import CreateForm from './create.form';
import { BusService } from '../../../services/bus.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.template.html',
  styleUrls: ['./create.styles.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  private model: CreateModel;
  private form: CreateForm;
  private loading = false;
  public isFormErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private bus: BusService,
    private events: EventsService
  ) {
    this.model = new CreateModel();
    this.form = new CreateForm(this.model);
  }

  // start form validation (to show what is wrong)
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  public goBack (): void {
    // TODO: patient
    this.router.navigate(['home']);
  }

  private create(): void {
    this.bus.publish(this.events.requested.data.patients.create, this.form.model);
  }

  // subscribe on validation success/failure
  public subscribe(): void {
    this.bus.subscribe(this.events.received.patients.create.success, this.goBack, this);
   }

   // unsubscribe on validation success/failure
  public unSubscribe(): void {
    this.bus.unsubscribe(this.events.received.patients.create.success, this.goBack);
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
