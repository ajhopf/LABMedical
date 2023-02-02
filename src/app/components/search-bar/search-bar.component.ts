import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PacientsDbService } from "../../shared/services/pacients-db.service";
import { Pacient } from "../../shared/models/pacient.model";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnChanges{
  @Output('onSearchInput') searchInput = new EventEmitter<string>()
  @Input() listOfFilteredPacients: Pacient[]
  @Input() filterById: boolean
  @Input() clearSearch: boolean
  searchTerm: string = ''

  onInputKeyDown(): void {
    this.searchInput.emit(this.searchTerm)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.clearSearch) {
      this.searchTerm = ''
    }
  }
}
