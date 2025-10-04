import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDatepicker } from './generic-datepicker';

describe('GenericDatepicker', () => {
  let component: GenericDatepicker;
  let fixture: ComponentFixture<GenericDatepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericDatepicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericDatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
