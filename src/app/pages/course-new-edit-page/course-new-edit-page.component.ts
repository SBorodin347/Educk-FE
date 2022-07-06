import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Course, COURSE_SEMESTER, COURSE_STATUS, COURSE_TYPE, LANGUAGE} from "../../models/course.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ClipboardService} from "ngx-clipboard";
import {TeacherService} from "../../services/user/teacher.service";
import {CourseDetailsComponent} from "../course-details-page/course-details.component";

@Component({
  selector: 'app-course-new-edit-page',
  templateUrl: './course-new-edit-page.component.html',
  styleUrls: ['./course-new-edit-page.component.scss']
})
export class CourseNewEditPageComponent implements OnInit, OnDestroy {

  id?: number
  form: FormGroup
  newCourse: boolean = undefined
  editCourse: boolean = undefined
  nameOfEditedCourse: string
  teachers = []
  courseCode: string
  isGenerated: boolean = false
  selectVisible: boolean = false
  searchString: string = ''
  private subscription: Subscription = new Subscription()

  // Data arrays
  languages = [LANGUAGE.ENGLISH, LANGUAGE.SLOVAK, LANGUAGE.RUSSIAN, LANGUAGE.HUNGARIAN, LANGUAGE.CZECH, LANGUAGE.POLISH];
  types = [COURSE_TYPE.A, COURSE_TYPE.B, COURSE_TYPE.C];
  terms = [COURSE_SEMESTER.WINTER, COURSE_SEMESTER.SUMMER];
  statuses = [COURSE_STATUS.APPROVED, COURSE_STATUS.REFUSED, COURSE_STATUS.CANCELLED]

  constructor(private courseService: CourseService, public activatedRoute: ActivatedRoute,
              private teacherService: TeacherService, private clipboardApi: ClipboardService, private router: Router) {
    this.id = activatedRoute.snapshot.params['id'];
    this.createForm();
  }

  ngOnInit(): void {
    /* Update course context */
    if(this.id !== undefined){
      this.subscription.add(this.courseService.getSubject(this.id).subscribe(data => {
        this.nameOfEditedCourse = data.name;
        this.fillForm(data)
        this.refreshTeachers(data.teacherId);
      }))
      this.editCourse = true
      this.form.controls.subjectCode.disable()
    } else {
    /* New course context */
      this.subscription.add(this.activatedRoute
        .queryParams
        .subscribe(params => {
          this.form.controls.name.setValue(params.name)
          this.form.controls.teacherId.setValue(Number(params.teacherId))
          this.refreshTeachers(Number(params.teacherId))
        }));
      this.newCourse = true
      this.form.controls.accessible.setValue(true); //default value for 'accessible'
      this.form.controls.teacherPasswordRequired.setValue(true); //default value for 'teacherPasswordRequired'
    }
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  getContext(): string{
    if(this.editCourse) return "Edit";
    else return "New";
  }

  indexOf(c){
    for(var i= 0, l = c.length; i<l; i++){
      if(c[i] == ' '){
        return i+1;
      }
    }
    return -1;
  }

  generateCourseCode(){
    let c = this.form.controls.name.value;
    let ind = this.indexOf(c);
    if(ind!= -1){
      this.courseCode = c.slice(0,1).toUpperCase() + c.slice(1,2).toLowerCase() +
        c.slice(ind, ind+1).toUpperCase() +
        c.slice(ind+1, ind+2).toLowerCase() + "-" + Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
     }else{
       this.courseCode = c.slice(0,1).toUpperCase() + c.slice(1,4).toLowerCase() + "-" + Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
    }
    this.form.controls.subjectCode.setValue(this.courseCode);
    this.isGenerated = true;
  }

  refreshTeachers(id: number): void{
    this.subscription.add(this.teacherService.getTeachers().subscribe(data => {
      this.putOnFirst(data, data.find((d) => d.id == id))
      this.teachers = data;
    }));
  }

  copyText() {
    this.clipboardApi.copyFromContent(this.form.controls.subjectCode.value);
  }

  private createForm(): void{
     this.form = new FormGroup({
       id: new FormControl(null),
       name: new FormControl(null, [Validators.required]),
       teacherId: new FormControl(null,[Validators.required]),
       hours: new FormControl(null, [Validators.required, Validators.min(10)]),
       credit: new FormControl(null, [Validators.required]),
       status: new FormControl(null, [Validators.required]),
       subjectType: new FormControl(null, [Validators.required]),
       abbreviation: new FormControl(null, [Validators.required]),
       subjectCode: new FormControl(null, [Validators.required]),
       semester: new FormControl(null, [Validators.required]),
       language: new FormControl(null, [Validators.required]),
       accessible: new FormControl(null),
       teacherPasswordRequired: new FormControl(null)
     })
  }

  private fillForm(course: Course){
    this.form.controls.id.setValue(course.id)
    this.form.controls.name.setValue(course.name)
    this.form.controls.teacherId.setValue(course.teacherId)
    this.form.controls.hours.setValue(course.hours)
    this.form.controls.credit.setValue(course.credit)
    this.form.controls.status.setValue(course.status)
    this.form.controls.subjectType.setValue(course.subjectType)
    this.form.controls.subjectCode.setValue(course.subjectCode)
    this.form.controls.semester.setValue(course.semester)
    this.form.controls.language.setValue(course.language)
    this.form.controls.abbreviation.setValue(course.abbreviation)
    this.form.controls.accessible.setValue(course.accessible)
    this.form.controls.teacherPasswordRequired.setValue(course.teacherPasswordRequired)
  }

  createCourse(): void{
    if(this.form.valid && this.newCourse){
      this.subscription.add(this.courseService.createSubject(this.form.value).subscribe( data => {
        this.router.navigate(['/courses/'+data],  { queryParams: { creationState: true} });
      }))
    }
  }


  updateCourse(): void{
    if(this.form.valid && this.editCourse){
        this.subscription.add(this.courseService.updateSubject(this.id, this.form.value).subscribe());
        this.router.navigate(['/courses/'+this.id]).then(() => {
        });
    }
  }

  deleteCourse(): void{
    if(confirm('Do you really want to delete this?')){
      this.subscription.add(this.courseService.getSubject(this.id).subscribe(data => {
        if(data.subscribedStudents.length >= 1){
          alert('This course cannot be deleted while students are subscribed to it');
        }else{
          this.subscription.add(this.courseService.deleteSubject(this.id).subscribe());
          this.router.navigate(['/courses'],  { queryParams: { removingState: true} });
        }
      }))
    }
  }

  cancelChanges(): void{
    if(this.editCourse) this.router.navigate(['/courses/'+this.id])
    else this.router.navigate(['/courses'])
  }

  toggleAccessible($event){
    const isChecked = $event.target.checked
    if(isChecked) this.form.controls.accessible.setValue(true)
    else this.form.controls.accessible.setValue(false)

  }

  toggleTeacherPassReq($event){
    const isChecked = $event.target.checked
    if(isChecked) this.form.controls.teacherPasswordRequired.setValue(true)
    else this.form.controls.teacherPasswordRequired.setValue(false)
  }

  putOnFirst(array, element){
    array.sort(function(x,y){
      return x == element ? -1 : y == element ? 1 : 0;
    });
  }

}
