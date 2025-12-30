import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
@Component({ selector: 'app-login', template: `
<h2>Login</h2>
<form (ngSubmit)="login()">
  <label>Email</label><br>
  <input [(ngModel)]="email" name="email" required /><br>
  <label>Password</label><br>
  <input [(ngModel)]="password" name="password" type="password" required /><br>
  <button type="submit">Login</button>
</form>
` })
export class LoginComponent {
  email = ''
  password = ''
  constructor(private http: HttpClient, private router: Router) {}
  login(){
    this.http.post(`${environment.apiUrl}/auth/login`, { email: this.email, password: this.password }).subscribe((res:any)=>{
      localStorage.setItem('access', res.access)
      this.router.navigateByUrl('/')
    }, err=> alert('Login failed'))
  }
}
