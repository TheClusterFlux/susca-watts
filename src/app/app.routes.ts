import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { InfoComponent } from './pages/info/info.component';
import { StudentPortalComponent } from './pages/student-portal/student-portal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccreditationComponent } from './pages/accreditation/accreditation.component';
import { RplComponent } from './pages/rpl/rpl.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { ConsultingComponent } from './pages/consulting/consulting.component';
import { FreelanceComponent } from './pages/freelance/freelance.component';

export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'courses', component: CoursesComponent },
     { path: 'info', component: InfoComponent },
     { path: 'student-portal', component: StudentPortalComponent },
     { path: 'accreditation', component: AccreditationComponent },
     { path: 'rpl', component: RplComponent },
     { path: 'finance', component: FinanceComponent },
     { path: 'consulting', component: ConsultingComponent },
     { path: 'freelance', component: FreelanceComponent },
     { path: 'not-found', component: NotFoundComponent },
     { path: '**', redirectTo: '/not-found' }
];