import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel-template',
  templateUrl: './admin-panel-template.component.html',
  styleUrls: ['../../../../node_modules/ng-zorro-antd/src/ng-zorro-antd.min.css']
})
export class AdminPanelTemplateComponent implements OnInit {
  isCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

}
