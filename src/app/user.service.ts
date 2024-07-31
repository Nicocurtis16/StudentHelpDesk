import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://godinberto.pythonanywhere.com/api/admin/getUser';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token || token.split('.').length !== 3) {
      console.error('Invalid token:', token);
      return throwError(new Error('Invalid token'));
    }
    console.log('Token being sent:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map((response) => {
        // Extract the first user detail from the 'User Details' array
        if (response['User Details'] && response['User Details'].length > 0) {
          return response['User Details'][0];
        } else {
          throw new Error('User details not found');
        }
      })
    );
  }
}
