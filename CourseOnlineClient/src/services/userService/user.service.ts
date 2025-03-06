import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// הmap מיותר
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken'); // קבלת ה-token מה-session storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // פונקציה לקבלת פרטי משתמש לפי ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  // פונקציה לעדכון פרטי משתמש
  updateUser(id: string, userData: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData, { headers: this.getHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  // פונקציה למחיקת משתמש
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  // פונקציה לטיפול בשגיאות
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong.'));
  }
}
