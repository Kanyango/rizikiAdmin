import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import { Headers, Http } from '@angular/http';
import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';
import 'rxjs/add/operator/toPromise'



import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Component({
  selector: 'collapse-list',
  templateUrl: './collapse.component.html',
  directives: [UPLOAD_DIRECTIVES],
})
export class CollapseComponent{

  @Input() one;

  
  public isCollapsed = false;
  private headers = new Headers({'Content-Type': 'application/json'});
  private uploadUrl = 'https://rizikisever.herokuapp.com/upload/';
  
  

  handleUpload(data, id, prodName): void {
    options: Object = {
        url: `${this.uploadUrl}${id}`,
        method: 'PUT',
        data: {'prodName': prodName}
      };
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }
  
  
  
}
