import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
  }

  createCourse( title: string, description: string ): Observable<any> {
    const course={title:title,description:description,teacherId:sessionStorage.getItem('userId')}
    return this.http.post(this.apiUrl, course, { headers: this.getHeaders() })   
  }

  updateCourse(id: number,  title: string, description: string ): Observable<any> {
   const courseData={title:title,description:description,teacherId:sessionStorage.getItem('userId')}
    return this.http.put(`${this.apiUrl}/${id}`, courseData, { headers: this.getHeaders() })

  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
  }

  enrollStudent(courseId: number): Observable<any> {
    const userId = sessionStorage.getItem('authToken'); // קבלת ה-token מה-session storage
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers: this.getHeaders() })

  }



  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong.'));
  }
}
