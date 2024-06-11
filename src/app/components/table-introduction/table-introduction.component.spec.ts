import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIntroductionComponent } from './table-introduction.component';

describe('TableIntroductionComponent', () => {
  let component: TableIntroductionComponent;
  let fixture: ComponentFixture<TableIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableIntroductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
