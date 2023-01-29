import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdviceComponent } from './create-advice/create-advice.component';
import { ListAdvicesComponent } from './list-advices/list-advices.component';

const routes: Routes = [
  {
    path: 'create-advice',
    component: CreateAdviceComponent,
  },
  {
    path: 'list-advices',
    component: ListAdvicesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
