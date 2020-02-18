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
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private  isAdminSubject: BehaviorSubject<boolean>;
  public isAdmin = true;
  public isUserAdmin: Observable<boolean>;
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    if (localStorage.getItem('role') == null) {
      this.logout();
    }
    if(localStorage.getItem('currentUser'))
    {
      const decodedToken = this.helper.decodeToken(JSON.parse(localStorage.getItem('currentUser'))["jwtToken"]);
      console.log(decodedToken);
    }

    this.isAdminSubject = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('role')));
    this.isUserAdmin = this.isAdminSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  public get currentUserRole(): boolean {
    return this.isAdminSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + `user/login`, { username, password })
        .pipe(map(user => {
          console.log(user);
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                const decodedToken = this.helper.decodeToken(user.data.jwtToken);
                if (decodedToken.role === 'SuperAdmin') {
                  localStorage.setItem('role', 'true');
                  this.isAdminSubject.next(true);
                } else {
                  this.isAdminSubject.next(false);
                  localStorage.setItem('role', 'false');
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
    this.currentUserSubject.next(null);
  }

}

