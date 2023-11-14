import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from './card.component';
import { Product } from '../../../products/models/product';
import { Router } from '@angular/router';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule,CardComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details', () => {
    const product: Product = { id: 1, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  };
    component.item = product;

    fixture.detectChanges();

    const cardElement = fixture.nativeElement;
    expect(cardElement.textContent).toContain(product.title);
    // You can add more expectations to check other properties if needed.
  });

  it('should navigate to details page', () => {
    const product: Product = { id: 1, title: 'Product 1',price:12,description:"Hello djj",category:"Mens",image:""  };
    component.item = product;
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.gotoDetails(product.id);

    expect(navigateSpy).toHaveBeenCalledWith([`/details/${product.id}`]);
  });
});
