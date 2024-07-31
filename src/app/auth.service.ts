import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://godinberto.pythonanywhere.com/api/admin/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap((response) => {
        console.log('Login response:', response);
        if (response && response.access_token) {
          localStorage.setItem('authToken', response.access_token);
        } else {
          console.error('Token not found in login response');
        }
      })
    );
  }

  setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
