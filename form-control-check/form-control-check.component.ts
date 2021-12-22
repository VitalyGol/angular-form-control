import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFormCheckItem } from '../models/form-check-item.model';

@Component({
  selector: 'app-form-control-check',
  templateUrl: './form-control-check.component.html',
  styleUrls: ['./form-control-check.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlCheckComponent implements OnInit {

  @Input() control: FormControl;
  @Input() customStyle: string;
  @Input() name: string;
  @Input() checkItems: IFormCheckItem[];

  constructor() { }

  ngOnInit() {
  }

}
