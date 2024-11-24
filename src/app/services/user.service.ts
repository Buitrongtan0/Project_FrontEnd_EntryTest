// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://dev.thabicare.zenix.com.vn/api/v1';
    private headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    constructor(private http: HttpClient) { }
    

    getLogin(body:any): Observable<any> {
        return this.http.post(`${this.apiUrl}/user-login/`,body);
    }
    getSignUpUsers(body:any): Observable<any> {
        return this.http.post(`${this.apiUrl}/create-user-account/`,body);
    }
    getCustomers(limit: number, offset: number): Observable<any> {
        const params = new HttpParams()
        .set('limit', limit.toString())
        .set('offset', offset.toString());
        return this.http.get(`${this.apiUrl}/customers/`, { headers: this.headers,params: params });
    }
    getCustomerss(): Observable<any> {
        // const params = new HttpParams()
        // .set('limit', limit.toString())
        // .set('offset', offset.toString());
        return this.http.get(`${this.apiUrl}/customers/`, { headers: this.headers });
    }
    createcustomers(body:any): Observable<any> {
        return this.http.post(`${this.apiUrl}/customers/`,body, { headers: this.headers });
    }
    getcustomer(id: number|undefined): Observable<any> {
        return this.http.get(`${this.apiUrl}/customers/${id}/`, { headers: this.headers });
    }
}
