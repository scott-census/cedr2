import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrButtonComponent } from './cdr-button.component';

describe('CdrButtonComponent', () => {
  let component: CdrButtonComponent;
  let fixture: ComponentFixture<CdrButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdrButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
