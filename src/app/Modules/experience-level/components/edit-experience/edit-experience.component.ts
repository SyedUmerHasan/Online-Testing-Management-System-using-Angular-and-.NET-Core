import { ExperienceLevelModule } from './../../experience-level.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  expId = null;
  currentExpLevel = null;
  formError = false;
  experiencelevelForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private experiencelevelService: ExperienceLevelService,
              private routes: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.experiencelevelForm = this.formBuilder.group({
      Name: ['', Validators.required],
      MinExp: ['', Validators.required],
      MaxExp: ['', Validators.required]
    });

    this.route.paramMap
    .subscribe(params => {

      // tslint:disable-next-line: no-string-literal
      this.expId = params['params']['id'];

      this.experiencelevelService.getExperienceLevelById(this.expId)
      .pipe(first())
          .subscribe(
            data => {
              this.currentExpLevel = data.data.experience;
              console.log("EditExperienceComponent -> ngOnInit -> this.currentExpLevel", this.currentExpLevel)
              if (this.currentExpLevel == null){
                this.routes.navigate(['login']);
              }
              console.log('TCL: EditCandidateComponent -> ngOnInit -> this.currentCandidate', this.currentExpLevel);
              this.updateRecords(this.currentExpLevel.name, this.currentExpLevel.MinExp, this.currentExpLevel.MaxExp);
            },
            error => {
              
      });

    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.experiencelevelForm.controls; }


  updateRecords(Expname, min, max) {
    this.experiencelevelForm.patchValue({
      Name: Expname,
      MinExp: min,
      MaxExp: max
    });

    this.experiencelevelForm = this.formBuilder.group({
      Name: ['', Validators.required],
      MinExp: ['', Validators.required],
      MaxExp: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.experiencelevelForm.invalid) {
      this.formError = true;
      return;
    }

    this.experiencelevelService.updateExperienceLevel(this.expId,
      this.experiencelevelForm.value.Name,
      this.experiencelevelForm.value.MinExp,
      this.experiencelevelForm.value.MaxExp)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Category has been added successfully';
            this.showErrorStatus =  false;
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
