import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService) { }

  submit(data: product) {
    this.product.addProduct(data).subscribe((res) => {
      console.log(res)
      if (res) {
        this.addProductMessage = "product is successfuliy added"
      }
      setTimeout(() => this.addProductMessage = undefined, 3000)
    })
  }
}
