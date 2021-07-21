import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimecardComponent } from './add-timecard.component';

describe('AddTimecardComponent', () => {
  let component: AddTimecardComponent;
  let fixture: ComponentFixture<AddTimecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTimecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
