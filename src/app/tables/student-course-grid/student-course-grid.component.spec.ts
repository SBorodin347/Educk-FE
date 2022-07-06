import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseGridComponent } from './student-course-grid.component';

describe('StudentCourseGridComponent', () => {
  let component: StudentCourseGridComponent;
  let fixture: ComponentFixture<StudentCourseGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCourseGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
