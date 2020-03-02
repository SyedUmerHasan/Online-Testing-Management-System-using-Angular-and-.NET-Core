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

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {}
  categoryList = [];
  roleList = [];

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
            console.log(this.roleList);
          },
          error => {
            this.roleList = [];
          });
    this.userService.listcategory()
        .pipe(first())
        .subscribe(
          data => {
            console.log(data.data);
            this.categoryList =  data.data.categories;
            console.log(this.categoryList);
          },
          error => {
            this.categoryList = [];
          });
  }
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }
  get t() { return this.f.option as FormArray; }

  onSubmit() {

    console.log(this.userForm.value);

    console.log(this.userForm.value.password);
    this.userService.createRole(this.userForm.value.userName,
                                this.userForm.value.email,
                                this.userForm.value.password,
                                this.userForm.value.categoryId,
                                this.userForm.value.roleId)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              console.log('data', data);
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'User registration has been added successfully';
              this.showErrorStatus =  false;
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
