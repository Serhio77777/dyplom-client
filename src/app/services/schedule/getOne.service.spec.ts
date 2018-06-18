import { TestBed, inject } from '@angular/core/testing';

import { GetOneSchedule } from './getOne.service';

describe('GetOneSchedule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetOneSchedule]
    });
  });

  it('should be created', inject([GetOneSchedule], (service: GetOneSchedule) => {
    expect(service).toBeTruthy();
  }));
});
