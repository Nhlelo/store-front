import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  providers: [
    ProductsService 
    ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
   routeSub: Subscription | undefined;
   product = new Product() ;
  constructor(private route: ActivatedRoute, private productService: ProductsService) { 

  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      const productId= params['id'];
     this.productService.getSingleProduct(productId).subscribe((res:any)=>{
      
      this.product = res
      console.log("Single Product",this.product)
     })
    });

  }

  ngOnDestroy() {
    this.routeSub!.unsubscribe();
  }
}
