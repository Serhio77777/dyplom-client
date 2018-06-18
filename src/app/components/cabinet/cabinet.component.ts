import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CabinetModel, CabinetFormModel } from './cabinet.model';
import CabinetForm from './cabinet.form';
import { BusService } from '../../services/bus.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.template.html',
  styleUrls: ['./cabinet.styles.scss']
})
export class CabinetComponent implements OnInit, OnDestroy {
  public model: CabinetModel = new CabinetModel(JSON.parse(localStorage.getItem('currentUser')));
  public tab: string = 'about';
  private modelForm: CabinetFormModel = new(CabinetFormModel);
  private form: CabinetForm;
  private loading = false;
  public isFormErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private bus: BusService,
    private events: EventsService
  ) {
    this.form = new CabinetForm(this.modelForm);
  }

  public setTab(data: string): void {
    this.tab = data;
  }

  // start form validation (to show what is wrong)
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  // start validation functionality
  private submit(): void {
    // this.bus.publish(this.events.notified.validation.form.aggregation, this.form.isValid);
    // this.bus.publish(this.events.notified.validation.form.action);
  }

  // start registration request
  private save(): void {
    this.bus.publish(this.events.requested.data.profileUpdate, this.form.model);
  }

  private change(): void {
    this.bus.publish(this.events.requested.data.profileUpdate, this.form.model);
  }

  // subscribe on validation success/failure
  public subscribe(): void {
    //  this.bus.subscribe(this.events.received.profileUpdate.failure, this.invalidForm, this);
     this.bus.subscribe(this.events.received.profileUpdate.success, this.setTab, this);
   }

   // unsubscribe on validation success/failure
   public unSubscribe(): void {
    //  this.bus.unsubscribe(this.events.received.profileUpdate.failure, this.invalidForm);
     this.bus.unsubscribe(this.events.received.profileUpdate.success, this.setTab);
   }

   // make subscribe on a component initialization
   public ngOnInit(): void {
     this.form.patchForm(this.model.personData);
     this.subscribe();
   }

   // make unsubscribe before destroying component
   public ngOnDestroy(): void {
     this.unSubscribe();
   }
}
