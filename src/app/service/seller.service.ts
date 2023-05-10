import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError=new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller',
      data,
      {
        observe: 'response'
      }).subscribe((res) => {
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('seller', JSON.stringify(res.body))
        this.router.navigate(['seller-home'])

      })

  }
  reloadSeller() {
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:login) {
    console.log(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{ observe:'response'}).subscribe((res:any)=>{
        if (res && res.body && res.body.length) {
          console.log("user logged in")
          localStorage.setItem('seller',JSON.stringify(res.body))
          this.router.navigate(['seller-home'])
        }
        else {
          console.log("login failed")
          this.isLoginError.emit(true)
        }
      })
  }
}
