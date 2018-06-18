import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BusService } from '../bus.service';
import { PostOptions } from '../interfaces/request.interfaces';
import { RequestService } from '../request.service';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

interface PostCredentialsRequest {
  date: string;
  value: string;
  practitionerId: number;
}

interface PostCredentialsResponse {
  _id: string;
  email: string;
  token: string;
}


/*
  An interlayer service for authentication between request service and login component
*/
@Injectable()
export class CreateBuzy {

  private options: PostOptions<PostCredentialsRequest, PostCredentialsResponse>;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private requestService: RequestService,
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

  public success(user: PostCredentialsResponse): void {
    // TODO: patient
    this.bus.publish(this.events.requested.data.schedule.buzy);
    this.bus.publish(this.events.received.schedule.create.success, user);
  }

  public error(httpErrorResponse: HttpErrorResponse): void {
    this.bus.publish(this.events.received.schedule.failure, httpErrorResponse);
  }

  private request(data): void {
    this.bus.publish(this.events.notified.request.starting);
    Object.keys(data).forEach(key => {
      this.options.body[key] = data[key];
    });
    console.log(2313)
    this.requestService.post<PostCredentialsRequest, PostCredentialsResponse>(this.options);
  }

  public subscribe(): void {
    this.bus.subscribe(this.events.requested.data.schedule.create, this.request.bind(this));
  }
}