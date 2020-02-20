import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { ExperienceLevelService } from './../../../Services/ExperienceLevel/experience-level.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  constructor(private questionsService: QuestionsService) {}
  QuestionsList = [];

  ngOnInit() {
    this.questionsService.getallQuestions()
        .pipe(first())
        .subscribe(
          data => {
            this.QuestionsList =  data.data.questions;
            console.log(this.QuestionsList);
          },
          error => {
            this.QuestionsList = [];
          });
  }
  delete(questionId){
    console.log(questionId);
    this.questionsService.deleteQuestion(questionId);
  }

}
