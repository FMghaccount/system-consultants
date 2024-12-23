import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [MatSnackBar],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  @Input() isEditMode: boolean = false;

  @Input()
  get product(): Product | undefined {
    return this._product;
  }
  set product(_value: Product | undefined) {
    this._product = _value;
    this.patchForm();
  }

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _productService: ProductService = inject(ProductService);
  private _notificationService: NotificationService =
    inject(NotificationService);
  private _router: Router = inject(Router);

  productForm: FormGroup;
  showPriceError: boolean = false;
  private _product: Product | undefined = undefined;
  showNameError: boolean = false;

  constructor() {
    this.productForm = this._formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: [''],
    });
  }

  ngOnInit(): void {}

  /**
   * @description submit form data
   */
  onSubmit(): void {
    let formIsValid: boolean = this.checkFormValidity();
    if (this.productForm.valid && formIsValid && !this.isEditMode) {
      this._productService.addProduct(this.productForm.value);
      this._notificationService.showSuccessMessage(
        'با موفقیت ثبت شد',
        'متوجه شدم'
      );
    } else if (this.productForm.valid && formIsValid && this.isEditMode) {
      this._productService.updateProduct(this.productForm.value);
      this._notificationService.showSuccessMessage(
        'با موفقیت ویرایش شد',
        'متوجه شدم'
      );
    }
    this._router.navigate(['/']);
  }

  /**
   * @description check if form is valid(if not show message for each invalid control)
   * @returns {boolean}
   */
  checkFormValidity(): boolean {
    let flag: boolean = true;
    flag = this.checkProductName();
    flag = this.checkProductPrice();
    return flag;
  }

  /**
   * @description check if price is valid
   * @returns {boolean}
   */
  checkProductPrice(): boolean {
    let flag: boolean = true;
    if (this.productForm.controls['name'].invalid) {
      this.showNameError = true;
      this._notificationService.showWarnMessage(
        'لطفا نام را وارد کنید',
        'متوجه شدم'
      );
      flag = false;
    } else {
      this.showNameError = false;
    }

    return flag;
  }

  /**
   * @description check if name is valid
   * @returns {boolean}
   */
  checkProductName() {
    let flag: boolean = true;
    if (this.productForm.controls['price'].invalid) {
      this.showPriceError = true;
      this._notificationService.showWarnMessage(
        'لطفا نام را وارد کنید',
        'متوجه شدم'
      );
      flag = false;
    } else {
      this.showPriceError = false;
    }

    return flag;
  }

  /**
   * @description patch product form to edit product data
   */
  patchForm() {
    this.productForm.controls['name'].patchValue(this.product?.name);
    this.productForm.controls['price'].patchValue(this.product?.price);
    this.productForm.controls['id'].patchValue(this.product?.id);
    this.productForm.controls['description'].patchValue(
      this.product?.description
    );
  }
}
