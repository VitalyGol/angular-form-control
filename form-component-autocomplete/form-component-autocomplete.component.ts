import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFormAutoCompleteItem } from '../models/form-autocomplete-item.model';
import { IFormCustomError } from '../models/form-custom-error.model';

@Component({
  selector: 'app-form-component-autocomplete',
  templateUrl: './form-component-autocomplete.component.html',
  styleUrls: ['./form-component-autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponentAutocompleteComponent implements OnInit {

  @Input() control: FormControl;
  @Input() selectedResults: IFormAutoCompleteItem[];
  @Input() label: string;
  @Input() helper: string;
  @Input() name: string;
  @Input() customError: IFormCustomError[];
  @Input() disabled: boolean;
  @Output() inputChange: EventEmitter<IFormAutoCompleteItem> = new EventEmitter();
  @Output() inputSearch: EventEmitter<string> = new EventEmitter();
  @Output() resultSelect: EventEmitter<IFormAutoCompleteItem> = new EventEmitter();
  currentValue = { key: null, value: '' };

  constructor() {
    this.selectedResults = [];
  }

  ngOnInit() {
  }

  onChange($event) {
    this.inputChange.emit(this.currentValue);
  }


  onButtonSearch() {
    this.selectedResults = [];
    this.inputSearch.emit(this.currentValue.value);
  }

  onSearch($event: KeyboardEvent) {
    // Check pressed char is printable
    if ($event.key.length === 1 || $event.key === 'Backspace' || $event.key === 'Delete') {
      const value = ($event.target as HTMLInputElement).value;
      this.currentValue =  { key: null, value };
      this.selectedResults = [];
      this.inputSearch.emit(value);
    }
  }

  onSelect(item: IFormAutoCompleteItem) {
    this.currentValue = item;
    this.selectedResults = [];
    this.resultSelect.emit(item);
  }

  customSplit(data: IFormAutoCompleteItem) {
    const result = [];
    const item = data.value;
    if (this.currentValue.value.trim() === '' || this.currentValue.value === item) {
      result.push(item);
    } else {
      const b = item.split(this.currentValue.value);
      for (let i = 0; i < b.length; i++) {
        if (b[i] === '') {
          result.push(this.currentValue.value);
        } else if (i + 1 < b.length) {
          if (b[i] !== '' && b[i + 1] !== '') {
            result.push(b[i]);
            result.push(this.currentValue.value);
          } else {
            result.push(b[i]);
          }
        } else {
          result.push(b[i]);
        }
      }
    }
    return result;
  }

}
