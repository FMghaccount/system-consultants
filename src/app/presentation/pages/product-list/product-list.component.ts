import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  DestroyRef,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MyCustomPaginatorIntl } from '../../../core/services/mat-paginator.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatPaginator,
    MatSortModule,
    MatSort,
    CommonModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl },
    CurrencyPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource: MatTableDataSource<Product>;

  private _productService: ProductService = inject(ProductService);
  private _confirmDialogService: ConfirmDialogService =
    inject(ConfirmDialogService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private _router: Router = inject(Router);

  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'description',
    'actions',
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(
      this._productService.getProducts()
    );
  }
  // dataSource = this._productService.getProducts();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  /**
   * @description show detail of selected product
   * @param {Product} product
   */
  showProductDetail(product: Product) {
    this._router.navigate(['/details', product.id]);
  }

  /**
   * @description edit product
   * @param {Product} product
   * @param {MouseEvent} event
   */
  editProduct(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this._router.navigate(['/edit', product.id]);
  }

  /**
   * @description show detail of selected product
   * @param {Product} product
   * @param {MouseEvent} event
   */
  deleteProduct(event: MouseEvent, product: Product) {
    event.stopPropagation();
    let dialogRef = this._confirmDialogService.createConfirmDialog(
      'آیا مطمئن هستید ؟',
      'حذف'
    );
    dialogRef.componentInstance.onFinish
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: boolean) => {
          dialogRef.componentInstance.isChecking = false;
          dialogRef.close();
          if (res) {
            this._productService.deleteProduct(product.id);
            const index = this.dataSource.data.indexOf(product);
            if (index >= 0) {
              this.dataSource.data.splice(index, 1);
              this.dataSource._updateChangeSubscription();
            }
          }
        },
      });
  }

  /**
   * navigate to create product page
   */
  addProduct() {
    this._router.navigateByUrl('/create');
  }
}
