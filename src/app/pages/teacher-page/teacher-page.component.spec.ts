import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPageComponent } from './teacher-page.component';

describe('TeacherSiteComponent', () => {
  let component: TeacherPageComponent;
  let fixture: ComponentFixture<TeacherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
