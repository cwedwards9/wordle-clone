import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDialogComponent } from './statistics-dialog.component';

describe('StatisticsDialogComponent', () => {
  let component: StatisticsDialogComponent;
  let fixture: ComponentFixture<StatisticsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
