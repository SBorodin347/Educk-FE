import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {NgxPermissionsService} from "ngx-permissions";
import {AuthService} from "../../services/authentication/auth.service";
import {ROLE} from "../../models/user.model";
import {CourseService} from "../../services/course/course.service";
import {SubscriptionModelList} from "../../models/subscriptionModel";

enum NAV {COURSES, USERS, HOME, REFERENT, TEACHER, STUDENT, SECURITY, PROFILE, EXAMS, COURSES_OVERVIEW}



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  href: string = "";
  routeTo = NAV;
  ROLE = ROLE;
  dropdown: boolean = false;
  userHover: boolean = false;
  numberOfSubs: number;
  // subs: SubscriptionModelList = [];

  constructor(private router: Router, private courseService: CourseService, private auth: AuthService) {
  }

  ngOnInit() {
    this.href = this.router.url;
    if(this.dropLinkActiveForCourses()){
      this.courseService.getStudentCourses(this.auth.getUserId()).subscribe(data => {
        // this.numberOfSubs = data.length;
        // this.subs = data;
      })
    }
  }

  @Input()
  public activeLink: string;

  public openDropdown(){
    this.dropdown = !this.dropdown;
  }

  public dropLinkActive(): boolean{
    if(this.activeLink == 'teachers' || this.activeLink == 'students' || this.activeLink == 'referents' || this.activeLink == 'user'){
      return true;
    }
  }

  public dropLinkActiveForCourses(): boolean {
    if (this.activeLink == 'courses' || this.activeLink == 'overview') return true
  }

  public isActive(s: string){
      return s == this.href;
  }

  navigation(n : NAV){
    if(n === NAV.COURSES)
      this.router.navigate(['/courses']);
    if(n === NAV.USERS)
      this.router.navigate(['/users']);
    if(n === NAV.HOME)
      this.router.navigate(['/']);
    if(n === NAV.REFERENT)
      this.router.navigate(['/referents'])
    if(n === NAV.TEACHER)
      this.router.navigate(['/teachers']);
    if(n === NAV.STUDENT)
      this.router.navigate(['/students']);
    if(n == NAV.SECURITY)
      this.router.navigate(['/security']);
    if(n == NAV.PROFILE)
      this.router.navigate(['/profile']);
    if(n == NAV.EXAMS)
      this.router.navigate(['/exams']);
    if(n == NAV.COURSES_OVERVIEW)
      this.router.navigate(['/courses/subscriptions']);
  }
}
