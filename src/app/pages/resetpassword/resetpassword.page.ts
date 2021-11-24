import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  AccountID: any;
  Password: any;
  ConfirmPassword: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    public alrt: AlertController,
    private toastCtrl:ToastController
  ) {
    this.route.params.subscribe((param: any)=>{
      this.AccountID = param.AccountID;
      console.log(this.AccountID);
      this.getAccount(this.AccountID);
    })
   }

  ngOnInit() {
  }
  getAccount(AccountID){
    this._apiService.getAccount(AccountID).subscribe((res: any)=>{
      console.log('SUCESS');
    },(err: any)=>{
      console.log('ERROR',err);
    }
    )
    
    }
    Reset(){
      let data = {
        Password:this.Password,
      }
      this._apiService.Reset(this.AccountID,data).subscribe((res: any)=>{
        if(this.Password==this.ConfirmPassword){
        console.log('SUCESS');
        this.successAlert();
       this.router.navigateByUrl('/login');
        }else{
          this.presentAlert();
          this.ConfirmPassword='';
        }
      },(err: any)=>{
        console.log('ERROR',err);
      })
    }
    async presentAlert() {
      const alert = await this.alrt.create({
      subHeader: 'Password confirmation does not match the password',
      buttons: ['Ok']
     });
     await alert.present();
    }
    async successAlert() {
      let toast =await this.toastCtrl.create({
        header:'Password has been changed!',
        duration:2000,
        color: 'light'    });
      toast.present();
      
    }

}
