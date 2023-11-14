import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/components/products-list/products-list.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProductsListComponent
      },
      { path: 'products', component: ProductsListComponent },
      { path: 'details/:id', component: ProductDetailsComponent }

    //   {
    //     path: 'authors',
    //     loadChildren: () => import('./author/author.module').then(m => m.AuthorModule)
    //   },
    //   {
    //     path: 'books',
    //     loadChildren: () => import('./book/book.module').then(m => m.BookModule)
    //   },
    //   {
    //     path: '**',
    //     pathMatch: 'full',
    //     component: ErrorPageComponent
    //   }
];
