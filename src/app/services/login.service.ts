import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  public user: string = '';
  public role: string = '';
  url = 'http://localhost:8000/user/';

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  setUser(user: string) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  // setAdmin() {
  //   this.role = 'admin';
  // }
  getRole() {
    return this.role;
  }
  // setContractor(){
  //   this.role = 'contractor';
  // }
  setRole(s: string){
    this.role = s;
  }
}
