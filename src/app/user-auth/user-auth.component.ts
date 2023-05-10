import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../service/user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = ""
  constructor(private user: UserService, private product: ProductService) {
  }
  ngOnInit(): void {
    //  this.user.userAuthReload()
  }
  signUp(data: signUp) {
    this.user.userSignUp(data)
  }
  login(data: login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.log(result);
      if (result) {
        this.authError = "User Not Found"
      }
      else {
        this.localCartToRemoteCart()
      }
    })
  }
  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    if (data) {
      let cartDataList: product[] = JSON.parse(data)
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id

      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

      delete cartData.id;
      setTimeout(() => {
        this.product.addTocart(cartData).subscribe((result) => {
          if (result) {
            console.log("Item Store In DB");
          }
        })
        if (cartDataList.length === index+1) {
          localStorage.removeItem('localCart')
        }
      }, 500)
    })
  }
}

}