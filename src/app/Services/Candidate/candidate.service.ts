import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  createCandidate(FirstName, LastName, email, CurrentCompany, CategoryId, ExperienceLevelId) {
    return this.http.post<any>(environment.apiUrl + `candidate/create`,
      {FirstName,
        LastName,
        email,
        CurrentCompany,
        CategoryId,
        ExperienceLevelId})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  getallCandidate() {
    return this.http.get<any>(environment.apiUrl + `candidate/getall`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  createtest(CandidateId, numberOfQuestion, time) {
    return this.http.post<any>(environment.apiUrl +
       `candidate/generatetest?candidateId=${CandidateId}&numberOfQuestion=${numberOfQuestion}&time=${time}` , {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  deletecandidate(candidateId) {
    return this.http.delete<any>(environment.apiUrl +
      `candidate/delete?id=${candidateId}` , {})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }

  updateCandidate(candidateId,FirstName, LastName, email, CurrentCompany, CategoryId, ExperienceLevelId) {
    return this.http.put<any>(environment.apiUrl + `candidate/update?id=${candidateId}` ,
     {FirstName, LastName, email, CurrentCompany, CategoryId, ExperienceLevelId})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }



  getCandidateById(candidateId) {
    return this.http.get<any>(environment.apiUrl + `candidate/getbyid?id=${candidateId}` , {})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }

}
