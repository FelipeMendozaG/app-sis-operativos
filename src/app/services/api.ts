import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
interface LoginResponse {
  token: string;
  user: {
    email: string;
    id: number;
    role: any;
  };
}
export interface User {
  email: string;
  id: number;
  role: any;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.API_URL;
  private http = inject(HttpClient);
  constructor() {
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`,
      { 
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` })
      });
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
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  hasPermission(permission: string): boolean {
    const user = this.getUser();
    if(user){
      if (!user || !user.role || !user.role.permissions) return false;
      return user.role.permissions.includes(permission);
    }
    return false;
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

  createWorker(name: string, lastname:string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' });
    const body = JSON.stringify({ first_name:name, last_name:lastname, email, password, roleId:1 });
    return this.http.post<any>(`${this.apiUrl}/user`, body, { headers });
  }

  DeleteUser(id:number):Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/user/delete/${id}`, null, {headers});
  }
  GetAttendanceUserReport():Observable<any[]>{
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' });
    return this.http.get<any[]>(`${this.apiUrl}/user/get/attendances`, {headers})
  }
  SendAlertUser(id:number, status:string):Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' });
    const body = JSON.stringify({id, status})
    return this.http.post<any>(`${this.apiUrl}/user/send_alert`, body, {headers})
  }
  GetAttendanceAll(date_start:string, date_end:string){
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' });
    const body = JSON.stringify({date_start, date_end})
    return this.http.post<any[]>(`${this.apiUrl}/attendances/all`, body,{ headers });
  }
  GetAttendanceExport(date_start:string, date_end:string){
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json'});
    const body = JSON.stringify({date_start, date_end})
    return this.http.post(`${this.apiUrl}/attendances/export`, body, { headers, responseType: 'blob', observe: 'response' });
  }
  GetNotifications():Observable<any[]>{
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json'});
    return this.http.get<any[]>(`${this.apiUrl}/notifications`,{headers});
  }
  markNotificationAsRead(notiId:number):Observable<any> {
    const user = this.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return this.http.post<any>(`${this.apiUrl}/notifications`, { user_id: user.id, notification_id:notiId }, { headers });
  }
  GetUnReadNotifications():Observable<any[]>{
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json'});
    return this.http.get<any[]>(`${this.apiUrl}/notifications/unread`,{headers});
  }
  GetUserUpdate(id:number):Observable<any>{
    /* const body = JSON.stringify({ first_name:name, last_name:lastname, email, password, roleId:1 }); */
    return this.http.get<any>(`${this.apiUrl}/user/${id}`,
      { 
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`,'Content-Type': 'application/json' })
      });
  }
  UpdateUser(id:number, name:string, lastname:string, email:string, password:string){
    const body = JSON.stringify({ first_name:name, last_name:lastname, email, password, roleId:1 });
    return this.http.put<any>(`${this.apiUrl}/user/${id}`,body,
      { 
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json' })
      });
  }
  GetReportGrafic(date_start:string, date_end:string){
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}`, 'Content-Type': 'application/json'});
    const body = JSON.stringify({date_start, date_end})
    return this.http.post(`${this.apiUrl}/reports`,body,{headers});
  }
}
