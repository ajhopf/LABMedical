import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnChanges{
  @Output('onSearchInput') searchInput = new EventEmitter<string>()
  @Input() listOfFilteredPacients
  @Input() filterById
  @Input() clearSearch
  searchTerm = ''

  onInputKeyDown() {
    this.searchInput.emit(this.searchTerm)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.clearSearch) {
      this.searchTerm = ''
    }
  }
}
