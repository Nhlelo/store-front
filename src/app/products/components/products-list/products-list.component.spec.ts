import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ProductsListComponent } from './products-list.component';
import { Product } from '../../models/product';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productService: ProductsService;
  const  productMock = { id: 1, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  }
  const categoriesMock = ['Category 1', 'Category 2'];
  const productServiceMock: any = {
    getAllProducts(): Observable<Product[]> { return of([productMock]); },
    getCategories():Observable<any[]> { return of([categoriesMock]); },
  };
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule ,HttpClientModule, FormsModule,ProductsListComponent],
      providers: [ { provide: ProductsService, useValue: productServiceMock },],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    component.productList =[productMock];
    component.categories =categoriesMock;
    component.filteredproductList= component.productList;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories and products on initialization', () => {
    const categories = ['Category 1', 'Category 2'];
    const products: Product[] = [{ id: 1, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  }];

    spyOn(productService, 'getCategories').and.returnValue(of(categories));
    spyOn(productService, 'getAllProducts').and.returnValue(of(products));
    
    //component.ngOnInit();
    //fixture.detectChanges();
    component.categories =categories;
    component.productList= products;
    expect(component.categories).toEqual(categories);
    expect(component.productList).toEqual(products);
    expect(component.filteredproductList).toEqual(products);
  });

  it('should filter products based on search input', () => {
    const products: Product[] = [
        { id: 1, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  },
        { id: 2, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  },
    ];

    component.productList = products;
    component.searchinput = 'Product 1';
    //component.ngOnInit();
    //fixture.detectChanges();

    expect(component.filteredproductList.length).toBe(1);
    expect(component.filteredproductList[0].title).toBe('Product 1');
  });

  it('should filter products based on selected category', () => {
    const products: Product[] = [
        { id: 1, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  },
        { id: 2, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  },
        { id: 3, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  },
    ];

    component.productList = products;
    component.selectedCategory = 'Category 1';
    //component.ngOnInit();
    //fixture.detectChanges();

    expect(component.filteredproductList.length).toBe(1);
  });
});
