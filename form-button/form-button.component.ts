import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FormButtonComponent implements OnInit {

  @Input() type: string;
  @Input() iconName: string;
  @Input() caption: string;
  @Input() disabled: boolean;

  @Output() Click: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.disabled = true;
    this.iconName = '';
  }

  ngOnInit() {
  }

  onClick($event: any) {
    this.Click.emit($event);
  }

}
