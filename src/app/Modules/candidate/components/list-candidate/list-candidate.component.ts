import { CandidateService } from './../../../../Services/Candidate/candidate.service';
import { Component, OnInit } from '@angular/core';
import 'src/assets/scripts/main.js';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})
export class ListCandidateComponent implements OnInit {

  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  constructor(private candidateService: CandidateService) { }
  candidateList = [];

  ngOnInit() {
    this.candidateService.getallCandidate()
        .pipe(first())
        .subscribe(
          data => {
            this.candidateList =  data.data['candidates']
            console.log(this.candidateList);
          },
          error => {
            this.candidateList = [];
          });
  }

}
