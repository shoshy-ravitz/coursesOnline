import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  // פונקציה לקבלת שיעורים לפי מזהה קורס
  getLessons(courseId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // שליפת ה-Token
    console.log(token);
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers });
  }

  // פונקציה לקבלת פרטי שיעור לפי מזהה
  getLessonById(courseId: number, lessonId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // שליפת ה-Token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  // פונקציה ליצירת שיעור חדש
  createLesson(courseId: number, lesson: any): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // שליפת ה-Token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lesson, { headers });
  }

  // פונקציה לעדכון שיעור
  updateLesson(courseId: number, lessonId: number, lesson: any): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // שליפת ה-Token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers });
  }

  // פונקציה למחיקת שיעור
  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // שליפת ה-Token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }
}
