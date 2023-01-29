import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetAdviceComponent } from './set-advice/set-advice.component';
import { StudentRoutingModule } from './student-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ListAdvicesComponent } from './list-advices/list-advices.component';
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CancelAdviceComponent } from './cancel-advice/cancel-advice.component';

@NgModule({
  declarations: [
    SetAdviceComponent,
    ListAdvicesComponent,
    CancelAdviceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    StudentRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule
  ],

})
export class StudentModule { }
