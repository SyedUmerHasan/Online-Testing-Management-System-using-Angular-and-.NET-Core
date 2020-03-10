import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-datatable-category',
  templateUrl: './datatable-category.component.html',
  styleUrls: ['./datatable-category.component.css']
})
export class DatatableCategoryComponent implements OnInit {
  categoryList = [];
  constructor(private categoryService: CategoryService) { }
  cols = [];
  first: number = 0;
  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Category Name' }
    ];
    this.categoryService.getallCategory()
        .pipe(first())
        .subscribe(
          data => {
            // tslint:disable-next-line: no-string-literal
            this.categoryList =  data.data['categories'];
            console.log("DatatableCategoryComponent -> ngOnInit -> this.categoryList", this.categoryList)
          },
          error => {
            this.categoryList = [];
          });
  }

}
