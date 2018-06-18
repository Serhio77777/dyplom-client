import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BusService } from '../bus.service';
import { PutOptions } from '../interfaces/request.interfaces';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';

interface PutCredentialsRequest {
  practitionerFirstName: string;
  practitionerLastName: string;
  practitionerSurName: string;
  practitionerSex: string;
  practitionerDateBirth: string;
  practitionerPosition: string;
  practitionerImage: string;
  practitionerEmail: string;
  password: string;
}

interface PutCredentialsResponse {
  _id: string;
  email: string;
  token: string;
}

/*
  An interlayer service for registration between request service and registration component
*/
@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {

  private options: PutOptions<PutCredentialsRequest, PutCredentialsResponse>;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private requestService: RequestService,
    private router: Router
  ) {
    this.options = {
      url: `/user/${JSON.parse(localStorage.getItem('currentUser')).practitionerId}`,
      body: {
        practitionerFirstName: '',
        practitionerLastName: '',
        practitionerSurName: '',
        practitionerSex: '',
        practitionerDateBirth: '',
        practitionerPosition: '',
        practitionerImage: '',
        practitionerEmail: '',
        password: ''
      },
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
    this.subscribe();
  }

  public success(user: PutCredentialsResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.bus.publish(this.events.received.profileUpdate.success, 'about');
  }

  public error(httpErrorResponse: HttpErrorResponse): void {
    this.bus.publish(this.events.received.profileUpdate.failure, httpErrorResponse);
  }

  private request(data: any): void {
    this.bus.publish(this.events.notified.request.starting);
    Object.keys(data).forEach(key => {
      this.options.body[key] = data[key];
    });
    // localStorage.setItem('currentUserEmail', data.email);
    console.log('body', this.options.body)
    this.requestService.put<PutCredentialsRequest, PutCredentialsResponse>(this.options);
  }

  public subscribe(): void {
    this.bus.subscribe(this.events.requested.data.profileUpdate, this.request.bind(this));
  }
}
