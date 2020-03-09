import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  helper = new JwtHelperService();

  constructor(private authenticationService: AuthenticationService,
              private routes: Router,
              private questionService: QuestionsService) { }

  ngOnInit() {
  }

  starttest() {
    const decodedToken = this.helper.decodeToken(JSON.parse(JSON.stringify(this.authenticationService.currentUserValue)));
    this.questionService.startTest(decodedToken.candidateid, decodedToken.number)
    .pipe(first())
        .subscribe(
          data => {
            // console.log('data', data);
          },
          error => {
              console.log('Error in creating : ', error);
          });
  }

  navigateToTest() {
    this.routes.navigate(['test']);
  }

}
