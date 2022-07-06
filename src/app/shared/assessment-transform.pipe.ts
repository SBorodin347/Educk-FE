import {Pipe, PipeTransform} from "@angular/core";
import {STUDENT_ASSESSMENT} from "../models/subscriptionModel";
import {COURSE_TYPE} from "../models/course.model";

@Pipe({
  name: "enumCourseTransform",
  pure: true
})
export class EnumCourseTransformPipe implements PipeTransform{
  transform(value: any, enumType: string | 'default'): string {

    if(enumType == 'assessment'){
    switch (value){
      case STUDENT_ASSESSMENT.A: return value + ' - Excellent'
      case STUDENT_ASSESSMENT.B: return value + ' - Very good'
      case STUDENT_ASSESSMENT.C: return value + ' - Good'
      case STUDENT_ASSESSMENT.D: return value + ' - Satisfactory'
      case STUDENT_ASSESSMENT.E: return value + ' - Sufficient'
      case STUDENT_ASSESSMENT.FX1: return value + ' - Insufficient'
      case STUDENT_ASSESSMENT.FX0: return value + ' - Excluded'
      case STUDENT_ASSESSMENT.NotGiven: return 'Not set'
      default: return "undefined"
     }
    }

    if(enumType == 'courseType'){
    switch (value){
      case COURSE_TYPE.A: return value + ' - Compulsory courses'
      case COURSE_TYPE.B: return value + ' - Compulsory elective courses'
      case COURSE_TYPE.C: return value + ' - Optional courses'
      default: return "undefined"
     }
    }

    if(enumType == 'courseSemester'){
      return value + ' semester'
    }

      return value
  }
}
