import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContractsComponent } from './table-contracts.component';

describe('TableContractsComponent', () => {
  let component: TableContractsComponent;
  let fixture: ComponentFixture<TableContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
