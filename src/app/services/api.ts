import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
interface LoginResponse {
  token: string;
  user: {
    email: string;
    id: number;
  };
}
export interface User {
  email: string;
  id: number;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:9000/api';
  private http = inject(HttpClient);
  constructor() {
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  loginAuth(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email: email, password: password });
    return this.http.post<LoginResponse>(`${this.apiUrl}/user/login`, body, { headers }).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.saveUser(response.user);
      })
    );
  }
  private saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private saveUser(user: User): void {
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  clearAuthData(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  getUser(): User | null {
    if (typeof window !== 'undefined' && localStorage) {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  markAttendance(): Observable<any> {
    const user = this.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.post<any>(`${this.apiUrl}/attendance`, { user_id: user.id }, { headers });
  }

  getAttendances(): Observable<any[]> {
    const user = this.getUser();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.get<any[]>(`${this.apiUrl}/attendance/${user?.id}`, { headers });
  }
}
