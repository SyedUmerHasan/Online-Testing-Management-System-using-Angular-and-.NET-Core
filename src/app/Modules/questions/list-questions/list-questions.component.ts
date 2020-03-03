import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { ExperienceLevelService } from './../../../Services/ExperienceLevel/experience-level.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  QuestionsList = [];
  users$: any[] = [];

  constructor(private questionsService: QuestionsService) {}

  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();


  ngOnInit() {
    this.questionsService.getallQuestions()
        .pipe(first())
        .subscribe(
          data => {
            this.QuestionsList =  data.data.questions;
            this.users$ = data;
            this.dtTrigger.next();
          },
          error => {
            this.QuestionsList = [];
          });
  }
  delete(questionId) {
    this.questionsService.deleteQuestion(questionId)
        .pipe(first())
        .subscribe(
          data => {
            if (data.data.question === true) {
              console.log('Data Deleted');
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Questions has been deleted successfully';
              this.showErrorStatus =  false;

              this.QuestionsList = this.QuestionsList.filter((value) => {
                return value.questionId !== questionId;
              });
            } else {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Questions has not been deleted, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
            console.log(error);
          });
  }

}
