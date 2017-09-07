import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrInstructionsComponent } from './cdr-instructions.component';

describe('CdrInstructionsComponent', () => {
  let component: CdrInstructionsComponent;
  let fixture: ComponentFixture<CdrInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdrInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdrInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
