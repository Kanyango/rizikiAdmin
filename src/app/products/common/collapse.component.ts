import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'
//import { FileUploader } from 'ng2-file-upload';

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
  private URL = ' https://rizikisever.herokuapp.com/upload/';
  constructor(public http: Http, private el: ElementRef){}


  ngOnInit()
  {
    console.log(this.one);
  }

  upload(id: any)
  {

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        console.log("iam+ "+inputEl);
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('photo', inputEl.files.item(i));
            }
            let nn = formData.getAll();
            console.log(nn);
            this.http
                .put(this.URL, + id , formData).map((res:any) => res).subscribe(
                    (success) => {
                     alert(success._body);
                  },
                    (error) => alert(error)
                );

        }
  }




}
