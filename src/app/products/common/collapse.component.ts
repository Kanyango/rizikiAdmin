import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'



import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Component({
  selector: 'collapse-list',
  templateUrl: './collapse.component.html'
})
export class CollapseComponent{

  @Input() one;
  
  
  constructor() {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  
  public isCollapsed = false;
  private headers = new Headers({'Content-Type': 'application/json'});
  private uploadUrl = 'https://rizikisever.herokuapp.com/upload/';
  
   
