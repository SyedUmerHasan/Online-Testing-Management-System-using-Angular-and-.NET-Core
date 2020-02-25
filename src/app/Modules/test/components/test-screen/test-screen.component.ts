import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './../../../../Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { stringify } from 'querystring';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

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
      console.log('ngOnInit() called');
      var unloadEvent = function (e) {
        var confirmationMessage = "BVhai mat ja please?";

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
    };
      window.addEventListener("beforeunload", unloadEvent);
      this.questionsAnswerForm = this.formBuilder.group({
        option : new FormArray([])
      });

   }

   // Loading Module
   getLoading() {
      return this.isLoading;
   }
   // Updating the question
   updateQuestion() {
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
              console.log('i am the respoone ' , data);
              if (this.questionCount + 1 >= this.questionList.length ) {
                this.submitTest();
              } else {
                this.increaseIteration();
                this.updateQuestion();
                this.updateOptionList();
                this.changeButtonText();
                console.log('TCL: TestScreenComponent -> onSubmit -> this.questionList.length', this.questionList.length);
                console.log('TCL: TestScreenComponent -> onSubmit -> this.questionCount', this.questionCount);

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
              console.log('i am the respoone ' , data);
              if (this.questionCount + 1 >= this.questionList.length ) {
                this.submitTest();
              } else {
                this.increaseIteration();
                this.updateQuestion();
                this.updateOptionList();
                this.changeButtonText();
                console.log('TCL: TestScreenComponent -> onSubmit -> this.questionList.length', this.questionList.length);
                console.log('TCL: TestScreenComponent -> onSubmit -> this.questionCount', this.questionCount);

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

              this.router.navigate(['/']);
            }
          },
          error => {
              console.log('Error in creating : ', error);
          });
   }

}
