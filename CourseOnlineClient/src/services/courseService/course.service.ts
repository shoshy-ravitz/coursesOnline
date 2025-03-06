import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken'); // קבלת ה-token מה-session storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // פונקציה לקבלת כל הקורסים
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
      // .pipe(
       
      //   catchError(this.handleError)
      // );
  }

  // פונקציה לקבלת פרטי קורס לפי ID
  getCourseById(id: number): Observable<any> {
    console.log("get course by id service.......");
    
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      // .pipe(
     
      //   catchError(this.handleError)
      // );
  }

  // פונקציה ליצירת קורס חדש
  createCourse( title: string, description: string ): Observable<any> {
    const course={title:title,description:description,teacherId:sessionStorage.getItem('userId')}
    return this.http.post(this.apiUrl, course, { headers: this.getHeaders() })
      // .pipe(
        
      //   catchError(this.handleError)
      // );
  }

  // פונקציה לעדכון קורס
  updateCourse(id: number,  title: string, description: string ): Observable<any> {
   const courseData={title:title,description:description,teacherId:sessionStorage.getItem('userId')}
    return this.http.put(`${this.apiUrl}/${id}`, courseData, { headers: this.getHeaders() })
      // .pipe(
       
      //   catchError(this.handleError)
      // );
  }

  // פונקציה למחיקת קורס
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      // .pipe(
      
      //   catchError(this.handleError)
      // );
  }

  // פונקציה להוספת תלמיד לקורס
  enrollStudent(courseId: number): Observable<any> {
    const userId = sessionStorage.getItem('authToken'); // קבלת ה-token מה-session storage
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers: this.getHeaders() })
      // .pipe(
      
      //   catchError(this.handleError)
      // );
  }


  // פונקציה לטיפול בשגיאות
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong.'));
  }
}
