import { ExperienceLevelService } from './../../../Services/ExperienceLevel/experience-level.service';
import { CategoryService } from './../../../Services/Category/category.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})

export class CreateQuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  formError = false;

  constructor(private formBuilder: FormBuilder,
              private questionsService: QuestionsService,
              private categoryService: CategoryService,
              private experienceLevelService: ExperienceLevelService) {}
  categoryList = [];
  ExperienceLevelList = [];

  ngOnInit() {
    this.questionsForm = this.formBuilder.group({
      Description: ['', Validators.required],
      Marks: ['', Validators.required],
      CategoryId: ['', Validators.required],
      ExperienceLevelId: ['', Validators.required],
      option : new FormArray([])
    });
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
  }
  // convenience getter for easy access to form fields
  get f() { return this.questionsForm.controls; }
  get t() { return this.f.option as FormArray; }

  onSubmit() {

    this.submitted = true;
    console.log('CreateQuestionsComponent -> onSubmit -> this.f', this.f);
    console.log("CreateQuestionsComponent -> onSubmit -> this.t", this.t);
    // stop here if form is invalid
    console.log("CreateQuestionsComponent -> onSubmit -> this.t[0].errors", this.t.controls[0])
    if (this.questionsForm.invalid ) {
      this.formError = true;
      return;
    }
      // Description, Marks, CategoryId, ExperienceLevelId
    const question  =  {
        Description : this.f.Description.value,
        Marks : this.f.Marks.value,
        Type: 'ASP.NET',
        Time: '5-2-2020',
        CategoryId : this.f.CategoryId.value,
        ExperienceLevelId : this.f.ExperienceLevelId.value,
      };

    this.questionsService.createQuestion(question, this.f.option.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Questions has been added successfully';
              this.showErrorStatus =  false;
              this.submitted = false;
              this.questionsForm.reset();
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
  onChangeOptions(e) {
    const numberOfOptions = e.target.value || 1;
    if (this.t.length < numberOfOptions) {
        for (let i = this.t.length; i < numberOfOptions; i++) {
            this.t.push(this.formBuilder.group({
              IsCorrect: [false],
              OptionDescription: ['', [Validators.required]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfOptions; i--) {
            this.t.removeAt(i);
        }
    }
  }

}
