import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output('onSearchInput') searchInput = new EventEmitter<string>()
  @Input() listOfFilteredPacients
  @Input() filterById
  searchTerm = ''
  onInputKeyDown(){
    this.searchInput.emit(this.searchTerm)
  }

}
