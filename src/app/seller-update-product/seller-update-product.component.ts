import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product
  productMessage: undefined | string
  constructor(private route: ActivatedRoute, private product: ProductService) {

  }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.log(data);
      this.productData = data

    })

  }
  submit(data: product) {
    console.log(data);
    if(this.productData){
      data.id=this.productData.id
    }
    this.product.updateProduct(data).subscribe((res) => {
      if (res) {
        this.productMessage = "product has updated"
      }
    })
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000)

  }
}
