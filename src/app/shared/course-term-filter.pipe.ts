import {Pipe, PipeTransform} from '@angular/core';
import {COURSE_SEMESTER, CoursesList} from "../models/course.model";

@Pipe({
  name: 'courseTermFilter',
  pure: false
})
export class CourseTermFilterPipe implements PipeTransform {

  transform(courses: CoursesList[], term: number): CoursesList[] {

    if (!courses ) {
      return [];
    }

    if (term == 1) return courses;
    if (term == 2) return courses.filter((s) => s.semester == COURSE_SEMESTER.WINTER)
    if (term == 3) return courses.filter((s) => s.semester == COURSE_SEMESTER.SUMMER)

  }

}
