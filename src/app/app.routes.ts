import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { AcademicsComponent } from './pages/academics/academics.component';
import { BusinessComponent } from './pages/business/business.component';
import { InfoComponent } from './pages/info/info.component';
import { StudentPortalComponent } from './pages/student-portal/student-portal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'courses', component: CoursesComponent },
     { path: 'academics', component: AcademicsComponent },
     { path: 'business', component: BusinessComponent },
     { path: 'info', component: InfoComponent },
     { path: 'student-portal', component: StudentPortalComponent },
     { path: 'not-found', component: NotFoundComponent },
     { path: '**', redirectTo: '/not-found' }
];