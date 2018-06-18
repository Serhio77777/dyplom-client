import { TestBed, inject } from '@angular/core/testing';

import { CreateBuzy } from './create.service';

describe('CreateBuzy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateBuzy]
    });
  });

  it('should be created', inject([CreateBuzy], (service: CreateBuzy) => {
    expect(service).toBeTruthy();
  }));
});
