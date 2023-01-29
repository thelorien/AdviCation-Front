import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetAdviceComponent } from './set-advice/set-advice.component';
import { ListAdvicesComponent } from './list-advices/list-advices.component';
import { CancelAdviceComponent } from './cancel-advice/cancel-advice.component';

const routes: Routes = [
  {
    path: 'set-advice',
    component: SetAdviceComponent,
  },
  {
    path: 'list-advices',
    component: ListAdvicesComponent,
  },
  {
    path: 'cancel-advice',
    component: CancelAdviceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
