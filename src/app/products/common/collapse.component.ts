import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise'

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Component({
  selector: 'collapse-list',
  templateUrl: './collapse.component.html'
})
export class CollapseComponent{

  @Input() one;
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(public router: Router) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  
  public isCollapsed = true;
  private headers = new Headers({'Content-Type': 'application/json'});
  private uploadUrl = 'https://rizikiserver.herokuapp.com/upload/';
  
  

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  startUpload(id, prodName): void {
    
    const URL = `${this.uploadUrl}${id}`;
    const event: UploadInput = {
      type: 'uploadAll',
      url: URL,
      method: 'PUT',
      data: { 'prodName': prodName}
    };
    this.uploadInput.emit(event);
    this.router.navigate(['/products']);
  }
  
  
}
