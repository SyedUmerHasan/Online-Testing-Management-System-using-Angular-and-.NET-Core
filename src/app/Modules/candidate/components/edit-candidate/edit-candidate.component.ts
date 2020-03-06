import { ActivatedRoute } from '@angular/router';
import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { CategoryService } from './../../../../Services/Category/category.service';
import { CandidateService } from './../../../../Services/Candidate/candidate.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import 'src/assets/scripts/main.js';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {

  candidateForm: FormGroup;
  showSuccessStatus =  false;
  showErrorStatus = false;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  categoryList = [];
  ExperienceLevelList = [];
  candidateId = 0;
  currentCandidate = null;
  formError =false;

  constructor(private formBuilder: FormBuilder,
              private candidateService: CandidateService,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private experienceLevelService: ExperienceLevelService ) {}

  ngOnInit() {



    this.route.paramMap
    .subscribe(params => {

      // tslint:disable-next-line: no-string-literal
      this.candidateId = params['params']['id'];

      this.candidateForm = new FormGroup({
        FirstName: new FormControl('', [Validators.required]),
        LastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        CurrentCompany: new FormControl('', [Validators.required]),
        CategoryId: new FormControl('', [Validators.required]),
        ExperienceLevelId: new FormControl('', [Validators.required]),
      });
      this.categoryService.getallCategory()
          .pipe(first())
          .subscribe(
            data => {
              this.categoryList =  data.data.categories;
              console.log('TCL: EditCandidateComponent -> ngOnInit -> categoryList', this.categoryList);
            },
            error => {
              this.categoryList = [];
            });
      this.experienceLevelService.getallExperienceLevels()
          .pipe(first())
          .subscribe(
            data => {
              this.ExperienceLevelList =  data.data.experiences;
              console.log('TCL: EditCandidateComponent -> ngOnInit -> this.ExperienceLevelList', this.ExperienceLevelList);
            },
            error => {
              this.ExperienceLevelList = [];
            });

      this.candidateService.getCandidateById(this.candidateId)
      .pipe(first())
          .subscribe(
            data => {
              this.currentCandidate = data.data.candidate;
              console.log('TCL: EditCandidateComponent -> ngOnInit -> this.currentCandidate', this.currentCandidate);
              this.updateRecords(this.currentCandidate.firstName,
                this.currentCandidate.lastName,
                this.currentCandidate.email,
                this.currentCandidate.currentCompany,
                this.currentCandidate.categoryId,
                this.currentCandidate.experienceLevelId
                );
            },
            error => {
            });

    });


  }


  updateRecords(firstName, lastName, emailAddress, currentCompany, categoryId, expId) {
    this.candidateForm.patchValue({
      FirstName: firstName,
      LastName: lastName,
      email: emailAddress,
      CurrentCompany: currentCompany,
      CategoryId: categoryId,
      ExperienceLevelId: expId,
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.candidateForm.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
    if (this.candidateForm.invalid) {
          this.formError = true;
          return;
        }
    this.candidateService.updateCandidate(
        this.candidateId,
        this.f.FirstName.value,
        this.f.LastName.value,
        this.f.email.value,
        this.f.CurrentCompany.value,
        this.f.CategoryId.value,
        this.f.ExperienceLevelId.value)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Candidate has been updated successfully';
            this.showErrorStatus =  false;
            this.submitted = false;
          },
          error => {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Candidate has not been Updated, can be seen in browser console';
              console.log('Error in Updating : ', error);
          });

  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }
  geterror(){
    return this.formError;
  }

}
