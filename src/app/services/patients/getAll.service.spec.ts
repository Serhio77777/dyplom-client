import { TestBed, inject } from '@angular/core/testing';

import { GetAllPatients } from './getAll.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllPatients]
    });
  });

  it('should be created', inject([GetAllPatients], (service: GetAllPatients) => {
    expect(service).toBeTruthy();
  }));
});
