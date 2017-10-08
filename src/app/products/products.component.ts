import { Component, OnInit} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'products-list',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit{

  products: Array<any> = [];
  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'https://rizikisever.herokuapp.com/product';

  constructor(public http: Http){}

  ngOnInit(): Promise<any>
  {
     return this.http
          .get(this.productsUrl)
          .toPromise()
          .then(res => {  this.products = res.json(); console.log(res.json())})
          .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
  }
  
  delete(id : any): Promise<any>
  {
    const delUrl = `${this.productsUrl}/${id}`;
     return this.http
          .delete(delUrl)
          .toPromise()
          .then(res => {
                  for(let p in this.products)
                  {
                    if(this.products[p]._id === id)
                    {
                      this.products.splice(p, 1);
                    }
                  }
              })
          .catch(this.handleError
  }

}
