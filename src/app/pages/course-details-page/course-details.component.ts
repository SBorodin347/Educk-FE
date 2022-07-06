import {Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../services/course/course.service";
import {Course, COURSE_STATUS} from "../../models/course.model";
import {Subscription} from "rxjs";
import {SubscriptionModel, SubscriptionModelList} from "../../models/subscriptionModel";
import {ROLE} from "../../models/user.model";
import {SubscriptionsListComponent} from "../../tables/subscriptions-list/subscriptions-list.component";
import {StudentService} from "../../services/user/student.service";

@Component({
  selector: 'app-course-details-page',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})

export class CourseDetailsComponent implements OnInit, OnDestroy {

  constructor(private activatedRoute: ActivatedRoute, private subjectService: CourseService, private studentService:
    StudentService, private router: Router) {}

  id?: number
  detailedSubject: Course
  subscribeInterface: SubscriptionModel
  subModels: SubscriptionModelList
  pageSize: number = 16
  page: number = 1
  currentPageUrl: string
  subscriptionCourses: SubscriptionModelList[] = []
  subscriptionOfCurrentUser: SubscriptionModelList
  STATUS = COURSE_STATUS
  ROLE = ROLE
  isSubscribed: boolean = false
  toolbarVisible: boolean = false
  invitePopup: boolean = false
  assessmentPopup: boolean = false;
  url: string
  detailedSub: SubscriptionModel
  private subscription: Subscription = new Subscription()

  @ViewChild(SubscriptionsListComponent)
  childComponent: SubscriptionsListComponent

  @Output()
  showToolbar(){
    this.toolbarVisible = true;
  }

  @Output()
  hideToolbar(){
    this.toolbarVisible = false;
  }

  @ViewChild(SubscriptionsListComponent)
  childComponentList: SubscriptionsListComponent;

  ngOnInit(): void {
   this.url = 'localhost:4200'+this.router.url;
   this.subscription.add(this.activatedRoute.params.subscribe((routerParam)  => {
      this.id = routerParam.id
    }));
   this.getSubjectAndSubscriptions();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSubjectAndSubscriptions(){
    this.subscribeInterface = new SubscriptionModel(this.id, Number(localStorage.getItem('id')));
    this.subscription.add(this.subjectService.getSubject(this.id).subscribe(data => {
      this.detailedSubject = data;
      if(this.detailedSubject != undefined && this.detailedSubject.subscribedStudents != null){
        for(let student of this.detailedSubject.subscribedStudents){
          this.subjectService.getSubscription(this.id, student).subscribe(data => {
            this.subscriptionCourses.push(data);
            if(student == this.subscribeInterface.studentId){
              this.subscriptionOfCurrentUser = data;
            }
          })
          if(student == this.subscribeInterface.studentId){
            this.isSubscribed = true;
          }
        }
      }
    }));
  }

  refreshCourse(){
    this.subjectService.getSubject(this.id).subscribe(data => {
      this.detailedSubject = data;
    })
  }

  subscribeForCourse() {
    this.subjectService.subscribeForCourse(this.subscribeInterface).subscribe(data => {
      this.subjectService.getSubscription(this.subscribeInterface.subjectId, this.subscribeInterface.studentId).subscribe(data => {
        this.subscriptionCourses.push(data);
        this.subscriptionOfCurrentUser = data;
      })
    })
    this.isSubscribed = true;
  }

  unsubscribeFromCourse() {
    if(confirm('Do you really want to unsubscribe from the course?')){
      this.subjectService.unsubscribeFromCourse(this.subscribeInterface).subscribe();
      this.subscriptionCourses = this.subscriptionCourses.filter(n => n.studentId != this.subscribeInterface.studentId);
      this.isSubscribed = false;
    }
  }

  removeStudent(): void{
    if(confirm('Do you really want to remove a student from the list?')){
      this.childComponent.deleteFromCourse();
      this.hideToolbar();
    }
  }

  deleteStudentFromCourse(model: SubscriptionModel): void{
    this.subscription.add(this.subjectService.deleteFromCourse(model.subjectId, model.studentId).subscribe());
    this.subscriptionCourses = this.subscriptionCourses.filter(n => n.studentId != model.studentId)
  }

  exportStudent(): void{
    this.childComponentList.openPDF();
    this.childComponentList.uncheck();
    this.hideToolbar();
  }

  public countOfPages(): number{
    return Math.ceil(this.subscriptionCourses.length / this.pageSize);
  }

  capitalString(str: string): string{
    if(str != null){
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  }

  switchInviteModal(): void{ this.invitePopup = !this.invitePopup ;}


  openDetailsOfSub(sub: SubscriptionModel){
    this.detailedSub = sub;
    this.assessmentPopup = !this.assessmentPopup;
  }

}
