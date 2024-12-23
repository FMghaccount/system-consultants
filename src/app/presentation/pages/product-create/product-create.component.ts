import { Component } from '@angular/core';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ProductFormComponent, MatIconModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {}
