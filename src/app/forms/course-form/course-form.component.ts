import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Course, CoursesList} from "../../models/course.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Teacher, User, UserList} from "../../models/user.model";
import {Router} from "@angular/router";
import {SelectComponent} from "ng2-select";
import {UserSelectComponent} from "../../ui-components/user-select/user-select.component";
import {TeacherService} from "../../services/user/teacher.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  form: FormGroup
  startedCourse: Course
  teachers: Teacher[] = []
  invalid: boolean = false
  private subscription = new Subscription()

  @Output()
  closePopup = new EventEmitter<any>();

  @Output()
  addCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();


  constructor(private router: Router, private teacherService: TeacherService) {
    this.createForm();
  }

  ngOnInit() {
    this.refreshTeachers();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  refreshTeachers(): void{
    this.subscription.add(this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    }));
  }

  private createForm(): void{
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      teacherId: new FormControl(null, [Validators.required])
    })
  }


  public closeModal() {
    this.closePopup.emit();
  }


  public add(): void{
    if(this.form.valid){
      this.invalid = false;
      this.startedCourse = this.form.value;
      this.router.navigate(['/course'],  { queryParams: { name: this.startedCourse.name,
          teacherId: this.startedCourse.teacherId} });
      document.body.classList.remove('overflow-hidden');
    } else {
      this.invalid = true;
    }
  }


}
