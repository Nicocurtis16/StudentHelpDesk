// faq.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FAQ } from './faq.model';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  private apiUrl =
    'http://godinberto.pythonanywhere.com/api/getAllFaqQuestions';

  constructor(private http: HttpClient) {}

  getFAQs(): Observable<FAQ[]> {
    return this.http.get<FAQ[]>(this.apiUrl);
  }

  addFAQ(faq: FAQ): Observable<FAQ> {
    return this.http.post<FAQ>(this.apiUrl, faq);
  }

  updateFAQ(faq: FAQ): Observable<FAQ> {
    return this.http.put<FAQ>(`${this.apiUrl}/${faq.id}`, faq);
  }

  deleteFAQ(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
