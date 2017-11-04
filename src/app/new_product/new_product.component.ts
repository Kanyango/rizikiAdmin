import { Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Variations } from './variations-model';
import { Headers, Http } from '@angular/http';
import { Router }      from '@angular/router';
//import { FileUploader } from 'ng2-file-upload';

import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'new-product',
  templateUrl: './new_product.component.html'
})

export class NewProductComponent implements OnInit {

  prodform: FormGroup;
  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'https://rizikiserver.herokuapp.com/product';

  constructor(public fb: FormBuilder, private http: Http, public router: Router){}

  ngOnInit()
  {

    this.prodform = this.fb.group({

            brand: ['', Validators.required],
            category: ['',Validators.required],
            distribtor: ['',Validators.required],
            variations: this.fb.array([])
    })
  }

  get variations(): FormArray
  {
      return this.prodform.get('variations') as FormArray
  }

  setVariations(variations: Variations[])
  {
      const varsFGs = variations.map(address => this.fb.group(variations));
      const varsFormArray = this.fb.array(varsFGs);
      this.prodform.setControl('variations', varsFormArray);
  }

  addVar() {
    this.variations.push(this.fb.group(new Variations()));
  }

  rem(i: number)
  {

  }

  onSubmit(): Promise<any>
  {
    return this.http
               .post(this.productsUrl, this.prodform.value, {headers: this.headers})
               .toPromise()
               .then(res => {
                             console.log(res.json());  
                             this.router.navigate(['/products']);
                  })
               .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

}
