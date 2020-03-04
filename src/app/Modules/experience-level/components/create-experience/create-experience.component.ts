import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-experience',
  templateUrl: './create-experience.component.html',
  styleUrls: ['./create-experience.component.css']
})
export class CreateExperienceComponent implements OnInit {

  experiencelevelForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  formError = false;

  constructor(private formBuilder: FormBuilder, private experiencelevelService: ExperienceLevelService) {}
  // Name, MinExp, MaxExp
  ngOnInit() {
    this.experiencelevelForm = this.formBuilder.group({
      Name: ['', Validators.required],
      MinExp: ['', Validators.required],
      MaxExp: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.experiencelevelForm.controls; }

  onSubmit() {

    this.submitted = true;

    console.log('CreateExperienceComponent -> onSubmit -> this.submitted', this.submitted);
    console.log('CreateExperienceComponent -> onSubmit -> f.MaxExp.errors', this.f.MaxExp.errors);

    // stop here if form is invalid
    if (this.experiencelevelForm.invalid) {
      this.formError = true;
      return;
    }
    this.experiencelevelService.createExperienceLevel(
        this.experiencelevelForm.value.Name,
        this.experiencelevelForm.value.MinExp,
        this.experiencelevelForm.value.MaxExp )
        .pipe(first())
        .subscribe(
          data => {
            console.log('data', data);
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Category has been added successfully';
            this.showErrorStatus =  false;
            this.submitted = false;
            this.experiencelevelForm.reset();
          },
          error => {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Category has not been added, can be seen in browser console';
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
