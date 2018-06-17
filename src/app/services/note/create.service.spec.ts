import { TestBed, inject } from '@angular/core/testing';

import { CreateNote } from './create.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateNote]
    });
  });

  it('should be created', inject([CreateNote], (service: CreateNote) => {
    expect(service).toBeTruthy();
  }));
});
