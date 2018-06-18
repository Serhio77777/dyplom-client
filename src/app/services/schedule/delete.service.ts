import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BusService } from '../bus.service';
import { DeleteOptions } from '../interfaces/request.interfaces';
import { RequestService } from '../request.service';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

interface DeleteCredentialsResponse {}

/*
  An interlayer service for authentication between request service and login component
*/
@Injectable()
export class DeleteBuzy {

  private options: DeleteOptions<DeleteCredentialsResponse>;

  constructor(
    private bus: BusService,
    private events: EventsService,
    private requestService: RequestService,
    private router: Router
  ) {
    this.options = {
      url: `/practitioner/${0}/buzy`,
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
    this.subscribe();
  }

  public success(user: DeleteCredentialsResponse): void {
    this.bus.publish(this.events.requested.data.schedule.buzy);
    this.bus.publish(this.events.received.schedule.delete.success, user);
  }

  public error(httpErrorResponse: HttpErrorResponse): void {
    this.bus.publish(this.events.received.schedule.failure, httpErrorResponse);
  }

  private request(data): void {
    this.bus.publish(this.events.notified.request.starting);
    if (data) {
      this.options.url = `/practitioner/${data}/buzy`;
    }
    this.requestService.delete<DeleteCredentialsResponse>(this.options);
  }

  public subscribe(): void {
    this.bus.subscribe(this.events.requested.data.schedule.delete, this.request.bind(this));
  }
}