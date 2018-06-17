import { Injectable } from '@angular/core';

@Injectable()
export class EventsService {
  public notified = {
    request: {
      starting: 'notified.request.starting',
      finishing: 'notified.request.finishing'
    }
  };
  public requested = {
    data: {
      authentication: 'requested.data.authentication',
      registration: 'requested.data.registration',
      patients: {
        all: 'requested.data.patients.all',
        one: 'requested.data.patients.one',
        delete: 'requested.data.patients.delete',
        create: 'requested.data.patients.create',
        edit: 'requested.data.patients.edit'
      },
      note: {
        one: 'requested.data.note.one',
        delete: 'requested.data.note.delete',
        create: 'requested.data.note.create',
        edit: 'requested.data.note.edit'
      }
    }
  };
  public received = {
    registration: {
      success: 'received.registration.success',
      failure: 'received.registration.failure'
    },
    patients: {
      all: {
        success: 'received.patients.all.success',
      },
      one: {
        success: 'received.patients.one.success',
      },
      delete: {
        success: 'received.patients.delete.success',
      },
      create: {
        success: 'received.patients.create.success',
      },
      edit: {
        success: 'received.patients.edit.success',
      },
      failure: 'received.patients.failure'
    },
    note: {
      one: {
        success: 'received.note.one.success',
      },
      delete: {
        success: 'received.note.delete.success',
      },
      create: {
        success: 'received.note.create.success',
      },
      edit: {
        success: 'received.note.edit.success',
      },
      failure: 'received.note.failure'
    },
    authentication: {
      success: 'received.authentication.success',
      failure: 'received.authentication.failure'
    },
  };
}
