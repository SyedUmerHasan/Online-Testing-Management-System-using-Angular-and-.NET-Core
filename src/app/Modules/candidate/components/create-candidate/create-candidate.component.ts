import { ToastrService } from 'ngx-toastr';
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

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private candidateService: CandidateService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showError() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', Validators.required],
      CurrentCompany: ['', Validators.required],
      TechStack: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.candidateForm.controls; }

  onSubmit() {
    // this.loading = true;
    // tslint:disable-next-line: max-line-length
    this.candidateService.createCandidate(
      this.f.FirstName.value,
      this.f.LastName.value,
      this.f.email.value,
      this.f.CurrentCompany.value,
      this.f.TechStack.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("data", data);

        },
        error => {
            console.log('Not Successfully logged in');
        });
  }
}
