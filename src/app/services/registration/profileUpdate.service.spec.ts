import { TestBed, inject } from '@angular/core/testing';

import { ProfileUpdateService } from './profileUpdate.service';

describe('ProfileUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileUpdateService]
    });
  });

  it('should be created', inject([ProfileUpdateService], (service: ProfileUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
