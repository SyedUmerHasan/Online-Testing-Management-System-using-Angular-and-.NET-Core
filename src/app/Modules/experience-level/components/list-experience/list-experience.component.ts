import { DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrls: ['./list-experience.component.css']
})
export class ListExperienceComponent implements OnInit, OnDestroy {

  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;

  constructor(private http: HttpClient,
              private experienceLevelService: ExperienceLevelService) {
  }
  ExperienceLevelList = [];
  users$: any[] = [];
  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.experienceLevelService.getallExperienceLevels()
        .pipe(first())
        .subscribe(
          data => {
            this.ExperienceLevelList =  data.data.experiences;
            console.log(this.ExperienceLevelList);
            this.users$ = data;
            this.dtTrigger.next();
          },
          error => {
            this.ExperienceLevelList = [];
          });
    this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true
          };

  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onDelete(experiencelevelId){
    console.log(experiencelevelId);
    this.experienceLevelService.deleteExperienceLevel(experiencelevelId)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            if(data.data.experience == true){
              console.log("success");

              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'ExperienceLevel has been deleted successfully';
              this.showErrorStatus =  false;

              this.ExperienceLevelList = this.ExperienceLevelList.filter((value) => {
                return value.id !== experiencelevelId;
              });

            } else {
              console.log("Fail");
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'ExperienceLevel has not been deleted, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
            console.log(error);
          });
  }

}
