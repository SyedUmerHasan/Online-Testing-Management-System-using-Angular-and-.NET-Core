import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Users/user.service';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

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
  constructor(private userService: UserService) { }
  userList = [];

  users$: any[] = [];

  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.userService.getallUser()
        .pipe(first())
        .subscribe(
          data => {
            this.userList =  data.data['users'];
            this.users$ = data;
            this.dtTrigger.next();
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

  // onDelete(CategoryId){
  //   this.categoryService.deletecategory(CategoryId)
  //       .pipe(first())
  //       .subscribe(
  //         data => {
  //           if(data.data.category == true){
  //             this.showSuccessStatus =  true;
  //             this.showSuccessMessage = 'Category has been deleted successfully';
  //             this.showErrorStatus =  false;

  //             this.categoryList = this.categoryList.filter((value) => {
  //               return value.categoryId !== CategoryId;
  //             });

  //           } else {
  //             this.showSuccessStatus  = false;
  //             this.showErrorStatus  = true;
  //             this.showErrorMessage = 'Category has not been deleted, can be seen in browser console';
  //             console.log('Error in Deleting Category');
  //           }
  //         },
  //         error => {
  //           console.log(error);
  //         });
  // }


}
