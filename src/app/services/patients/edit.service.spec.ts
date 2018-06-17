import { TestBed, inject } from '@angular/core/testing';

import { EditPatient } from './edit.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditPatient]
    });
  });

  it('should be created', inject([EditPatient], (service: EditPatient) => {
    expect(service).toBeTruthy();
  }));
});
