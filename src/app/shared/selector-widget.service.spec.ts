import { TestBed, inject } from '@angular/core/testing';

import { SelectorWidgetService } from './selector-widget.service';

describe('SelectorWidgetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectorWidgetService]
    });
  });

  it('should be created', inject([SelectorWidgetService], (service: SelectorWidgetService) => {
    expect(service).toBeTruthy();
  }));
});
