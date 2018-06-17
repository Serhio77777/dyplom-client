import { TestBed, inject } from '@angular/core/testing';

import { GetOneNote } from './getOne.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetOneNote]
    });
  });

  it('should be created', inject([GetOneNote], (service: GetOneNote) => {
    expect(service).toBeTruthy();
  }));
});
