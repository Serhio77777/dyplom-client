import { TestBed, inject } from '@angular/core/testing';

import { EditSchedule } from './edit.service';

describe('EditSchedule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditSchedule]
    });
  });

  it('should be created', inject([EditSchedule], (service: EditSchedule) => {
    expect(service).toBeTruthy();
  }));
});
