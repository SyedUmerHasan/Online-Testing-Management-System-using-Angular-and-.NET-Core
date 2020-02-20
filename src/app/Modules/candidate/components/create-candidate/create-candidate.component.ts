import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { CategoryService } from './../../../../Services/Category/category.service';
import { CandidateService } from './../../../../Services/Candidate/candidate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import 'src/assets/scripts/main.js';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {
  candidateForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  categoryList = [];
  ExperienceLevelList = [];

  constructor(private formBuilder: FormBuilder,
              private candidateService: CandidateService,
              private categoryService: CategoryService,
              private experienceLevelService: ExperienceLevelService ) {}

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', Validators.required],
      CurrentCompany: ['', Validators.required],
      CategoryId: ['', Validators.required],
      ExperienceLevelId: ['', Validators.required],
    });

    this.categoryService.getallCategory()
        .pipe(first())
        .subscribe(
          data => {
            this.categoryList =  data.data.categories
            console.log(this.categoryList);
          },
          error => {
            this.categoryList = [];
          });
    this.experienceLevelService.getallExperienceLevels()
        .pipe(first())
        .subscribe(
          data => {
            this.ExperienceLevelList =  data.data.experiences;
            console.log(this.ExperienceLevelList);
          },
          error => {
            this.ExperienceLevelList = [];
          });
  }

  // convenience getter for easy access to form fields
  get f() { return this.candidateForm.controls; }

  onSubmit() {
      this.candidateService.createCandidate(
        this.f.FirstName.value,
        this.f.LastName.value,
        this.f.email.value,
        this.f.CurrentCompany.value,
        this.f.CategoryId.value,
        this.f.ExperienceLevelId.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log('data', data);
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Candidate has been added successfully';
            this.showErrorStatus =  false;
            this.candidateForm.reset();
          },
          error => {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Candidate has not been added, can be seen in browser console';
              console.log('Error in creating : ', error);
          });

  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }
}
