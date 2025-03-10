import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Auth } from '../../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private autheSubject: BehaviorSubject<Auth[]> = new BehaviorSubject<Auth[]>([]);
  public authes$ = this.autheSubject.asObservable();

  constructor(private http: HttpClient) { }

  registerAuth(authData: Auth){
    console.log("service register......");
     this.http.post<{ message: string, userId: string, token: string}>(`${this.apiUrl}/register`, authData)
      .pipe(
        tap(response => {
          // שמירה של ה-Token, ה-userId וה-role ב-session storage לאחר רישום מוצלח
          sessionStorage.setItem('authToken', response.token);
          sessionStorage.setItem('userId', response.userId);

          const currentUsers = this.autheSubject.value;
          this.autheSubject.next([...currentUsers, authData]);
        }),
        catchError(this.handleError)
      ).subscribe(r=>console.log(r));;
  }
  loginAuth(authData: Partial<Auth>): Observable<any> {
    return this.http.post<{ token: string, userId: string, role: string }>(`${this.apiUrl}/login`, authData)
      .pipe(
        tap(response => {
          sessionStorage.setItem('authToken', response.token);
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem('role', response.role);
        }),
        catchError(error => {
          alert(error.error.message); // הצגת הודעת השגיאה
          return throwError(() => new Error('Something went wrong.'));
        }),
      );
  }
  

  // פונקציה לקבלת ה-Token
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  // פונקציה לקבלת ה-userId
  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  // פונקציה לקבלת ה-role
  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  // פונקציה למחיקת ה-Token, ה-userId וה-role
  logout(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
  }

  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong.'));
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
// import { Auth } from '../../models/auth.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api/auth';
//   private autheSubject: BehaviorSubject<Auth[]> = new BehaviorSubject<Auth[]>([]);
//   public authes$ = this.autheSubject.asObservable();

//   constructor(private http: HttpClient) { }

//   registerAuth(authData: Auth) {
//     console.log("service register......");
//     this.http.post<{ message: string, userId: string }>(`${this.apiUrl}/register`, authData)
//       .pipe(
//         tap(() => {
//           const currentUsers = this.autheSubject.value;
//           this.autheSubject.next([...currentUsers, authData])
//         })).subscribe(()=> console.log(this.autheSubject.getValue()));
//   }

//   loginAuth(authData: Partial<Auth>) {
//     this.http.post<any>(`${this.apiUrl}/login`, authData)
//       .pipe(
//         catchError(this.handleError),
//       )
//   }

//   private handleError(error: any) {
//     console.error('Error occurred:', error);
//     return throwError(() => new Error('Something went wrong.'));
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, catchError } from 'rxjs';
// import { Auth } from '../../models/auth.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api/auth';
//   private autheSubject:BehaviorSubject<Auth[]> = new BehaviorSubject<Auth[]>([]);
//   public authes$ = this.autheSubject.asObservable();

//   constructor(private http: HttpClient) { }

//   registerAuth(authData: Auth) {
//     console.log("service register......");
//     return this.http.post<{ message: string, userId: string }>(`${this.apiUrl}/register`, authData)
//   }
//   // התחברות משתמש קיים
//   loginAuth(authData: Partial<Auth>) {
//     console.log("service login......");
//     this.http.post<any>(`${this.apiUrl}/login`, authData)
//   }
// }
