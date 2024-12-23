import { environment } from '../../../environments/environment';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Product } from '../models/product.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * @description get list of products
   */
  getProducts(): Product[] {
    let products: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      products = localStorage.getItem(environment.storageKey);
    }
    return products ? JSON.parse(products) : [];
  }

  /**
   * @description get list of products
   * @param{Product[]} products
   */
  saveProducts(products: Product[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(environment.storageKey, JSON.stringify(products));
    }
  }

  /**
   * @description add product with given data to products list
   * @param {Product} product
   */
  addProduct(product: Product) {
    const products = this.getProducts();
    product.id = new Date().getTime();
    products.push(product);
    this.saveProducts(products);
  }

  /**
   * @description update product with given data. first find desired product from products list, then
   * update it and change product data in list
   * @param {Product} updatedProduct
   */
  updateProduct(updatedProduct: Product) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === updatedProduct.id);

    if (index !== -1) {
      products[index] = updatedProduct;
      this.saveProducts(products);
    }
  }

  /**
   * @description delete product from list of products
   * @param {number} id
   */
  deleteProduct(id: number) {
    let products = this.getProducts();
    products = products.filter((p) => p.id !== id);
    this.saveProducts(products);
  }

  /**
   * @description find a product from products list with given product id
   * @param {number} id
   */
  getProductById(id: number): Product | undefined {
    const products = this.getProducts();
    return products.find((p) => p.id === id);
  }
}
