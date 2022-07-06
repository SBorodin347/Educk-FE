export enum STUDENT_STATUS {REGISTERED="REGISTERED", COMPLETED="COMPLETED", UNCOMPLETED="UNCOMPLETED", UNACCEPTABLE="UNACCEPTABLE"}
export enum STUDENT_ASSESSMENT {A="A", B="B", C="C", D="D", E="E", FX1="FX1", FX0="FX0", NotGiven="NotGiven"}

export class SubscriptionModel{

  subjectId: number
  studentId: number

  constructor(subjectId: number, studentId: number) {
    this.subjectId = subjectId;
    this.studentId = studentId;
  }

}

export class SubscriptionModelList {

  subjectId: number
  studentId: number
  studentFirstName: string
  studentLastName: string
  subjectName: string
  dateOfRegistration: Date
  lastModifiedDate: Date
  status: STUDENT_STATUS
  assessment: STUDENT_ASSESSMENT
  select: boolean

  constructor(sub: SubscriptionModelList) {
    this.subjectId = sub.subjectId;
    this.studentId = sub.studentId;
    this.studentFirstName = sub.studentFirstName;
    this.studentLastName = sub.studentLastName;
    this.subjectName = sub.subjectName;
    this.dateOfRegistration = sub.dateOfRegistration;
    this.lastModifiedDate = sub.lastModifiedDate;
    this.status = sub.status;
    this.assessment = sub.assessment;
    this.select = sub.select;
  }
}
