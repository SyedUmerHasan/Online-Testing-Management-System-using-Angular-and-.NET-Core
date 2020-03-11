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
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);

            }
          return user;
        }));
  }

  listRole() {
    return this.http.get<any>(environment.apiUrl + `user/rolelist`, { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  // http://localhost:55377/user/getemail
  listUserEmail() {
    return this.http.get<any>(environment.apiUrl + `user/getemail`, { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  getallUser() {
   
    return this.http.get<any>(environment.apiUrl + `user/getall`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
               console.log('I am respone ',user);

            }
          return user;
        }));
      }
  createRole(userName, email,password, categoryId, roleId) {
    return this.http.post<any>(environment.apiUrl + `user/register`, { userName, email,password, categoryId, roleId})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }



  updateUser(id,userName,email) {
    // http://localhost:55377/user/getbyid?id?id=24
    return this.http.put<any>(environment.apiUrl + `user/update?id=${id}`, { userName, email })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
               console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  
  getUserById(id) {
    // http://localhost:55377/user/getbyid?id=21
    return this.http.get<any>(environment.apiUrl + `user/getbyid?id=${id}`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
               console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  
  GetResetPasswordLink(email) {
    // http://localhost:55377/user/getbyid?id=21
    return this.http.post<any>(environment.apiUrl + `user/forgotpasswordadmin?email=${email}`, {})
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
