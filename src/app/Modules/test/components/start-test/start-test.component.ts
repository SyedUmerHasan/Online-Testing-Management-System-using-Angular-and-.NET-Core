import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { CandidateService } from './../../../../Services/Candidate/candidate.service';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {
  startTestForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  helper = new JwtHelperService();
  formError = false;


  constructor(private formBuilder: FormBuilder,
              private candidateService: CandidateService,
              private authenticationService: AuthenticationService) {}
  candidateList = [];

  ngOnInit() {
    this.startTestForm = this.formBuilder.group({
      CandidateId: ['', Validators.required],
      numberOfQuestion: ['', Validators.required],
    });
    this.candidateService.getallCandidate()
        .pipe(first())
        .subscribe(
          data => {
            this.candidateList =  data.data.candidates;
          },
          error => {
            this.candidateList = [];
          });

  }
  // convenience getter for easy access to form fields
  get f() { return this.startTestForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.startTestForm.invalid) {
      this.formError = true;
      return;
    }
      // Description, Marks, CategoryId, ExperienceLevelId
    this.candidateService.createtest(this.startTestForm.value.CandidateId, this.startTestForm.value.numberOfQuestion)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Candidate Test has been added successfully';
              this.showErrorStatus =  false;
              this.startTestForm.reset();
              this.authenticationService.logout();
              localStorage.setItem('currentUser', JSON.stringify(data.data.jwttoken));
              const decodedToken = this.helper.decodeToken(data.data.jwttoken);
              if (decodedToken.role === 'SuperAdmin') {
                  localStorage.setItem('role', 'SuperAdmin');
                  this.authenticationService.isAdminSubject.next('SuperAdmin');
                } else if (decodedToken.role === 'candidate') {
                  localStorage.setItem('role', 'candidate');
                  localStorage.setItem('allow', 'true');
                  this.authenticationService.isAdminSubject.next('candidate');
                } else {
                  this.authenticationService.isAdminSubject.next('user');
                  localStorage.setItem('role', 'user');
                }
              this.authenticationService.currentUserSubject.next(data.data);
              window.location.reload();
            } else {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Candidate Test has not been added, can be seen in browser console';
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

  geterror() {
    return this.formError;
  }

}
