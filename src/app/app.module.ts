import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './menu/menu.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { CourseFormComponent } from './forms/course-form/course-form.component';
import { SubjectListComponent } from './tables/course-list/subject-list.component';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { HeaderComponent } from './across-components/header/header.component';
import { SidebarComponent } from './across-components/sidebar/sidebar.component';
import { LoginFormComponent } from "./forms/login-form/login-form.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {AuthHeaderInterceptor} from "./interceptors/auth-header.interceptor";
import { OrganizationPageComponent } from './pages/organization-page/organization-page.component';
import {TableModule} from "@sebgroup/ng-components";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CourseFilterByNamePipe} from "./shared/subject-filter.pipe";
import { CourseDetailsComponent } from './pages/course-details-page/course-details.component';
import {NgxPermissionsModule, NgxPermissionsRestrictStubModule} from 'ngx-permissions';
import { SecurityPageComponent } from './pages/security-page/security-page.component';
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import { SortModalComponent } from './modal-windows/sort-modal/sort-modal.component';
import { CourseNewEditPageComponent } from './pages/course-new-edit-page/course-new-edit-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReferentPageComponent } from './pages/referent-page/referent-page.component';
import { UserNewEditPageComponent } from './pages/user-new-edit-page/user-new-edit-page.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { SubscriptionsListComponent } from './tables/subscriptions-list/subscriptions-list.component';
import { SubscribedCourseInfoComponent } from './sections/subscribed-course-info/subscribed-course-info.component';
import {ClipboardModule} from "ngx-clipboard";
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ExamsPageComponent } from './pages/exams-page/exams-page.component';
import { CourseOverviewPageComponent } from './pages/course-overview-page/course-overview-page.component';
import { CourseTypeFilterPipe } from './shared/course-type-filter.pipe';
import { CourseTermFilterPipe } from './shared/course-term-filter.pipe';
import { StudentCourseGridComponent } from './tables/student-course-grid/student-course-grid.component';
import { UserFilterPipe } from './shared/student-filter.pipe';
import { UserSelectComponent } from './ui-components/user-select/user-select.component';
import { LanguageSelectComponent } from "./ui-components/language-select/language-select.component";
import { CourseInviteModalComponent } from './modal-windows/course-invite-modal/course-invite-modal.component';
import { CourseAssessmentComponent } from './modal-windows/course-assessment/course-assessment.component';
import {TextTransformPipe} from "./shared/text-transform.pipe";
import {EnumCourseTransformPipe} from "./shared/assessment-transform.pipe";
import { InstitutionPageComponent } from './pages/institution-page/institution-page.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        CoursePageComponent,
        CourseFormComponent,
        SubjectListComponent,
        TeacherPageComponent,
        StudentPageComponent,
        HeaderComponent,
        SidebarComponent,
        LoginFormComponent,
        LoginPageComponent,
        OrganizationPageComponent,
        CourseFilterByNamePipe,
        CourseDetailsComponent,
        SecurityPageComponent,
        SortModalComponent,
        SortModalComponent,
        CourseNewEditPageComponent,
        UserListComponent,
        ReferentPageComponent,
        UserNewEditPageComponent,
        UserFormComponent,
        SubscriptionsListComponent,
        SubscribedCourseInfoComponent,
        SettingsPageComponent,
        ExamsPageComponent,
        CourseOverviewPageComponent,
        CourseTypeFilterPipe,
        CourseTermFilterPipe,
        StudentCourseGridComponent,
        UserFilterPipe,
        UserSelectComponent,
        LanguageSelectComponent,
        CourseInviteModalComponent,
        CourseAssessmentComponent,
        TextTransformPipe,
        EnumCourseTransformPipe,
        InstitutionPageComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    NgbModule,
    NgxPermissionsModule.forRoot(),
    NgxPermissionsRestrictStubModule,
    ClipboardModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
