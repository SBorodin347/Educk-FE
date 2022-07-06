import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../services/course/course.service";
import {
  STUDENT_ASSESSMENT,
  SubscriptionModel,
  SubscriptionModelList
} from "../../models/subscriptionModel";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-course-assessment',
  templateUrl: './course-assessment.component.html',
  styleUrls: ['./course-assessment.component.scss']
})
export class CourseAssessmentComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub: SubscriptionModelList
  errorMessage: boolean = false;
  invalid: boolean = false;
  passwordRequired: boolean = false;
  assessments = [STUDENT_ASSESSMENT.A, STUDENT_ASSESSMENT.B, STUDENT_ASSESSMENT.C, STUDENT_ASSESSMENT.D, STUDENT_ASSESSMENT.E,
  STUDENT_ASSESSMENT.FX1, STUDENT_ASSESSMENT.FX0]
  private subscription: Subscription = new Subscription();

  @Input()
  private detailedSub: SubscriptionModel

  @Input()
  private userId: number

  @Input()
  private passwordReq: boolean

  constructor(private courseService: CourseService, private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
    this.subscription.add(this.courseService.getSubscription(this.detailedSub.subjectId, this.detailedSub.studentId).subscribe(data => {
      this.sub = data;
      this.fillForm(data);
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(): void {
    this.form = new FormGroup({
      subjectId: new FormControl(null, Validators.required),
      studentId: new FormControl(null, Validators.required),
      assessment: new FormControl(null, Validators.required),
    });
    if(this.passwordReq){
      this.passwordRequired = true
      this.form.addControl('password', new FormControl(null, Validators.required));
    }
  }

  fillForm(sub: SubscriptionModelList): void{
    this.form.controls.subjectId.setValue(sub.subjectId)
    this.form.controls.studentId.setValue(sub.studentId)
    this.form.controls.assessment.setValue(sub.assessment)
  }

  sendForm(): void{
    if(this.form.valid) {
      if(this.passwordRequired) {
        this.userService.verifyPassword(this.userId, this.form.controls.password.value).subscribe(verify => {
          if(verify) {
            this.setAssessment();
          } else this.invalid = this.errorMessage = true;
        })
      } else{
         this.setAssessment();
      }
    } else this.invalid = true;
  }

  private setAssessment(): void{
    this.invalid = false
    this.subscription.add(this.courseService.updateAssessment(this.form.value).subscribe())
    location.reload()
  }

}
