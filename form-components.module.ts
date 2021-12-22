import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponentAutocompleteComponent } from './form-component-autocomplete/form-component-autocomplete.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { ErrorMessagePipe } from './error-message.pipe';
import { FormControlCheckComponent } from './form-control-check/form-control-check.component';
import { FormControlSelectComponent } from './form-control-select/form-control-select.component';
import { FormUploadFileComponent } from './form-upload-file/form-upload-file.component';
import { DragAndDropFileDirective } from './form-upload-file/drag-and-drop-file.directive';
import { FormControlComponent } from './form-control/form-control.component';



@NgModule({
  declarations: [
    FormControlComponent,
    FormComponentAutocompleteComponent,
    FormButtonComponent,
    ErrorMessagePipe,
    FormControlCheckComponent,
    FormControlSelectComponent,
    FormUploadFileComponent,
    DragAndDropFileDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormControlComponent,
    FormComponentAutocompleteComponent,
    FormButtonComponent,
    FormControlCheckComponent,
    FormControlSelectComponent,
    FormUploadFileComponent
  ]
})
export class FormComponentsModule { }
