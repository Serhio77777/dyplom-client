import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BusService } from '../bus.service';
import { PostOptions } from '../interfaces/request.interfaces';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';

interface PostCredentialsRequest {
  practitionerFirstName: string;
  practitionerLastName: string;
  practitionerSurName: string;
  practitionerSex: string;
  practitionerDateBirth: string;
  practitionerPosition: string;
  practitionerImage: string;
  practitionerEmail: string;
  password: string;
  departmentId: number;
  specializationId: number;
  hospitalId: number;
}

interface PostCredentialsResponse {
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
export class RegistrationService {

  private options: PostOptions<PostCredentialsRequest, PostCredentialsResponse>;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private requestService: RequestService,
    private router: Router
  ) {
    this.options = {
      url: '/registration',
      body: {
        practitionerFirstName: '',
        practitionerLastName: '',
        practitionerSurName: '',
        practitionerSex: '',
        practitionerDateBirth: '',
        practitionerPosition: '',
        practitionerImage: '',
        practitionerEmail: '',
        password: '',
        departmentId: 1,
        specializationId: 1,
        hospitalId: 1
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
    this.bus.publish(this.events.received.registration.success, JSON.stringify(user));
    this.router.navigate(['home']);
  }

  public error(httpErrorResponse: HttpErrorResponse): void {
    this.bus.publish(this.events.received.registration.failure, httpErrorResponse);
  }

  private request(data: any): void {
    this.bus.publish(this.events.notified.request.starting);
    Object.keys(data).forEach(key => {
      this.options.body[key] = data[key];
    });
    // localStorage.setItem('currentUserEmail', data.email);
    console.log('body', this.options.body)
    this.requestService.post<PostCredentialsRequest, PostCredentialsResponse>(this.options);
  }

  public subscribe(): void {
    this.bus.subscribe(this.events.requested.data.registration, this.request.bind(this));
  }
}
