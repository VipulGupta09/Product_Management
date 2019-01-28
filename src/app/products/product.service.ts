import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError,tap,map} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})


export class ProductService{
    private productUrl='./api/products/products.json';
    private productDetailsUrl= './api/products/productDetails';

    constructor (private http:HttpClient) {}

    getProducts():Observable<IProduct[]>{
     return this.http.get<IProduct[]>(this.productUrl).pipe(
       tap(data=>console.log('All :'+ JSON.stringify(data))),
       catchError(this.handleError) 
     );    
    }

    getProductDetails(id: number):Observable<any[]>{
        let productDetailsUrl :string = this.productDetailsUrl+id+'.json';
        return this.http.get<any[]>(productDetailsUrl).pipe(
          tap(data=>console.log('Product :'+id +' '+ JSON.stringify(data))),
          catchError(this.handleError) 
        );
           
       }
    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
          map((products: IProduct[]) => products.find(p => p.productId === id))
        );
      }
    private handleError(err:HttpErrorResponse){
            let errorMessage='';
            if(err.error instanceof ErrorEvent){
                //client side or network error occur handle it acc.
                errorMessage=`an error occured:${err.error.message}`;

            }else{
                //if backend return unsuccessful response code,responde body may contain clues what went wrong
                errorMessage=`Server returned code:${err.status}, error messafe is :${err.message}`;
            }
            console.error(errorMessage);
            return throwError(errorMessage);
    }
}

