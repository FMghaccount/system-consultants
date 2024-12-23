import { Component, inject } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ProductFormComponent, MatIconModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _productService: ProductService = inject(ProductService);

  product: Product | undefined = undefined;

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id')!;
    this.product = this._productService.getProductById(id);
  }
}
