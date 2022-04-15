import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRowComponent } from './grid-row.component';

describe('GridRowComponent', () => {
  let component: GridRowComponent;
  let fixture: ComponentFixture<GridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
