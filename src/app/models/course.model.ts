export enum COURSE_STATUS {APPROVED="APPROVED", REFUSED="REFUSED", CANCELLED="CANCELLED"}
export enum COURSE_TYPE {A="A", B="B", C="C"}
export enum COURSE_SEMESTER {WINTER="WINTER", SUMMER="SUMMER"}
export enum LANGUAGE {SLOVAK="SLOVAK", ENGLISH="ENGLISH", RUSSIAN="RUSSIAN", HUNGARIAN="HUNGARIAN", CZECH="CZECH", POLISH="POLISH"}

export class Course {

  id?: number
  name: string
  abbreviation: string
  hours: number
  credit: number
  teacherFirstName: string
  teacherLastName: string
  status: COURSE_STATUS
  subjectType: COURSE_TYPE
  language: LANGUAGE
  semester: COURSE_SEMESTER
  creationDate: string
  lastChangeDate: Date
  accessible: boolean
  teacherPasswordRequired: boolean
  teacherId: number
  subjectCode: string
  subscribedStudents: number[]
  select: boolean

  constructor(subject: Course) {
    this.id = subject.id;
    this.name = subject.name;
    this.abbreviation = subject.abbreviation;
    this.hours = subject.hours;
    this.credit = subject.credit;
    this.teacherFirstName = subject.teacherFirstName;
    this.teacherLastName = subject.teacherFirstName;
    this.status = subject.status;
    this.subjectType = subject.subjectType;
    this.creationDate = subject.creationDate;
    this.lastChangeDate = subject.lastChangeDate;
    this.accessible = subject.accessible;
    this.teacherPasswordRequired = subject.teacherPasswordRequired;
    this.subjectCode = subject.subjectCode;
    this.teacherId = subject.teacherId;
    this.semester = subject.semester;
    this.language = subject.language;
    this.subscribedStudents = subject.subscribedStudents;
    this.select = subject.select;
  }
}

export class CoursesList {
  id?: number
  name: string
  abbreviation: string
  hours: number
  credit: number
  teacherFirstName: string;
  teacherLastName: string
  status: COURSE_STATUS
  subjectType: COURSE_TYPE
  language: LANGUAGE
  semester: COURSE_SEMESTER
  creationDate: string
  lastChangeDate: Date
  accessible: boolean
  teacherPasswordRequired: boolean
  teacherId: number
  subjectCode: string
  subscribedStudents: number[]
  select: boolean

  constructor(subject: CoursesList) {
    this.id = subject.id;
    this.name = subject.name;
    this.abbreviation = subject.abbreviation;
    this.hours = subject.hours;
    this.credit = subject.credit;
    this.teacherFirstName = subject.teacherFirstName;
    this.teacherLastName = subject.teacherFirstName;
    this.status = subject.status;
    this.subjectType = subject.subjectType;
    this.creationDate = subject.creationDate;
    this.lastChangeDate = subject.lastChangeDate;
    this.accessible = subject.accessible;
    this.teacherPasswordRequired = subject.teacherPasswordRequired;
    this.teacherId = subject.teacherId;
    this.subjectCode = subject.subjectCode;
    this.subscribedStudents = subject.subscribedStudents;
    this.semester = subject.semester;
    this.language = subject.language;
    this.select = subject.select;
  }

}
