import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './../../../../Services/Authentication/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { stringify } from 'querystring';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  Directive,
  HostBinding,
  HostListener } from '@angular/core';
@Component({
  selector: 'app-test-screen',
  templateUrl: './test-screen.component.html',
  styleUrls: ['./test-screen.component.css']
})
export class TestScreenComponent implements OnInit {
  helper = new JwtHelperService();
  QuestionDescription = '';
  questionsAnswerForm: FormGroup;
  questionList = [];
  questionIteration = 0;
  isLoading = true;
  options = [];
  questionCount = 0;
  buttonText = 'Next Question';
  admin = false;
  subscription: Subscription;
  browserRefresh = false;
  timeLeft= 0;
  interval = null;
  minutes = 0
  seconds = 0
   // getting data from API
  constructor(private authenticationService: AuthenticationService,
              private questionsService: QuestionsService,
              private router: Router,
              private formBuilder: FormBuilder) {

    const decodedToken = this.helper.decodeToken(JSON.parse(JSON.stringify(this.authenticationService.currentUserValue)));
    this.questionsService.startTest(decodedToken.candidateid, decodedToken.number)
    .pipe(first())
        .subscribe(
          data => {
            this.updateQuestionList(data.data.questions);
            this.timeLeft =this.questionList[this.questionIteration].time * 60;
            this.updateQuestion();
            this.updateOptionList();
            this.changeButtonText();
            this.isLoading = false;
          },
          error => {
              console.log('Error in creating : ', error);
          });
   }
   // Initialization of Form builder
   ngOnInit() {
      this.questionsAnswerForm = this.formBuilder.group({
        option : new FormArray([])
      });
      this.startTimer();

   }
  //  @HostListener('window:beforeunload',  ['$event'])
  //   beforeUnload(e): string {
  //     const dialogText = 'Dialog text here';
  //     e.returnValue = dialogText;
  //     return dialogText;
  //   }
  //   @HostListener('window:unload',  ['$event'])
  //   onunload(e) {
  //     this.submitTest();
  //     this.authenticationService.logout();
  //     return 'Logout';
  //   }

  //   @HostListener('window:blur',  ['$event'])
  //   onblur(e) {
  //     let txt = '';
  //     let r = confirm('Alert your test is going to be cancelled in 5 seconds');
  //     if (r === true) {
  //       this.submitTest();
  //       this.authenticationService.logout();
  //       this.router.navigate(['/']);
  //       txt = 'You pressed OK!';
  //     } else {
  //       txt = 'You pressed Cancel!';
  //     }
  //     // this.authenticationService.logout();
  //     return 'Logout';
  //   }
   // Loading Module
   getLoading() {
      return this.isLoading;
   }
   // Updating the question
   updateQuestion() {
      this.timeLeft =this.questionList[this.questionIteration].time * 60;
      this.setQuestion(this.questionList[this.questionIteration].question);
   }
  // Updating the question
   updateQuestionList(questionList) {
    this.questionList = JSON.parse(JSON.stringify(questionList));
   }
   // Updating the question
   updateOptionList() {
     this.options = JSON.parse(JSON.stringify(this.questionList[this.questionIteration].option));
     this.options = this.options.map((val) => {
       val.selected = false;
       return val;
     });
   }
   // Increasing question value
   increaseIteration() {
      this.questionIteration++;
      this.setcount(this.questionIteration);
   }
   setQuestion(question) {
    this.QuestionDescription = question;
   }
   getQuestion() {
    return this.QuestionDescription;
   }
   getCurrentQuestionId() {
    return this.questionList[this.questionIteration].questionId;
   }
   setcount(count) {
     this.questionCount = count;
   }
   // get form data
   get f() { return this.questionsAnswerForm.controls; }
   get t() { return this.f.option as FormArray; }

   changeButtonText() {
     if (this.questionCount + 1 >= this.questionList.length ) {
      this.buttonText = 'Finish';
     }
   }

   onSubmit() {
    const decodedToken = this.helper.decodeToken(JSON.parse(JSON.stringify(this.authenticationService.currentUserValue)));
    const SelectedOptionId = [];
    this.options.map((data) => {
      if (data.selected == true) {
        SelectedOptionId.push(data.optionId);
      }
      return data;
    });
    this.questionsService.submitQuestionAnswer(decodedToken.candidateid, this.getCurrentQuestionId(), SelectedOptionId.join())
    .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              if (this.questionCount + 1 >= this.questionList.length ) {
                this.submitTest();
              } else {
                this.increaseIteration();
                this.updateQuestion();
                this.updateOptionList();
                this.changeButtonText();
              }

            }
          },
          error => {
              console.log('Error in creating : ', error);
          });
   }
   onSkip() {
    const decodedToken = this.helper.decodeToken(JSON.parse(JSON.stringify(this.authenticationService.currentUserValue)));
    this.questionsService.submitQuestionAnswer(decodedToken.candidateid, this.getCurrentQuestionId(), '')
    .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              if (this.questionCount + 1 >= this.questionList.length ) {
                this.submitTest();
              } else {
                this.increaseIteration();
                this.updateQuestion();
                this.updateOptionList();
                this.changeButtonText();
              }

            }
          },
          error => {
              console.log('Error in creating : ', error);
          });
   }

   submitTest() {
    const decodedToken = this.helper.decodeToken(JSON.parse(JSON.stringify(this.authenticationService.currentUserValue)));
    this.questionsService.submitTest(decodedToken.candidateid)
    .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              localStorage.setItem('flag', 'true');
              this.authenticationService.logout();
              this.router.navigate(['/thankyou']);
            }
          },
          error => {
              console.log('Error in creating : ', error);
          });
   }
   startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.minutes = Math.floor( this.timeLeft / 60);
        this.seconds = this.timeLeft % 60;
      } else {
        if (this.questionCount + 1 >= this.questionList.length ) {
          this.onSkip();
        } else {
          this.onSubmit();
        }
        this.timeLeft = this.questionList[this.questionIteration].time * 60;
      }
    },1000)
  }

}
