import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDialogComponent } from './tutorial-dialog.component';

describe('TutorialDialogComponent', () => {
  let component: TutorialDialogComponent;
  let fixture: ComponentFixture<TutorialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
