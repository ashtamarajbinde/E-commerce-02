import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData:undefined | product;
  productQuantity:number=1
  removeCart=false
constructor(private activateRoute:ActivatedRoute ,private product:ProductService){

}
  ngOnInit(): void {
    let productId=this.activateRoute.snapshot.paramMap.get('productId')
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((res)=>{
      console.log(res);
      this.productData=res
      
let cartData=localStorage.getItem('localCart')
if(productId && cartData){
  let items=JSON.parse(cartData);
  items=items.filter((item:product)=>productId==item.id.toString())
  if(items.length){
    this.removeCart=true
  }
  else{
    this.removeCart=false
  }
}
    })
    
  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1
    }
    else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1
    }

  }
  addTocart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
      this.product.localAddToCart(this.productData)
      this.removeCart=true
      }else{
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id
        let cartData:cart={
          ...this.productData,
          productId:this.productData.id,
          userId
        }
        delete cartData.id
        this.product.addTocart(cartData).subscribe((result)=>{
          if(result){
            alert('product is added in cart')
          }
        })
      }
    }
  }
  removeTocart(productId:number){
this.product.removeItemFromCart(productId)
this.removeCart=false

  }
}
