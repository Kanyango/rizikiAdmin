import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'
//import { FileUploader } from 'ng2-file-upload';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';


import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Component({
  selector: 'collapse-list',
  templateUrl: './collapse.component.html'
})
export class CollapseComponent{

  @Input() one;
  public isCollapsed = false;
  filesToUpload: Array<File>;
  private headers = new Headers({'Content-Type': 'application/json'});
 
   constructor(){
            
        this.filesToUpload = [ ];
          }

  
  upload(id, prodId)
  {
     let URL = `https://rizikisever.herokuapp.com/upload/${id}/${prodId}`
     this.makeFileRequest(URL, [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
  }
  
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("PUT", url, true);
            xhr.send(formData);
        });
    }
  


}
