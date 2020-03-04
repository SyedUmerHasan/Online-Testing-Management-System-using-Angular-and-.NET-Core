import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { CategoryService } from './../../../Services/Category/category.service';
import { ExperienceLevelService } from './../../../Services/ExperienceLevel/experience-level.service';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']
})
export class EditQuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  questionId = null;
  currentQuestion = null;
  role = null;
  formError = false;
  constructor(private formBuilder: FormBuilder,
              private questionsService: QuestionsService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private routes: Router,
              private authenticationService: AuthenticationService,
              private experienceLevelService: ExperienceLevelService) {}
  categoryList = [];
  ExperienceLevelList = [];

  ngOnInit() {
    this.questionsForm = this.formBuilder.group({
      Description: ['', Validators.required],
      option : new FormArray([]),
      CategoryId: ['', Validators.required],
      ExperienceLevelId: ['', Validators.required],
    });

    this.route.paramMap
    .subscribe(params => {
      console.log('TCL: EditQuestionsComponent -> ngOnInit -> params', params);

      // tslint:disable-next-line: no-string-literal
      this.questionId = params['params']['id'];

      this.categoryService.getallCategory()
              .pipe(first())
              .subscribe(
                data => {
                  this.categoryList =  data.data.categories;
                },
                error => {
                  this.categoryList = [];
                });
      this.experienceLevelService.getallExperienceLevels()
              .pipe(first())
              .subscribe(
                data => {
                  this.ExperienceLevelList =  data.data.experiences;
                },
                error => {
                  this.ExperienceLevelList = [];
                });
      if (this.authenticationService.currentUserRole === 'contributor') {
        this.role = 'contributor';
        this.questionsService.getQuestionsByRole(this.questionId)
        .pipe(first())
        .subscribe(
          data => {
            this.currentQuestion = data.data.question;
            if(this.currentQuestion == null){
              this.routes.navigate(['login']);
            }
            this.updateRecords(
              this.currentQuestion
            );
            console.log('TCL: EditQuestionsComponent -> ngOnInit -> this.currentQuestion', this.currentQuestion);
          },
          error => {
          });

        } else {
        this.role = 'admin';
        this.questionsService.getQuestionsById(this.questionId)
        .pipe(first())
        .subscribe(
          data => {
            this.currentQuestion = data.data.question;
            if(this.currentQuestion == null){
              this.routes.navigate(['login']);
            }
            this.updateRecords(
              this.currentQuestion
            );
            console.log('TCL: EditQuestionsComponent -> ngOnInit -> this.currentQuestion', this.currentQuestion);
          },
          error => {
          });

      }
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.questionsForm.controls; }
  get t() { return this.f.option as FormArray; }



  updateRecords(currentQuestions) {
    this.questionsForm.patchValue({
      Description: currentQuestions.question,
      CategoryId: currentQuestions.categoryId,
      ExperienceLevelId: currentQuestions.experienceLevelId
    });
    this.PatchOptionsValue(currentQuestions.option);
  }



  onSubmit() {


    this.submitted = true;
    if (this.questionsForm.invalid ) {
      this.formError = true;
      return;
    }

      // Description, Marks, CategoryId, ExperienceLevelId
    const question  =  {
        Description : this.f.Description.value,
        Marks : '1',
        Type: 'ASP.NET',
        Time: '5-2-2020',
        CategoryId : this.f.CategoryId.value,
        ExperienceLevelId : this.f.ExperienceLevelId.value,
      };

    this.questionsService.updateQuestions(this.questionId, question, this.f.option.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Questions has been added successfully';
              this.showErrorStatus =  false;
            } else {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Questions has not been added, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Questions has not been added, can be seen in browser console';
              console.log('Error in creating : ', error);
          });
  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }
  PatchOptionsValue(options) {
    const numberOfOptions = options.length || 1;
    if (this.t.length < numberOfOptions) {
        for (let i = this.t.length; i < numberOfOptions; i++) {

            this.t.push(this.formBuilder.group({
              IsCorrect: [options[i].correctOption],
              OptionDescription: [options[i].option, [Validators.required]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfOptions; i--) {
            this.t.removeAt(i);
        }
    }
}

}
