import { UserService } from './../../../../Services/Users/user.service';
import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { CategoryService } from './../../../../Services/Category/category.service';
import { QuestionsService } from './../../../../Services/Questions/questions.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  categoryList = [];
  roleList = [];
  formError = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      categoryId: ['', Validators.required],
      roleId: ['', Validators.required],
    });
    this.userService.listRole()
        .pipe(first())
        .subscribe(
          data => {
            this.roleList =  data.data.roles;
          },
          error => {
            this.roleList = [];
          });
    this.userService.listcategory()
        .pipe(first())
        .subscribe(
          data => {
            this.categoryList =  data.data.categories;
          },
          error => {
            this.categoryList = [];
          });
  }
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      this.formError = true;
      return;
    }
    this.userService.createRole(this.userForm.value.userName,
                                this.userForm.value.email,
                                this.userForm.value.password,
                                this.userForm.value.categoryId,
                                this.userForm.value.roleId)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'User registration has been added successfully';
              this.showErrorStatus =  false;
              this.submitted = false;
              this.userForm.reset();
            } else {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'User registration has not been added, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'User registration has not been completed, can be seen in browser console';
              console.log('Error in creating : ', error);
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
