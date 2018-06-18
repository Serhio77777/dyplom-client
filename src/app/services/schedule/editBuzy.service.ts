import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { BusService } from '../bus.service';
import { PutOptions } from '../interfaces/request.interfaces';
import { RequestService } from '../request.service';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { format } from 'date-fns';

interface PutCredentialsRequest {
  dayId?: string;
  date: string;
  value: string;
  practitionerId: number;
}

interface PutCredentialsResponse {
  _id: string;
  email: string;
  token: string;
}


/*
  An interlayer service for authentication between request service and login component
*/
@Injectable()
export class EditBuzy {

  private options: PutOptions<PutCredentialsRequest, PutCredentialsResponse>;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private requestService: RequestService,
    private location: Location,
    private router: Router
  ) {
    this.options = {
      url: `/practitioner/${JSON.parse(localStorage.getItem('currentUser')).practitionerId}/buzy`,
      body: {
        date: '',
        value: '',
        practitionerId: JSON.parse(localStorage.getItem('currentUser')).practitionerId
      },
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
    this.subscribe();
  }

  public success(user: PutCredentialsResponse): void {
    // TODO: patient
    this.bus.publish(this.events.requested.data.schedule.buzy);
    this.bus.publish(this.events.received.schedule.editBuzy.success, user);
  }

  public error(httpErrorResponse: HttpErrorResponse): void {
    this.bus.publish(this.events.received.schedule.failure, httpErrorResponse);
  }

  private request(data): void {
    this.bus.publish(this.events.notified.request.starting);
    Object.keys(data).forEach(key => {
      this.options.body[key] = data[key];
    });
    this.options.url = `/practitioner/${this.options.body.dayId}/buzy`;
    console.log('buzy', this.options.body)
    this.requestService.put<PutCredentialsRequest, PutCredentialsResponse>(this.options);
  }

  public subscribe(): void {
    this.bus.subscribe(this.events.requested.data.schedule.editBuzy, this.request.bind(this));
  }
}