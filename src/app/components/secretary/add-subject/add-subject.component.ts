import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { Router } from '@angular/router';

const ADMIN_ROL = [4];
const TEACHER_ROL = [2];
const STUDENT_ROL = [1];
const SECRETARY_ROL = [3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subjectForm: FormGroup;


  constructor(private spinnerService: SpinnerService,private authService: AuthService,
    private httpClient: HttpClientService,private snackBarService: SnackBarService,private router: Router) {
    this.subjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (!this.isAdmin && !this.isSecretary) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
     var spinnerRef = this.spinnerService.start("Creando...");

     if (!this.subjectForm.valid) {
       return;
     }
     const subject= {
       name: this.subjectForm.controls.name.value,
       description: this.subjectForm.controls.description.value
     }
      this.httpClient.post(ENDPOINTS.addSubject, subject)
      .subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.snackBarService.openSnackBar2("Se ha creado la materia correctamente", "Aceptar");
          }
          else {
            this.snackBarService.openSnackBar2("Ha ocurrido un error al crear la materia", "Aceptar");
          }
          this.spinnerService.stop(spinnerRef);
        }
      );
  }

  get isAdmin(): boolean {
    return ADMIN_ROL.includes(this.authService.isLoginUser().rol);
  }

  get isTeacher(): boolean {
    return TEACHER_ROL.includes(this.authService.isLoginUser().rol);
  }

  get isStudent(): boolean {
    return STUDENT_ROL.includes(this.authService.isLoginUser().rol);
  }

  get isSecretary(): boolean {
    return SECRETARY_ROL.includes(this.authService.isLoginUser().rol);
  }

  get isLogin(): boolean {
    return !INVALID_DATA.includes(String(this.authService.isLoginUser()));
  }

}
