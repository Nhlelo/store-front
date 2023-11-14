import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ProductsService } from '../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule,CardComponent,HttpClientModule,FormsModule],
  providers: [
    ProductsService 
    ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit{
     productList: Product[] = [new Product()];
     categories: string[]=[];
     selectedCategory: string | null = null;
     @ViewChild('categoriesList') categoriesList!: ElementRef;
     filteredproductList :Product[]=[];
     searchinput: string ='';
constructor(private productservice:ProductsService ){

}
  ngOnInit(): void {

   this.productservice.getCategories().subscribe((categories) => {
  this.categories = categories;
  });
    console.log(this.categories)
    this.productservice.getAllProducts().subscribe((products)=>{
      this.productList =products;
      this.filteredproductList=this.productList;
       console.log(this.productList);
    });
  }
  onSearchChange() {
    const searchTerm = this.searchinput.toLowerCase();
    console.log(searchTerm)
    if(searchTerm ===''){
      this.filteredproductList = this.productList;
    }
    else{
      this.filteredproductList = this.productList.filter(product =>
        (this.selectedCategory === null || product.category === this.selectedCategory) &&
        (product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm))
      );
    }
    
  }

  onSelected():void {
    
		this.selectedCategory = this.categoriesList.nativeElement.value;
    if(this.selectedCategory ==='default'){
      this.filteredproductList = this.productList;
    }
    else{
      this.filteredproductList= this.productList.filter((x)=>x.category===this.selectedCategory);
    }
   
    console.log(this.selectedCategory);
    console.log(this.productList);
	}

}
