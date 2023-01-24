import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output('onSearchInput') searchInput = new EventEmitter<string>()
  searchTerm = ''
  onInputKeyDown(){
    this.searchInput.emit(this.searchTerm)
  }
}
