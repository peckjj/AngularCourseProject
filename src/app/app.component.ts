import { DataStorageService } from './shared/directives/services/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'course-project';

  showRecipes = true;

  constructor(private dss: DataStorageService) {}

  ngOnInit() {
    this.dss.fetchAll();
  }

  onShowRecipes(shouldShow: boolean) {
    this.showRecipes = shouldShow;
  }

}
