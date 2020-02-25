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
  candidateForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  helper = new JwtHelperService();


  constructor(private formBuilder: FormBuilder,
              private candidateService: CandidateService,
              private authenticationService: AuthenticationService) {}
  candidateList = [];

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      CandidateId: ['', Validators.required],
      numberOfQuestion: ['', Validators.required],
    });
    this.candidateService.getallCandidate()
        .pipe(first())
        .subscribe(
          data => {
            this.candidateList =  data.data.candidates;
            console.log(this.candidateList);
          },
          error => {
            this.candidateList = [];
          });

  }
  // convenience getter for easy access to form fields
  get f() { return this.candidateForm.controls; }

  onSubmit() {
      // Description, Marks, CategoryId, ExperienceLevelId
      console.log(this.candidateForm.value.CandidateId, this.candidateForm.value.numberOfQuestion);
      this.candidateService.createtest(this.candidateForm.value.CandidateId, this.candidateForm.value.numberOfQuestion)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              console.log('data', data);
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Candidate Test has been added successfully';
              this.showErrorStatus =  false;
              this.candidateForm.reset();
              this.authenticationService.logout();
              localStorage.setItem('currentUser', JSON.stringify(data.data.jwttoken));
              console.log(data.data);
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

}
