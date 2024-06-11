import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContentMonthComponent } from './table-content-month.component';

describe('TableContentMonthComponent', () => {
  let component: TableContentMonthComponent;
  let fixture: ComponentFixture<TableContentMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableContentMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
