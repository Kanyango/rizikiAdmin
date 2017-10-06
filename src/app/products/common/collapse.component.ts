import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'
import { FileUploader } from 'ng2-file-upload';

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Component({
  selector: 'collapse-list',
  templateUrl: './collapse.component.html'
})
export class CollapseComponent implements OnInit{

  @Input() one;
  public isCollapsed = false;
  private headers = new Headers({'Content-Type': 'application/json'});
  //private productsUrl = 'http://127.0.0.1:8300/upload';
  //private URL = ' https://rizikisever.herokuapp.com/upload/';
  public uploader:FileUploader = new FileUploader(
      {url:'https://rizikisever.herokuapp.com/upload/id', itemAlias: 'photo' , prodId: prodId});
  
  constructor(public http: Http, private el: ElementRef){}


  ngOnInit()
  {
    console.log(this.one);
  }




}
