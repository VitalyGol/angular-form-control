import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragAndDropFile]'
})
export class DragAndDropFileDirective {

  @Output() OnFileDropped = new EventEmitter<any>();
  @HostBinding('style.opacity') public workspaceOpacity = '1';

  // Dragover listener, when files are dragged over our host element
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.workspaceOpacity = '0.5';
  }

  // Dragleave listener, when files are dragged away from our host element
  @HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.workspaceOpacity = '1';
  }

  // Drop listener, when files are dropped on our host element
  @HostListener('drop', ['$event']) public ondrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.workspaceOpacity = '1';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.OnFileDropped.emit(files);
    }
  }

}
