import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../app/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://godinberto.pythonanywhere.com/api/admin/getUser';

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    const token = localStorage.getItem('authToken');
    if (!token || token.split('.').length !== 3) {
      console.error('Invalid token:', token);
      return throwError(new Error('Invalid token'));
    }
    console.log('Token being sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map((response) => {
        if (response['User Details'] && response['User Details'].length > 0) {
          const userDetail = response['User Details'][0];
          return {
            id: userDetail.id,
            Username: userDetail.Username,
            Email: userDetail.Email,
            password: '', // Password should not be returned by the API for security reasons
          } as User;
        } else {
          throw new Error('User details not found');
        }
      })
    );
  }

  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user, { headers });
  }
}
