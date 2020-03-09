import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createCategory(Name) {
    return this.http.post<any>(environment.apiUrl + `category/create`, { Name })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  getallCategory() {
    return this.http.get<any>(environment.apiUrl + `category/getall`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  deletecategory(categoryId) {
    return this.http.delete<any>(environment.apiUrl +
      `category/delete?id=${categoryId}` , {})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
            //  console.log('i am the respoone ' , user);
           }
         return user;
       }));
  }

  updateCategory(candidateId, Name) {
    return this.http.put<any>(environment.apiUrl + `category/update?id=${candidateId}` , {Name})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }

  getCategoryById(categoryId) {
    return this.http.get<any>(environment.apiUrl + `category/getbyid?id=${categoryId}` , {})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }
}
