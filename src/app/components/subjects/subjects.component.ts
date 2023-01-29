import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ResponseService } from 'src/app/models/response-service';
import { Subjects } from 'src/app/models/subjects';
import { UserLoginSucess } from 'src/app/models/user-login-success';
import { MatDialog } from '@angular/material/dialog';
import { ENDPOINTS } from 'src/app/config/endpoints';

const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects: Subjects[] = [];
  dataUser: UserLoginSucess;
  constructor(private httpClient: HttpClientService, private spinner: SpinnerService,
    private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDataUser();
    this.loadData();
  }
  get isLogin(): boolean {
    return !INVALID_DATA.includes(String(this.authService.isLoginUser()));
  }

  loadData(): void {
    const spinner = this.spinner.start("Cargando listado de asesorias...");
    this.httpClient.get<ResponseService<Subjects>>(ENDPOINTS.getSubjects)
      .subscribe((result: ResponseService<Subjects>) => {
        if (result.status == 200) {
          this.subjects = result.data;
        }
        this.spinner.stop(spinner);
      });
  }
  loadDataUser(): void {
    if (this.isLogin) {
      this.dataUser = this.authService.isLoginUser();
    }
  }
}
