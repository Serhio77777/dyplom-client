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
  noteDateCreation: string;
  noteDescription: string;
  noteDiagnosis: string;
  noteStatus: string;
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
export class EditNote {

  private options: PutOptions<PutCredentialsRequest, PutCredentialsResponse>;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private requestService: RequestService,
    private location: Location,
    private router: Router
  ) {
    this.options = {
      url: `/note/${localStorage.getItem('noteId')}`,
      body: {
        noteDateCreation: '',
        noteDescription: '',
        noteDiagnosis: '',
        noteStatus: '',
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
    this.location.back();
    this.bus.publish(this.events.received.note.edit.success, user);
  }

  public error(httpErrorResponse: HttpErrorResponse): void {
    this.bus.publish(this.events.received.note.failure, httpErrorResponse);
  }

  private request(data): void {
    this.bus.publish(this.events.notified.request.starting);
    Object.keys(data).forEach(key => {
      this.options.body[key] = data[key];
    });
    this.options.body.noteDateCreation = format(this.options.body.noteDateCreation, 'YYYY-MM-DD');
    this.requestService.put<PutCredentialsRequest, PutCredentialsResponse>(this.options);
  }

  public subscribe(): void {
    this.bus.subscribe(this.events.requested.data.note.edit, this.request.bind(this));
  }
}