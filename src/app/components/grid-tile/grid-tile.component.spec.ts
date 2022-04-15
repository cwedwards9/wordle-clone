import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTileComponent } from './grid-tile.component';

describe('GridTileComponent', () => {
  let component: GridTileComponent;
  let fixture: ComponentFixture<GridTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
