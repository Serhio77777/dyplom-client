import { TestBed, inject } from '@angular/core/testing';

import { EditNote } from './edit.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditNote]
    });
  });

  it('should be created', inject([EditNote], (service: EditNote) => {
    expect(service).toBeTruthy();
  }));
});
