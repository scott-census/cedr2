import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrCheckboxComponent } from './cdr-checkbox.component';

describe('CdrCheckboxComponent', () => {
  let component: CdrCheckboxComponent;
  let fixture: ComponentFixture<CdrCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdrCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdrCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
