import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly API_URL = 'http://localhost:3000/api/login';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(ruc: string, password: string): Observable<any> {

    return this.http.post(this.API_URL, {
      username: ruc,
      password: password
    })
    .pipe(
      tap((response: any) => {
        if (response?.access_token) {
          localStorage.setItem('token', response.access_token); // <--- OK
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError((err) => {
        return throwError(() => ({
          error: {
            message: err?.error?.error_description || 'Error en la autenticación'
          }
        }));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
