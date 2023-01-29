import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { AdviceSecretary } from 'src/app/models/Advice-secretary';
import { ResponseService } from 'src/app/models/response-service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

const ADMIN_ROL = [4];
const TEACHER_ROL = [2];
const STUDENT_ROL = [1];
const SECRETARY_ROL = [3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReportsComponent implements OnInit {

  @ViewChild(MatTable)
  dataSource!: MatTable<AdviceSecretary>;

  expandedElement: AdviceSecretary | null;

  columnas: string[] = ['id', 'teacherName', 'topic', 'date', 'start_time', 'end_time', 'actions'];
  columnas2: string[] = ['id', 'full_name', 'email', 'date_advice_student', 'time_start_student', 'time_end_student'];

  columnsToDisplayWithExpand = [...this.columnas, 'expand'];

  datos: AdviceSecretary[] = [];

  constructor(private spinnerService: SpinnerService,private httpClient: HttpClientService,
    private router: Router, private authService: AuthService,) { }

  ngOnInit(): void {
    if (!this.isAdmin && !this.isSecretary) {
      this.router.navigate(['/']);
    }
    this.loadData();
  }
  loadData(): void {
    const spinner = this.spinnerService.start("Cargando listado de asesorias...");
    this.httpClient.get<ResponseService<AdviceSecretary>>(ENDPOINTS.reports)
      .subscribe((result: ResponseService<AdviceSecretary>) => {
        if (result.status == 200) {
          console.log(result.data);
          this.datos = result.data;
        }
        this.spinnerService.stop(spinner);
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
