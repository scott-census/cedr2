import { TestBed, inject } from '@angular/core/testing';

import { VizWidgetService } from './viz-widget.service';

describe('VizWidgetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VizWidgetService]
    });
  });

  it('should be created', inject([VizWidgetService], (service: VizWidgetService) => {
    expect(service).toBeTruthy();
  }));
});
