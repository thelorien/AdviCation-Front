import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { ResponseService } from 'src/app/models/response-service';
import { UserList } from 'src/app/models/user-list';
import { UserLoginSucess } from 'src/app/models/user-login-success';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ChangeRolComponent } from '../change-rol/change-rol.component';

const ADMIN_ROL = [4];
const TEACHER_ROL = [2];
const STUDENT_ROL = [1];
const SECRETARY_ROL = [3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  dataSource: MatTableDataSource<UserList>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns= ['id', 'full_name', 'email', 'role', 'actions'];
  constructor(private spinner: SpinnerService,private httpClient: HttpClientService,
    private authService: AuthService,private dialog: MatDialog,private router: Router) { }

  dataUser: UserLoginSucess;


  ngOnInit(): void {
    if (!this.isAdmin){
      this.router.navigate(['/']);
    }else{
      this.loadDataUser();
      this.loadData();
    }

  }

  changeRol(id: number): void {
     const dialogRef = this.dialog.open(ChangeRolComponent, {
       data: {
         id: id
       }
     });
      dialogRef.afterClosed().subscribe(result => {
        this.loadData();
      }
    );
  }

  loadData(): void {
    const spinner = this.spinner.start("Cargando listado de usuarios...");
    this.httpClient.get<ResponseService<UserList>>(
      this.dataUser.rol == 1 ? ENDPOINTS.getAllUsers : ENDPOINTS.getAllUsers )
      .subscribe((result: ResponseService<UserList>) => {
        if (result.status == 200) {
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.spinner.stop(spinner);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
