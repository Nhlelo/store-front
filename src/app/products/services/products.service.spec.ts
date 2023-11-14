import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    service.getAllProducts().subscribe((data) => {
      expect(data).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });

  it('should retrieve product categories', () => {
    const mockCategories = ['Category 1', 'Category 2'];
    service.getCategories().subscribe((data) => {
      expect(data).toEqual(mockCategories);
    });

    const req = httpTestingController.expectOne('https://fakestoreapi.com/products/categories');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCategories);
  });

  it('should retrieve a single product by ID', () => {
    const mockProduct = { id: 1, name: 'Product 1' };
    const productId = 1;
    service.getSingleProduct(productId).subscribe((data) => {
      expect(data).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(`https://fakestoreapi.com/products/${productId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProduct);
  });
});
