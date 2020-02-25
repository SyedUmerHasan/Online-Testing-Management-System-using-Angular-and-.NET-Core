import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { User } from './../../_model/User';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public  isAdminSubject: BehaviorSubject<string>;
  public isAdmin = true;
  public isUserAdmin: Observable<string>;
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    if (localStorage.getItem('role') == null) {
      this.logout();
    }
    if (localStorage.getItem('currentUser')) {
      const decodedToken = this.helper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).jwttoken);
    }
    console.log('localStorage.getItem(\'role\')', localStorage.getItem('role'));
    try {
      console.log('JSON.parse(localStorage.getItem(\'role\'))', JSON.parse(JSON.stringify(localStorage.getItem('role'))));
    } catch (e) {
        alert(e); // error in the above string (in this case, yes)!
    }
    this.isAdminSubject = new BehaviorSubject<string>( JSON.parse(JSON.stringify(localStorage.getItem('role'))) );
    this.isUserAdmin = this.isAdminSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  public get currentUserRole(): string {
    return this.isAdminSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + `user/login`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                console.log(user.data);
                const decodedToken = this.helper.decodeToken(user.data.jwttoken);
                if (decodedToken.role === 'SuperAdmin') {
                  localStorage.setItem('role', 'SuperAdmin');
                  this.isAdminSubject.next('SuperAdmin');
                } else if (decodedToken.role === 'candidate') {
                  localStorage.setItem('role', 'candidate');
                  this.isAdminSubject.next('candidate');
                } else {
                  this.isAdminSubject.next('user');
                  localStorage.setItem('role', 'user');
                }
                this.currentUserSubject.next(user.data);
            }
          return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('admin');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
  }

}

