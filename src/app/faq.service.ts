import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private baseUrl = 'http://godinberto.pythonanywhere.com/api';

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(`${this.baseUrl}/getAllFaqQuestions`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching FAQs:', error);
          return throwError(() => error);
        })
      );
  }

  addFaq(faq: any): Observable<any> {
    const url = `${this.baseUrl}/addFaqQuestions/Department`; // Ensure this URL is correct
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(url, faq, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding FAQ:', error);
        return throwError(() => error);
      })
    );
  }

  editFaq(faq: any): Observable<any> {
    const url = `${this.baseUrl}/updateFaqQuestion/${faq.QuestionID}`;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(url, faq, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating FAQ:', error);
        return throwError(() => error);
      })
    );
  }

  deleteFaq(faqId: number): Observable<any> {
    const url = `${this.baseUrl}/deleteFaqQuestion/${faqId}`;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error deleting FAQ:', error);
        return throwError(() => error);
      })
    );
  }
}
