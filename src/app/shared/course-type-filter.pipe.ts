import {Pipe, PipeTransform} from '@angular/core';
import {COURSE_TYPE, CoursesList} from "../models/course.model";

@Pipe({
  name: 'courseTypeFilter',
  pure: false
})
export class CourseTypeFilterPipe implements PipeTransform {

  transform(courses: CoursesList[], type: COURSE_TYPE): CoursesList[] {

    if (!courses ) {
      return [];
    }

     return courses.filter((s) => s.subjectType == type)
  }

}
