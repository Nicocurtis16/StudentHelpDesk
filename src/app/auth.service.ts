import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://godinberto.pythonanywhere.com/api/admin/login'; // Updated API URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // URLSearchParams to encode query parameters
    const params = new URLSearchParams({
      username,
      password,
    }).toString();

    // Ensure that no unnecessary headers are set for GET requests
    return this.http.get<any>(`${this.apiUrl}?${params}`);
  }

  setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
