import { ExperienceLevelService } from './../../../../Services/ExperienceLevel/experience-level.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrls: ['./list-experience.component.css']
})
export class ListExperienceComponent implements OnInit {
  ExperienceLevelList = [];

  constructor(private experienceLevelService: ExperienceLevelService) { }

  ngOnInit() {
    this.experienceLevelService.getallExperienceLevels()
        .pipe(first())
        .subscribe(
          data => {
            this.ExperienceLevelList =  data.data.experiences;
            console.log(this.ExperienceLevelList);
          },
          error => {
            this.ExperienceLevelList = [];
          });
  }

}
