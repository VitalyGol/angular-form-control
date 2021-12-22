import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFormCustomError } from '../models/form-custom-error.model';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() helper: string;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() name: string;
  @Input() customError: IFormCustomError[];

  @Output() OnEnter: EventEmitter<void> = new EventEmitter();

  constructor() {
    this.type = 'text';
    this.label = '';
    this.customError = [{ type: 'required', errorMessage: 'שדה חובה.' }];
  }

  pressEnter() {
    this.OnEnter.emit();
  }

}
