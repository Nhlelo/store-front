import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productService: ProductsService;
  let activatedRoute: ActivatedRoute;

  const  productMock = { id: 1, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  }

  const productServiceMock: any = {
    getSingleProduct(): Observable<Product> { return of(productMock); },
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [  CommonModule,HttpClientModule,ProductDetailsComponent],
      providers: [
        ProductsService,
        { provide: ProductsService, useValue: productServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(convertToParamMap({ id: '1' })),
          },
        },
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
   activatedRoute = TestBed.inject(ActivatedRoute);
  component.product =productMock;
   
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product details on initialization', () => {
    const product : Product= { id: 1, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  };
    
    spyOn(productService, 'getSingleProduct').and.returnValue(of(product));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.product).toEqual(product);
  });

  it('should unsubscribe from route subscription on component destruction', () => {
    const unsubscribeSpy = spyOn(component.routeSub!, 'unsubscribe');

    fixture.destroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});

