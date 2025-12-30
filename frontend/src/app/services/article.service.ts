import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles`);
  }

  getArticle(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/${id}`);
  }

  createArticle(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/articles`, formData);
  }

  updateArticle(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/articles/${id}`, formData);
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/articles/${id}`);
  }

  publishArticle(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/articles/${id}/publish`, {});
  }

  unpublishArticle(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/articles/${id}/unpublish`, {});
  }
}
