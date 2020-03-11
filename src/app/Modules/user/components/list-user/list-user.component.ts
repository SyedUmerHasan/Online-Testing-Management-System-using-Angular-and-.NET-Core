import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Users/user.service';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent implements OnInit {
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) { }
  userList = [];
  role = ""
 
  users$: any[] = [];

  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    if (this.authenticationService.currentUserRole == 'admin' || 
        this.authenticationService.currentUserRole == 'SuperAdmin'){
    this.userService.getallUser()
        .pipe(first())
        .subscribe(
          data => {
            this.userList =  data.data['users'];
            this.users$ = data;
            this.dtTrigger.next();
            this.role = this.authenticationService.currentUserRole;
          },
          error => {
            this.userList = [];
          });
    this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true
          };
        }
  }
  resetPassword(email){
    this.userService.GetResetPasswordLink(email)
        .pipe(first())
        .subscribe(
          data => {
            console.log('I am Respose',data);
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Link Send to Your Email Address';
            this.showErrorStatus =  false;
          },
          error => {
            this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Error Occured';
            this.userList = [];
          });

  }


}
