import { Category } from './../../../../_model/Category';
import { CategoryService } from './../../../../Services/Category/category.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  constructor(private categoryService: CategoryService) { }
  categoryList = [];

  ngOnInit() {
    this.categoryService.getallCategory()
        .pipe(first())
        .subscribe(
          data => {
            this.categoryList =  data.data['categories'];
            console.log(this.categoryList);
          },
          error => {
            this.categoryList = [];
          });
  }

}
