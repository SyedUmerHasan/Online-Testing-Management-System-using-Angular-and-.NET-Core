import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  employeeForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  submitMethod() {
    console.log(this.employeeForm.value);
    this.employeeForm.reset();
  }
}
