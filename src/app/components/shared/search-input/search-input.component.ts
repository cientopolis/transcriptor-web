import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @ViewChild('searchDropdown') searchDropdown;
  @ViewChild('searchInput') searchInput;
  
  @Input() placeholder = ''
  @Input() autocomplete = true
  @Input() item = null 
  @Input() itemIcon = 'star'
  @Input() minChars = 2
  @Input() fetchDelay = 500
  @Input() results = []
  @Input() flatStyle = false
  @Input() showClearButton = true
  
  @Output() onFetch = new EventEmitter();
  @Output() itemChange = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() invalidInput = new EventEmitter();

  
  dropdownId = null
  dropdownButtonId = null
  
  searchText:String;
  searchTextChanged: Subject<string> = new Subject<string>();

  constructor() {
    let date = Date.now()
    this.dropdownId = 'search-dropdown-' + date
    this.dropdownButtonId = 'btn-search-dropdown-' + date

    this.searchTextChanged.pipe(debounceTime(this.fetchDelay),distinctUntilChanged())
      .subscribe(searchText => this.search(searchText));
  }

  ngOnInit() {
  }

  search(searchText = this.searchText) {
    console.log("search", searchText)
    this.searchDropdown.close()
    if (searchText && searchText.length > this.minChars) { 
      this.onFetch.emit({searchText: searchText});
    } else {
      if(searchText) {
        this.invalidInput.emit()
      }
    }
  }

  setResults(results) {
    this.results = results
    if (this.autocomplete) {
      this.searchDropdown.open()
    } else {
      this.searchDropdown.close()
    }
  }

  selectItem(item) {
    this.item = item
    this.itemChange.emit(item);
    this.searchDropdown.close()
  }

  changedSearchText(searchText: string) {
    this.searchText = searchText
    this.searchTextChanged.next(searchText);
    // if (searchText && searchText.length > this.minChars) { 
    // } else {
    //   this.invalidInput.emit()
    // }
  }

  clear() {
    this.changedSearchText('')
    this.onClear.emit()
  }

  focusInput() {
    $(this.searchInput.nativeElement).trigger('focus');
  }
}
