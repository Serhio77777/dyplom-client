import { TestBed, inject } from '@angular/core/testing';

import { DeleteBuzy } from './getOne.service';

describe('DeleteBuzy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteBuzy]
    });
  });

  it('should be created', inject([DeleteBuzy], (service: DeleteBuzy) => {
    expect(service).toBeTruthy();
  }));
});
