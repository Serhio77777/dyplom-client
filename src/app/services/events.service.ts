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
      profileUpdate: 'requested.data.profileUpdate',
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
      },
      schedule: {
        one: 'requested.data.schedule.one',
        buzy: 'requested.data.schedule.buzy',
        delete: 'requested.data.schedule.delete',
        create: 'requested.data.schedule.create',
        edit: 'requested.data.schedule.edit',
        editBuzy: 'requested.data.schedule.editBuzy',
      }
    }
  };
  public received = {
    registration: {
      success: 'received.registration.success',
      failure: 'received.registration.failure'
    },
    profileUpdate: {
      success: 'received.profileUpdate.success',
      failure: 'received.profileUpdate.failure'
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
    schedule: {
      one: {
        success: 'received.schedule.one.success',
      },
      buzy: {
        success: 'received.schedule.buzy.success',
      },
      delete: {
        success: 'received.schedule.delete.success',
      },
      create: {
        success: 'received.schedule.create.success',
      },
      edit: {
        success: 'received.schedule.edit.success',
      },
      editBuzy: {
        success: 'received.schedule.editBuzy.success',
      },
      failure: 'received.schedule.failure'
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
