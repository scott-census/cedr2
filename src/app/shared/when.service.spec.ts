import { TestBed, inject } from '@angular/core/testing';

import { WhenService } from './when.service';

describe('WhenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhenService]
    });
  });

  it('should be created', inject([WhenService], (service: WhenService) => {
    expect(service).toBeTruthy();
  }));
});
