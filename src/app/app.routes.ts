import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';

export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'courses', component: CoursesComponent },
     { path: '**', redirectTo: '/not-found' }
];