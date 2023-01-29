import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { Advice } from 'src/app/models/advice';
import { AdviceList } from 'src/app/models/advice-list';
import { ResponseService } from 'src/app/models/response-service';
import { UserLoginSucess } from 'src/app/models/user-login-success';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { SetAdviceComponent } from '../set-advice/set-advice.component';

const ADMIN_ROL = [4];
const TEACHER_ROL = [2];
const STUDENT_ROL = [1];
const SECRETARY_ROL = [3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'list-advices',
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

  articuloselect: Advice = new Advice("", "", "", "", "", "", "", "");

  @ViewChild(MatTable)
  dataSource!: MatTable<Advice>;

  expandedElement: Advice | null;

  columnas: string[] = ['id', 'teacherName', 'topic', 'date', 'start_time', 'end_time', 'actions'];


  columnsToDisplayWithExpand = [...this.columnas, 'expand'];

  datos: Advice[] = [];

  dataUser: UserLoginSucess;

  constructor(private httpClient: HttpClientService, private spinner: SpinnerService,
    private authService: AuthService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    if (!this.isLogin && !this.isStudent && !this.isAdmin) {
      this.router.navigate(['/']);
    } else {
      this.loadDataUser();
      this.loadData();
    }
  }

  loadData(): void {
    const spinner = this.spinner.start("Cargando listado de asesorias...");
    this.httpClient.get<ResponseService<AdviceList>>(
      this.dataUser.rol == 1 ? ENDPOINTS.getAllAdvicesFromStudent : ENDPOINTS.getAllAdvicesFromStudent)
      .subscribe((result: ResponseService<AdviceList>) => {
        if (result.status == 200) {
          this.datos = result.data;
        }
        this.spinner.stop(spinner);
      });
  }

  loadDataUser(): void {
    if (this.isLogin) {
      this.dataUser = this.authService.isLoginUser();
    }
  }

  setAdvice(id: number): void {
    const dialogRef = this.dialog.open(SetAdviceComponent, {
      data: {
        id: id
      }
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
