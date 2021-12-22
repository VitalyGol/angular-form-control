import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IFileUploadItem } from '../models/file-upload-item.model';

@Component({
  selector: 'app-form-upload-file',
  templateUrl: './form-upload-file.component.html',
  styleUrls: ['./form-upload-file.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormUploadFileComponent implements OnInit {

  @Input() filesList: IFileUploadItem[];
  @Input() requiredFileType: string;
  @Input() maxFilesCount: number;
  @Output() OnSelectFile: EventEmitter<IFileUploadItem> = new EventEmitter<IFileUploadItem>();
  @Output() OnDeleteFile: EventEmitter<IFileUploadItem> = new EventEmitter<IFileUploadItem>();
  @Output() OnUploadFiles: EventEmitter<IFileUploadItem[]> = new EventEmitter<IFileUploadItem[]>();

  constructor() {
    this.maxFilesCount = 1;
  }

  ngOnInit(): void {
  }

  SelectFile($event: IFileUploadItem[]) {
    if (this.maxFilesCount > this.filesList.length) {
      if ($event && $event.length > 0) {
        const fileUpload: IFileUploadItem = $event[0];
        fileUpload.completed = false;
        fileUpload.uploading = false;
        fileUpload.message = '';
        this.OnSelectFile.emit(fileUpload);
      }
    }
  }

  CheckUpload() {
    return this.filesList.length > 0 && this.filesList.some((file) => {
      return (file.completed === false && file.uploading === false) && file.uploading === false;
    });
  }

  IsUploading() {
    return this.filesList.some((file) => file.uploading);
  }

  SelectFileFromBrowse($event) {
    if (this.maxFilesCount > this.filesList.length) {
      if ($event.target.files && $event.target.files.length > 0) {
        const fileUpload: IFileUploadItem = $event.target.files[0];
        fileUpload.completed = false;
        fileUpload.uploading = false;
        fileUpload.message = '';
        this.OnSelectFile.emit(fileUpload);
      }
    }
  }

  DeleteFile(file: IFileUploadItem) {
    if (file.completed === false && file.uploading === false) {
      this.OnDeleteFile.emit(file);
    }
  }

  UploadFiles() {
    this.OnUploadFiles.emit(this.filesList);
  }

}
