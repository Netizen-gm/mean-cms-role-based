import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(tap(response => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      }));
  }

  register(fullName: string, email: string, password: string, roleName: string, profilePhoto?: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, {
      fullName,
      email,
      password,
      roleName,
      profilePhoto
    });
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.http.post(`${this.apiUrl}/auth/logout`, { refreshToken }).subscribe();
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<any>(`${this.apiUrl}/auth/refresh`, { token: refreshToken })
      .pipe(tap(response => {
        if (response && response.access) {
          localStorage.setItem('accessToken', response.access);
        }
      }));
  }
}
