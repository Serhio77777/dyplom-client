import { TestBed, inject } from '@angular/core/testing';

import { GetOnePatient } from './getOne.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetOnePatient]
    });
  });

  it('should be created', inject([GetOnePatient], (service: GetOnePatient) => {
    expect(service).toBeTruthy();
  }));
});
