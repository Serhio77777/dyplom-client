import { TestBed, inject } from '@angular/core/testing';

import { CreatePatient } from './create.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePatient]
    });
  });

  it('should be created', inject([CreatePatient], (service: CreatePatient) => {
    expect(service).toBeTruthy();
  }));
});
