import {Component, Input, OnInit} from '@angular/core';
import {COURSE_TYPE, CoursesList} from "../../models/course.model";

@Component({
  selector: 'app-student-course-grid',
  templateUrl: './student-course-grid.component.html',
  styleUrls: ['./student-course-grid.component.scss']
})
export class StudentCourseGridComponent implements OnInit {

  colours = [{color: "#D0B0F7", letter: ['A','M','T','D','O','I', 'Y']}, {color: "#FFB922", letter: ['N','H','Z','J','W','L']},
    {color: "#86C454", letter: ['B','G','E','P','X','U']}, {color: "#5EB2EB", letter: ['S','C','R','V','K','Q','F']}];

  @Input()
  allCourses: CoursesList[]

  @Input()
  tab: number

  @Input()
  type: COURSE_TYPE

  constructor() { }

  ngOnInit(): void {
  }

  getCssColor(char: string): string{
    return this.colours.find(s => s.letter.includes(char)).color;
  }

  getFirstLetter(char: string): string{
    return char.slice(0,1);
  }

  showAdding(type: COURSE_TYPE): boolean{
    if( (this.allCourses.filter((el) => el.subjectType == type).length % 3) != 0) return true;
  }

}
