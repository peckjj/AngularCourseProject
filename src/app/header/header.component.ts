import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() onShowRecipes = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  showRecipes(shouldShowRecipes: boolean) {
    this.onShowRecipes.emit(shouldShowRecipes);
  }
}
