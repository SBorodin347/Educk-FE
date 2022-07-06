import {
  Component,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import {Course, CoursesList} from "../../models/course.model";
import {CourseService} from "../../services/course/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ROLE, UserList} from "../../models/user.model";
import {SubjectListComponent} from "../../tables/course-list/subject-list.component";

enum TAB {TAB1, TAB2,TAB3}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})

export class CoursePageComponent implements OnDestroy{

  allCourses: CoursesList[] = []
  teachers: UserList[] = []
  activeSubject?: Course
  popup: boolean = false
  tab: number = 1
  toolbarVisible = false
  ROLE = ROLE;
  public searchString = ''
  successAdd: boolean = false;
  successEdit: boolean = false;
  successRemove: boolean = false;
  private subscription: Subscription = new Subscription()

  constructor(private router: Router, private subjectService: CourseService,
              public activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void{
    this.refreshSubjects();
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.removingState != undefined){
        this.successRemove = true;
        window.history.replaceState({}, '',`/courses`);
        setTimeout(()=>{
          this.refreshSubjects();
          this.successRemove = false;
        }, 2000)
      }
    })
    this.currentPageUrl = this.router.url;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @ViewChild(SubjectListComponent)
  childComponentList: SubjectListComponent

  @Output()
  showToolbar(){
    this.toolbarVisible = true;
  }

  @Output()
  hideToolbar(){
    this.toolbarVisible = false;
  }

  deleteCourse(){
    if (confirm('Do you really want to delete this?')){
      this.childComponentList.deleteCourses();
      this.childComponentList.showRemovingNotification();
      this.hideToolbar();
    }
  }

  exportCourse(){
    this.childComponentList.openPDF();
    this.childComponentList.uncheck();
    this.hideToolbar();
  }

  public currentPageUrl: string;

  switchTab(t: TAB){
    this.tab = t;
  }

  refreshSubjects(): void{
    this.subscription.add(this.subjectService.getSubjects().subscribe(data => {
      this.allCourses = data;
    }));
  }


  add(subject: Course): void{
    this.subscription.add(this.subjectService.createSubject(subject).subscribe(data => {
      this.refreshSubjects();
    }));
  }

  edit(subject: Course): void{
    if(subject.id !== undefined){
      this.subscription.add(this.subjectService.updateSubject(subject.id, subject).subscribe(data => {
        this.refreshSubjects();
      }));
    }
  }



  deleteCourseFromList(subjectId: number): void {
      this.subscription.add(this.subjectService.deleteSubject(subjectId).subscribe(data => {
        this.refreshSubjects();
      }));
  }

  public openPopup(){
    this.popup = true;
    document.body.classList.add('overflow-hidden');
  }

  public closePopup(){
    this.activeSubject = null;
    this.popup = false;
    document.body.classList.remove('overflow-hidden');
  }

}
