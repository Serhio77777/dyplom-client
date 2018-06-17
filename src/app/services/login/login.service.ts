import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BusService } from '../bus.service';
import { PostOptions } from '../interfaces/request.interfaces';
import { RequestService } from '../request.service';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

interface PostCredentialsRequest {
  practitionerFirstName: string;
  practitionerSurName: string;
  password: string;
}

interface PostCredentialsResponse {
  _id: string;
  token: string;
}

/*
  An interlayer service for authentication between request service and login component
*/
@Injectable()
export class LoginService {

  private options: PostOptions<PostCredentialsRequest, PostCredentialsResponse>;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private requestService: RequestService,
    private router: Router
  ) {
    this.options = {
      url: '/login',
      body: {
        practitionerFirstName: '',
        practitionerSurName: '',
        password: ''
      },
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
    this.subscribe();
  }

  public success(user: PostCredentialsResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.bus.publish(this.events.received.authentication.success, user);
    this.router.navigate(['home']);
  }

  public error(httpErrorResponse: HttpErrorResponse): void {
    this.bus.publish(this.events.received.authentication.failure, httpErrorResponse);
  }

  private request(data): void {
    this.bus.publish(this.events.notified.request.starting);
    this.options.body.practitionerFirstName = data.practitionerFirstName;
    this.options.body.practitionerSurName = data.practitionerSurName;
    this.options.body.password = data.password;
    this.requestService.post<PostCredentialsRequest, PostCredentialsResponse>(this.options);
  }

  public subscribe(): void {
    this.bus.subscribe(this.events.requested.data.authentication, this.request.bind(this));
  }
}