import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserLogin } from 'src/app/models/user-login';
import { AuthService } from 'src/app/services/auth/auth.service';

const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  sessionOk: number = 0;

  constructor(private router: Router,
    private authService: AuthService,
    private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',),]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.isLogin) {
      this.router.navigate(['/']);
    }else{
      this.loginForm.valueChanges.subscribe(() => this.sessionOk = 0);
    }
  }

  onSubmit() {

    if (!this.loginForm.valid) {
      return;
    }
    const user: UserLogin = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.login(user).subscribe((data) => {

      if (data.status == 200) {
        this.sessionOk = 1;

        this.cookieService.set('login', JSON.stringify(data), 1, '/');
        this.router.navigate(['/']);
        if (data.rol == 2 || data.rol == 3) {
          this.cookieService.set('admin', JSON.stringify(data.rol), 1, '/admin');
          this.router.navigate(['/']);
        }
      } else {
        this.sessionOk = 2;
      }
    });
  }

  get isLogin(): boolean {
    return !INVALID_DATA.includes(String(this.authService.isLoginUser()));
  }

}
