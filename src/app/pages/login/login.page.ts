import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data: any={};
  accountID: number;
  accounts: any=[];

  constructor(private router: Router, 
              public navCtrl: NavController,
              public http: HttpClient,
              public alertCtrl: AlertController) { 

                this.data.EmailAddress="";
                this.data.Password="";

              }

  ngOnInit() {
  }
  homePage(){
    this.router.navigate(['home'])
  }
  forgot(){
    this.router.navigate(['forgotpw'])
  }
 register(){
    this.router.navigate(['register'])
  }

  Login(){
    if(this.data.EmailAddress !=='' && this.data.Password !==''){
      console.log('Email: ',this.data.EmailAddress)
      console.log('Password: ',this.data.Password)
      let url:string='http://192.241.145.200/grocery-app/backend/login.php';
      let dataPost= JSON.stringify({
                email:this.data.EmailAddress,
                pass:this.data.Password

      });
      this.http.post(url,dataPost)
      .pipe(
        map((res: Response)=>res))
      .subscribe(data =>{
        if(data !=null){
         this.accountID=data[0].AccountID;
         this.navCtrl.navigateForward(['/homepage',this.accountID]);
        }
        else{
          this.FailPopup();
          this.data.EmailAddress='';
          this.data.Password='';
        }
     
      });
    }
    
  }
  async FailPopup() {
    const alert = await this.alertCtrl.create({
    header: 'Sign In',
    subHeader: 'Incorrect email or password!',
    buttons: ['Ok']
   });
   await alert.present();
  }
  async SuccessPopup() {
    const alert = await this.alertCtrl.create({
    header: 'Sign In',
    subHeader: 'Login Successful!',
    buttons: ['Ok']
   });
   await alert.present();
  }


}
 