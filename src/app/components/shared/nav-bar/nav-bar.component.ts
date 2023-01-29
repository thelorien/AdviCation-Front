import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

const ADMIN_SUPERADMIN_ROL = [4];
const TEACHER_ROL = [2];
const STUDENT_ROL = [1];
const SECRETARY_ROL = [3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];
const USER: string[] = ["", ""]

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output()
  public sidenavToggle = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  public onToggleSidenav = (): void => {
    this.sidenavToggle.emit();
  }

  closeSession(): void {
    this.authService.closeSession();
    this.router.navigate(['/']);
  }

  get isAdmin(): boolean {
    return ADMIN_SUPERADMIN_ROL.includes(this.authService.isLoginUser().rol);
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

  get nameAndId(): string[] {
    USER[0] = this.authService.isLoginUser().name;
    USER[1] = String(this.authService.isLoginUser().id);
    return USER;
  }
}
