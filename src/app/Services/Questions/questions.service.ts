import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  // Description, Marks, CategoryId, ExperienceLevelId
  createQuestion(question, option) {
    return this.http.post<any>(environment.apiUrl + `question/create`, { question, option })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  getallQuestions() {
    return this.http.get<any>(environment.apiUrl + `question/getallques`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  getallQuestionsUsingContributor() {

    // http://localhost:55377/question/getquesbyrole
    return this.http.get<any>(environment.apiUrl + `question/getquesbyrole`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  // Description, Marks, CategoryId, ExperienceLevelId
  deleteQuestion(id) {
    return this.http.delete<any>(environment.apiUrl + `question/delete?id=${id}`, )
        .pipe(map(user => {
          console.log('Question Deleted' , user);
          return user;
        }));
  }
  startTest(candidateId: any, number: any) {
    return this.http.post<any>(environment.apiUrl + `question/getbyshuffle?candidateId=${candidateId}&number=${number}` , { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  submitQuestionAnswer(CandidateId, QuestionId, SelectedOptionId) {
    return this.http.post<any>(environment.apiUrl + `testdetail/create` , {CandidateId, QuestionId, SelectedOptionId})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  submitTest(CandidateId) {
    return this.http.post<any>(environment.apiUrl + `test/add?candidateId=${CandidateId}` , {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  updateQuestions(questionId, question, option) {
    return this.http.put<any>(environment.apiUrl + `question/update?id=${questionId}` , {question, option})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }



  getQuestionsById(questionId) {
    return this.http.get<any>(environment.apiUrl + `question/getquesbyid?id=${questionId}` , {})
       .pipe(map(user => {
       console.log('TCL: QuestionsService -> getQuestionsById -> user', user);
           // login successful if there's a jwt token in the response
       if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
       return user;
       }));
  }

  getQuestionsByRole(questionId) {
    return this.http.get<any>(environment.apiUrl + `question/getquestbyroleandid?id=${questionId}` , {})
       .pipe(map(user => {
       console.log('TCL: QuestionsService -> getQuestionsById -> user', user);
           // login successful if there's a jwt token in the response
       if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
       return user;
       }));
  }

}
