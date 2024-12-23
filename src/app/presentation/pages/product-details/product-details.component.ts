import { Component, inject } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _productService: ProductService = inject(ProductService);

  product: Product | undefined;

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('id')!;
    this.product = this._productService.getProductById(id);
  }
}
