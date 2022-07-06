import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {CoursePageComponent} from "./pages/course-page/course-page.component";
import {TeacherPageComponent} from "./pages/teacher-page/teacher-page.component";
import {StudentPageComponent} from "./pages/student-page/student-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./interceptors/auth.guards";
import {OrganizationPageComponent} from "./pages/organization-page/organization-page.component";
import {CourseDetailsComponent} from "./pages/course-details-page/course-details.component";
import {SecurityPageComponent} from "./pages/security-page/security-page.component";
import {CourseNewEditPageComponent} from "./pages/course-new-edit-page/course-new-edit-page.component";
import {ReferentPageComponent} from "./pages/referent-page/referent-page.component";
import {UserNewEditPageComponent} from "./pages/user-new-edit-page/user-new-edit-page.component";
import {NgxPermissionsGuard} from "ngx-permissions";
import {ROLE} from "./models/user.model";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {ExamsPageComponent} from "./pages/exams-page/exams-page.component";
import {CourseOverviewPageComponent} from "./pages/course-overview-page/course-overview-page.component";
import {InstitutionPageComponent} from "./pages/institution-page/institution-page.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MenuComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'courses',
        component: CoursePageComponent,
      },
      {
        path: 'courses/subscriptions',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [ROLE.STUDENT],
            redirectTo: '/',
          }
        },
        component: CourseOverviewPageComponent
      },
      {
        path: 'courses/:id',
        component: CourseDetailsComponent,
      }
    ]
  },
  {
    path: 'courses/:id/edit',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [ROLE.ADMIN, ROLE.REFERENT],
        redirectTo: '/',
      }
    },
    component: CourseNewEditPageComponent
  },
  {
    path: 'institution',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [ROLE.ADMIN, ROLE.REFERENT],
        redirectTo: '/',
      }
    },
    component: InstitutionPageComponent
  },
  {
    path: 'course',
    canActivate: [AuthGuard],
    component: CourseNewEditPageComponent
  },
  {
    path: 'user',
    canActivate: [NgxPermissionsGuard],
    component: UserNewEditPageComponent,
    data: {
      permissions: {
        only: [ROLE.ADMIN, ROLE.REFERENT],
        redirectTo: '/',
      }
    }
  },
  {
    path: 'students',
    canActivate: [NgxPermissionsGuard],
    component: StudentPageComponent,
    data: {
      permissions: {
        only: [ROLE.ADMIN, ROLE.REFERENT],
        redirectTo: '/'
      }
    }
  },
  {
    path: 'teachers',
    canActivate: [NgxPermissionsGuard],
    component: TeacherPageComponent,
    data: {
      permissions: {
        only: [ROLE.ADMIN, ROLE.REFERENT],
        redirectTo: '/'
      }
    }
  },
  {
    path: 'referents',
    canActivate: [NgxPermissionsGuard],
    component: ReferentPageComponent,
    data: {
      permissions: {
        only: [ROLE.ADMIN, ROLE.REFERENT],
        redirectTo: '/'
      }
    }
  },
  {
    path: 'organization',
    canActivate: [AuthGuard],
    component: OrganizationPageComponent
  },
  {
    path: 'exams',
    canActivate: [AuthGuard],
    component: ExamsPageComponent
  },
  {
    path: 'security',
    canActivate: [AuthGuard],
    component: SecurityPageComponent
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
