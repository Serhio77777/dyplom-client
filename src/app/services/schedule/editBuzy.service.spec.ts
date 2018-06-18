import { TestBed, inject } from '@angular/core/testing';

import { EditBuzy } from './editBuzy.service';

describe('EditBuzy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditBuzy]
    });
  });

  it('should be created', inject([EditBuzy], (service: EditBuzy) => {
    expect(service).toBeTruthy();
  }));
});
