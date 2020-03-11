import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
  AllQuestionForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  formError = false;
  options = 0;
  viewQuestions = [];


  constructor(private formBuilder: FormBuilder,
              private questionsService: QuestionsService,
              private spinner : NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.AllQuestionForm = this.formBuilder.group({
      Description: ['', Validators.required],
      correctoption : new FormArray([]),
      alloption : new FormArray([])
    });
    this.questionsService.getAllResultQuestions(78)
    .pipe(first())
    .subscribe(
      data => {
        this.spinner.hide();
        this.viewQuestions = data.data.result;
        console.log("ViewQuestionComponent -> ngOnInit -> this.viewQuestions", this.viewQuestions)
      },
      error => {
        this.spinner.hide();
      console.log("ViewQuestionComponent -> ngOnInit -> error", error)
      this.viewQuestions = [];
      });

  }

  // convenience getter for easy access to form fields
  get f() { return this.AllQuestionForm.controls; }
  get t() { return this.f.correctoption as FormArray; }
  get u() { return this.f.alloption as FormArray; }


}
