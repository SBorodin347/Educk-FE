import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../services/course/course.service";
import {StudentService} from "../../services/user/student.service";
import {Student} from "../../models/user.model";
import {Subscription} from "rxjs";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-course-invite-modal',
  templateUrl: './course-invite-modal.component.html',
  styleUrls: ['./course-invite-modal.component.scss']
})
export class CourseInviteModalComponent implements OnInit, OnDestroy{

  invalid: boolean = false
  form: FormGroup
  students: Student[] = []
  isCopied: boolean = false
  copyText: string = 'Copy'
  errorMessage: boolean = false
  private subscription: Subscription = new Subscription()

  @Input()
  id?: number

  @Input()
  url: string

  @Output()
  switchInviteModal: EventEmitter<any> = new EventEmitter<any>()

  constructor(private courseService: CourseService, private studentService: StudentService, private clipboardApi: ClipboardService) { }

  ngOnInit(): void {
    this.createForm();
    this.subscription.add(this.studentService.getStudents().subscribe(data => {
      this.students = data
    }))
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  clipboardLink(){
    this.isCopied = true
    this.copyText = 'Copied'
    this.clipboardApi.copy(this.url)
  }

  addStudentToCourse(){
    if(this.form.valid){
      this.invalid = false
      this.subscription.add(this.courseService.getSubject(this.id).subscribe(data => {
        if(data.subscribedStudents.includes(this.form.controls.studentId.value)){
          this.errorMessage = this.invalid = true
        }else{
          this.subscription.add(this.courseService.addToCourse(this.id, this.form.controls.studentId.value).subscribe())
          this.errorMessage = this.invalid = false
          this.switchInviteModal.emit()
          window.location.reload()
        }
      }))
    }
    else this.invalid = true;
  }

  createForm(){
    this.form = new FormGroup({
      studentId: new FormControl(null, Validators.required)}
    )
  }

}
