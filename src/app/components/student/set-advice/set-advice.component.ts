import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

const ADMIN_SUPERADMIN_ROL = [4];
const STUDENT_ROL = [1];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];
const USER: any[] = ["", ""]
let ID_ADVICE: number = 0;

@Component({
  selector: 'app-set-advice',
  templateUrl: './set-advice.component.html',
  styleUrls: ['./set-advice.component.css']
})
export class SetAdviceComponent implements OnInit {

  lista: string[] = [];


  formTime: FormGroup;
  closeModal: boolean = false;
  selected: string = "";
  constructor(private httpClient: HttpClientService, private spinner: SpinnerService,
    private snack: SnackBarService,private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) {
    this.formTime = new FormGroup({
      Time: new FormControl('', [Validators.required , Validators.pattern("^(?!No hay horas disponibles$).*$")])
    })
  }

  ngOnInit(): void {

    if (!this.isLogin && !this.isStudent && !this.isAdmin) {
      this.router.navigate(['/']);
    } else {
      const spinner = this.spinner.start("Cargando horarios...");
      const advice = {
        id_advice: this.data.id
      };
      ID_ADVICE = this.data.id;
      this.httpClient.post(ENDPOINTS.getAdvicesAvailables, advice).subscribe((result: any) => {
        if (result.status == 200) {
          this.lista = result.data;
        }
        this.spinner.stop(spinner);
      });
    }


  }

  setAdvice(): void {
    const spinner = this.spinner.start("Apartando Asesoria...");
    const advice = {
      id_advice: ID_ADVICE,
      id_student: this.nameAndId[1],
      time_advice: this.selected
    }
    this.httpClient.post(ENDPOINTS.setAdvice, advice).subscribe((result: any) => {
      if (result.status == 200) {
        this.snack.openSnackBar("Apartada con éxito!");
      } else {
        this.snack.openSnackBar("Error!!");
      }
      this.closeModal = true;
      this.spinner.stop(spinner);
    });
  }

  get isAdmin(): boolean {
    return ADMIN_SUPERADMIN_ROL.includes(this.authService.isLoginUser().rol);
  }

  get isStudent(): boolean {
    return STUDENT_ROL.includes(this.authService.isLoginUser().rol);
  }

  get isLogin(): boolean {
    return !INVALID_DATA.includes(String(this.authService.isLoginUser()));
  }

  get nameAndId(): string[] {
    USER[0] = this.authService.isLoginUser().name;
    USER[1] = String(this.authService.isLoginUser().id);
    return USER;
  }
}
