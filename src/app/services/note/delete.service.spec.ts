import { TestBed, inject } from '@angular/core/testing';

import { DeleteNote } from './delete.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteNote]
    });
  });

  it('should be created', inject([DeleteNote], (service: DeleteNote) => {
    expect(service).toBeTruthy();
  }));
});
