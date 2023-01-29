import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

const ADMIN_ROL = [4];
const TEACHER_ROL = [2];
const STUDENT_ROL = [1];
const SECRETARY_ROL = [3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-change-rol',
  templateUrl: './change-rol.component.html',
  styleUrls: ['./change-rol.component.css']
})
export class ChangeRolComponent implements OnInit {
  rols = [
    { "id": "1", "name": "Estudiante" },
    { "id": "2", "name": "Profesor" },
    { "id": "3", "name": "Secretaria" },
    { "id": "4", "name": "Administrador" }
  ];
  formRols: FormGroup;
  closeModal: boolean = false;
  selected: string = "";
  constructor(private httpClient: HttpClientService, private spinner: SpinnerService,
    private snack: SnackBarService,private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) {
    this.formRols = new FormGroup({
      rol: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if (!this.isAdmin){
      this.router.navigate(['/']);
    }
  }

  changeRol(): void {
    const spinner = this.spinner.start("Cambiando Rol...");
    const rol = {
      id: this.data.id,
      id_rol: this.selected
    }
    this.httpClient.post(ENDPOINTS.updateRol, rol).subscribe((result: any) => {
      if (result.status == 200) {
        this.snack.openSnackBar("Rol cambiado con éxito!");

      } else {
        this.snack.openSnackBar("Error!!");
      }
      this.closeModal = true;
      this.spinner.stop(spinner);
    });
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
