import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Description, Marks, CategoryId, ExperienceLevelId
  listcategory() {
    return this.http.get<any>(environment.apiUrl + `category/getall`, { })
        .pipe(map(user => {
          console.log(user);
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  listRole() {
    return this.http.get<any>(environment.apiUrl + `user/role`, { })
        .pipe(map(user => {
          console.log(user);
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

}
