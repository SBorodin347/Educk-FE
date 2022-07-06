import {Component, OnInit} from '@angular/core';
import {COURSE_SEMESTER, COURSE_TYPE, CoursesList} from "../../models/course.model";
import {CourseService} from "../../services/course/course.service";
import {STUDENT_ASSESSMENT, STUDENT_STATUS, SubscriptionModelList} from "../../models/subscriptionModel";
import {AuthService} from "../../services/authentication/auth.service";

@Component({
  selector: 'app-course-overview-page',
  templateUrl: './course-overview-page.component.html',
  styleUrls: ['./course-overview-page.component.scss']
})
export class CourseOverviewPageComponent implements OnInit {

  COURSE_TYPE = COURSE_TYPE;
  tab: number = 1;
  subs: SubscriptionModelList[] = [];
  allCourses: CoursesList[] = [];
  colours = [{color: "#D0B0F7", letter: ['A','M','T','D','O','I']}, {color: "#FFB922", letter: ['N','H','Z','J','W','L']},
    {color: "#86C454", letter: ['B','G','E','P','X','U']}, {color: "#86C454", letter: ['S','C','R','V','K','Q','Y','F']}]

  constructor(private courseService: CourseService, private auth: AuthService) { }

  ngOnInit(): void {
    this.courseService.getStudentCourses(this.auth.getUserId()).subscribe(data => {
      this.subs = data;
      for(let c of this.subs) {
        this.courseService.getSubject(c.subjectId).subscribe(data => {
          this.allCourses.push(data);
        })
      }
    })
  }

  switchTab(t: number){
    this.tab = t;
  }

  getCssColor(str: string): string{
    let c = this.colours.find(s => s.letter.includes(str));
    return c.color;
  }

  getCourseAssessment(id: number): STUDENT_ASSESSMENT{
    return this.subs.find(e => e.subjectId == id).assessment;
  }

  getCourseStatus(id: number): STUDENT_STATUS{
    return this.subs.find(e => e.subjectId == id).status;
  }

  getFirstLetter(str: string): string{
    return str.slice(0,1);
  }

}
