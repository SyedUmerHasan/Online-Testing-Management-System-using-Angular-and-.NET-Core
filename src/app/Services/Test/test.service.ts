import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTestResult() {
    return this.http.get<any>(environment.apiUrl + `test/getall`, { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  getTestResultByRole() {
    // http://localhost:55377/testresult/getall
    return this.http.get<any>(environment.apiUrl + `testresult/getall`, { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
}
