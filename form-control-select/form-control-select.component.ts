import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFormAutoCompleteItem } from '../models/form-autocomplete-item.model';
import { IFormCustomError } from '../models/form-custom-error.model';

@Component({
  selector: 'app-form-control-select',
  templateUrl: './form-control-select.component.html',
  styleUrls: ['./form-control-select.component.css']
})
export class FormControlSelectComponent implements OnInit {

  @Input() control: FormControl;
  @Input() selectedResults: IFormAutoCompleteItem[];
  @Input() label: string;
  @Input() helper: string;
  @Input() name: string;
  @Input() customError: IFormCustomError[];

  @Output() OnSelect: EventEmitter<IFormAutoCompleteItem> = new EventEmitter();
  opened = false;

  constructor() { }

  ngOnInit(): void {
  }

  openSelect() {
    if (this.control.disabled === false) {
      this.opened = true;
    }
  }

  onSelect(item: IFormAutoCompleteItem) {
    this.opened = false;
    this.OnSelect.emit(item);
  }

}
