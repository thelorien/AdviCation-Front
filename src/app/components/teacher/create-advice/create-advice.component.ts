import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAdvice } from 'src/app/models/create-advice';
import { MyErrorStateMatcher } from 'src/app/providers/custom-validators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { Subjects } from 'src/app/models/subjects';
import { UserLoginSucess } from 'src/app/models/user-login-success';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { ResponseService } from 'src/app/models/response-service';


const ADMIN_ROL = [4];
const TEACHER_ROL = [2];
const STUDENT_ROL = [1];
const SECRETARY_ROL = [3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];
@Component({
  selector: 'app-create-advice',
  templateUrl: './create-advice.component.html',
  styleUrls: ['./create-advice.component.css']
})
export class CreateAdviceComponent implements OnInit {

  subjects: Subjects[] = [];

  dataUser: UserLoginSucess;

  horas: string[] = [
    "00:00", "00:15", "00:30", "00:45",
    "01:00", "01:15", "01:30", "01:45",
    "02:00", "02:15", "02:30", "02:45",
    "03:00", "03:15", "03:30", "03:45",
    "04:00", "04:15", "04:30", "04:45",
    "05:00", "05:15", "05:30", "05:45",
    "06:00", "06:15", "06:30", "06:45",
    "07:00", "07:15", "07:30", "07:45",
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00", "18:15", "18:30", "18:45",
    "19:00", "19:15", "19:30", "19:45",
    "20:00", "20:15", "20:30", "20:45",
    "21:00", "21:15", "21:30", "21:45",
  ];

  selected: number = 0;
  start_time: string = "";
  end_time: string = "";

  adviceForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private httpClient: HttpClientService,
    private spinnerService: SpinnerService, private snackBarService: SnackBarService,
    private authService: AuthService,) {
    this.adviceForm = new FormGroup({
      topic: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      id_subject: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      start_time: new FormControl('', [Validators.required]),
      end_time: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (!this.isTeacher && !this.isAdmin ) {
      this.router.navigate(['/']);
    } else {
      this.loadDataUser();
      this.loadData();
    }
  }


  loadData(): void {
    const spinner = this.spinnerService.start("Cargando listado de materias...");
    this.httpClient.get<ResponseService<Subjects>>(ENDPOINTS.getSubjects)
      .subscribe((result: ResponseService<Subjects>) => {
        if (result.status == 200) {
          this.subjects = result.data;
        }
        this.spinnerService.stop(spinner);
      });
  }
  print() {
    console.log(this.adviceForm.controls.date.value.toISOString().split('T')[0]);
  }


  onSubmit() {
    var spinnerRef = this.spinnerService.start("Creando Asesoria...");

    if (!this.adviceForm.valid) {
      return;
    }
    const advice: CreateAdvice = {
      topic: this.adviceForm.controls.topic.value,
      description: this.adviceForm.controls.description.value,
      id_subject: this.selected,
      date: this.adviceForm.controls.date.value.toISOString().split('T')[0],
      start_time: this.adviceForm.controls.start_time.value,
      end_time: this.adviceForm.controls.end_time.value,
      id_teacher: this.dataUser.id,
    }

    this.httpClient.post(ENDPOINTS.addAvice, advice).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.snackBarService.openSnackBar2("Se ha creado la asesoría correctamente", "Aceptar");
        }
        else {
          this.snackBarService.openSnackBar2("Ha ocurrido un error al registrar la asesoría", "Aceptar");
        }
        this.spinnerService.stop(spinnerRef);
      });
  }


  loadDataUser(): void {
    if (this.isLogin) {
      this.dataUser = this.authService.isLoginUser();
    }
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
