import { Component } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService, private router:Router){}
  showLogin=false;
  authError:string='';
  ngOnInit():void{
    this.seller.reloadSeller()
  }
signUp(data:signUp):void{
  console.log(data)
this.seller.userSignUp(data)
}
login(data:signUp):void{
  this.authError=""
  // console.log(data)
  this.seller.userLogin(data)
  this.seller.isLoginError.subscribe((isError)=>{
    if(isError){
      this.authError="Email or password is not correct"

    }
  })
  }
  openLogin(){
this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false
  }


}
