import { TestBed, inject } from '@angular/core/testing';

import { GetAllBuzy } from './getAll.service';

describe('GetAllBuzy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllBuzy]
    });
  });

  it('should be created', inject([GetAllBuzy], (service: GetAllBuzy) => {
    expect(service).toBeTruthy();
  }));
});
