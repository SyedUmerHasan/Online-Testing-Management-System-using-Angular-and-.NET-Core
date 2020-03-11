import { UserService } from './../../../Services/Users/user.service';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { ExperienceLevelService } from './../../../Services/ExperienceLevel/experience-level.service';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-datatable-questions',
  templateUrl: './datatable-questions.component.html',
  styleUrls: ['./datatable-questions.component.css']
})
export class DatatableQuestionsComponent implements OnInit {
  QuestionsList = [];
  categoryList = [];
  experienceLevelList = [];
  mycatList = [];
  userEmail = [];
  expList = [];
  role = '';
  constructor(private questionsService: QuestionsService,
              private experienceLevelService: ExperienceLevelService,
              private categoryService: CategoryService,
              private userService: UserService,
              private authenticationService: AuthenticationService) {}
    cols = [];
    first = 0;
    colors = [];
    ngOnInit() {
      if (this.authenticationService.currentUserRole === 'contributor') {
        this.cols = [
          { field: 'question', header: 'Question Description' },
          { field: 'experienceLevel', header: 'Experience Level' },
        ];

        this.questionsService.getallQuestionsUsingContributor()
          .pipe(first())
          .subscribe(
            data => {
              this.QuestionsList =  data.data.questions;
              console.log('DatatableQuestionsComponent -> ngOnInit -> this.QuestionsList', this.QuestionsList);
            },
            error => {
              this.QuestionsList = [];
            });
        this.role = 'contributor';
      } else {

        this.cols = [
          { field: 'question', header: 'Question Description' },
          { field: 'category', header: 'Question category' },
          { field: 'experienceLevel', header: 'Experience Level' },
          { field: 'createdName', header: 'Created By' },
        ];

        this.role = 'admin';
        this.questionsService.getallQuestions()
        .pipe(first())
        .subscribe(
          data => {
            this.QuestionsList =  data.data.questions;
            console.log('DatatableQuestionsComponent -> ngOnInit -> this.QuestionsList', this.QuestionsList);
          },
          error => {
            this.QuestionsList = [];
          });

        this.experienceLevelService.getallExperienceLevels()
          .pipe(first())
          .subscribe(
            data => {
              this.experienceLevelList =  data.data.experiences;
              this.expList.push({ label: 'All Experience', value: null });

              console.log('DatatableQuestionsComponent -> ngOnInit -> this.experienceLevelList', this.experienceLevelList);
              this.experienceLevelList.map(x => {
                this.expList.push({ label: x.name, value: x.name });
              });
            },
            error => {
              this.experienceLevelList = [];
            });
        this.categoryService.getallCategory()
            .pipe(first())
            .subscribe(
              data => {
                // tslint:disable-next-line: no-string-literal
                this.categoryList =  data.data['categories'];
                this.mycatList.push({ label: 'All categories', value: null });
                this.categoryList.map(x => {
                  this.mycatList.push({ label: x.name, value: x.name });
                });
              },
              error => {
                this.mycatList = [];
              });

        this.userService.listUserEmail()
        .pipe(first())
        .subscribe(
          data => {
            // tslint:disable-next-line: no-string-literal
            const templist =  data.data['email'];
            this.userEmail.push({ label: 'All Email', value: null });
            templist.map(x => {
              this.userEmail.push({ label: x, value: x });
            });

          },
          error => {
            this.userEmail = [];
          });

      }

    }
}
