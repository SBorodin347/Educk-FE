import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInviteModalComponent } from './course-invite-modal.component';

describe('CourseInviteModalComponent', () => {
  let component: CourseInviteModalComponent;
  let fixture: ComponentFixture<CourseInviteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseInviteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
