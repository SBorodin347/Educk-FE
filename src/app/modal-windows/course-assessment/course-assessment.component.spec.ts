import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssessmentComponent } from './course-assessment.component';

describe('CourseAssessmentComponent', () => {
  let component: CourseAssessmentComponent;
  let fixture: ComponentFixture<CourseAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
