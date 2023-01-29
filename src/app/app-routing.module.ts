import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home-ass.component';
import { SubjectsComponent } from './components/subjects/subjects.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./components/student/student.module')
      .then(m => m.StudentModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./components/teacher/teacher.module')
      .then(m => m.TeacherModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module')
      .then(m => m.AdminModule)
  },
  {
    path: 'secretary',
    loadChildren: () => import('./components/secretary/secretary.module')
      .then(m => m.SecretaryModule)
  },
  {
    path: 'subjects',
    component: SubjectsComponent
  },
  {
    path: '**',
    component: HomeComponent
  },

];


export const routing = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
