import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRowExampleComponent } from './grid-row-example.component';

describe('GridRowExampleComponent', () => {
  let component: GridRowExampleComponent;
  let fixture: ComponentFixture<GridRowExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridRowExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRowExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
