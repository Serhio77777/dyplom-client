import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BusService } from '../bus.service';
import { GetOptions } from '../interfaces/request.interfaces';
import { RequestService } from '../request.service';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

interface GetCredentialsResponse {
  patients: any;
}

/*
  An interlayer service for authentication between request service and login component
*/
@Injectable()
export class GetAllBuzy {

  private options: GetOptions<GetCredentialsResponse>;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private requestService: RequestService,
    private router: Router
  ) {
    this.options = {
      url: `/practitioner/${JSON.parse(localStorage.getItem('currentUser')).practitionerId}/buzy`,
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
    this.subscribe();
  }

  public success(user: GetCredentialsResponse): void {
    this.bus.publish(this.events.received.schedule.buzy.success, user);
  }

  public error(httpErrorResponse: HttpErrorResponse): void {
    this.bus.publish(this.events.received.schedule.failure, httpErrorResponse);
  }

  private request(data): void {
    this.bus.publish(this.events.notified.request.starting);
    this.requestService.get<GetCredentialsResponse>(this.options);
  }

  public subscribe(): void {
    this.bus.subscribe(this.events.requested.data.schedule.buzy, this.request.bind(this));
  }
}