import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { Advice } from 'src/app/models/advice';
import { AdviceList } from 'src/app/models/advice-list';
import { ResponseService } from 'src/app/models/response-service';
import { UserLoginSucess } from 'src/app/models/user-login-success';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTable } from '@angular/material/table';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { Router } from '@angular/router';

const ADMIN_ROL = [4];
const TEACHER_ROL = [2];
const STUDENT_ROL = [1];
const SECRETARY_ROL = [3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-list-advices',
  templateUrl: './list-advices.component.html',
  styleUrls: ['./list-advices.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListAdvicesComponent implements OnInit {
  @ViewChild(MatTable) tabla1!: MatTable<Advice>;

  columnas: string[] = ['id', 'topic', 'date', 'start_time', 'end_time', 'expand'];

  columnsToDisplayWithExpand = [...this.columnas, 'expand'];

  expandedElement: Advice | null;

  datos: Advice[] = [];

  dataUser: UserLoginSucess;

  constructor(private httpClient: HttpClientService, private spinner: SpinnerService,
    private authService: AuthService, private dialog: MatDialog, private snackBarService: SnackBarService, private router: Router) { }

  ngOnInit(): void {
    if (!this.isTeacher && !this.isAdmin) {
      this.router.navigate(['/']);
    } else {
      this.loadDataUser();
      this.loadData();
    }

  }

  loadDataUser(): void {
    if (this.isLogin) {
      this.dataUser = this.authService.isLoginUser();
    }
  }

  loadData(): void {
    const spinner = this.spinner.start("Cargando listado de asesorias...");
    const map = new Map();
    map.set('id', this.dataUser.id);
    this.httpClient.get<ResponseService<AdviceList>>(ENDPOINTS.getAdvicesFromTeacher, map)
      .subscribe((result: ResponseService<AdviceList>) => {
        if (result.status == 200) {
          this.datos = result.data;
        } else if (result.status == 409) {
          this.snackBarService.openSnackBar("No hay asesorias creadas");
        }
        this.spinner.stop(spinner);
      });
  }
  deleteMetting(columnId: number, idMetting: number) {
    if (window.confirm('Seguro que quieres eliminiar esta reunion?')) {
      const spinner = this.spinner.start("Eliminando asesoria...");
      const metting = {
        id_advice: idMetting
      };
      this.httpClient.post<ResponseService<AdviceList>>(ENDPOINTS.deleteAdvice, metting)
        .subscribe((result: ResponseService<AdviceList>) => {
          if (result.status == 200) {
            this.snackBarService.openSnackBar2("Eliminado correctamente", "Aceptar");
            this.loadData();
            this.tabla1.renderRows();
          } else {
            this.spinner.stop(spinner);
            this.snackBarService.openSnackBar("Error al eliminar");
          }
          this.spinner.stop(spinner);
        });
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
