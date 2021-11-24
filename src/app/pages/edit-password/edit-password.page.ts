import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit {
  AccountID: any;
  CurrentPassword:any;
  NewPassword:any;
  RetypeNewPassword:any;
  current:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _apiService: ApiService,
    public http:HttpClient,
    private alertController: AlertController
  ) 
  { 
    this.route.params.subscribe((param: any)=>{
      this.AccountID = param.AccountID;
      console.log(this.AccountID);
      this.getAccount(this.AccountID); 
    })
  }

  ngOnInit() {
  }
  getAccount(AccountID)
  {
    this._apiService.getAccount(AccountID).subscribe((res: any)=>{
      console.log('SUCESS');
    },(err: any)=>{
      console.log('ERROR',err);
    }
    )
  }
  updatePassword(){
    let data = {
      Password:this.NewPassword,
      CurrentPassword:this.CurrentPassword
    }
    this._apiService.getAccount(this.AccountID).subscribe((res: any)=>{
      let customer_information = res[0];
        if(this.NewPassword==this.RetypeNewPassword && this.CurrentPassword==customer_information.Password){
          this._apiService.Reset(this.AccountID,data).subscribe((res: any)=>{
          console.log('SUCESS');
        this.successAlert();
       this.NewPassword='';
       this.RetypeNewPassword='';
       this.CurrentPassword='';
      },(err: any)=>{
        console.log('ERROR',err);
      })
        }else if(this.NewPassword==this.RetypeNewPassword && this.CurrentPassword != customer_information.Password){
        this.errorAlert();
          this.NewPassword='';
          this.CurrentPassword='';
          this.RetypeNewPassword='';
          console.log('ERROR');
        }else if(this.NewPassword!=this.RetypeNewPassword && this.CurrentPassword == customer_information.Password){
          this.errorAlert1();
            this.NewPassword='';
            this.CurrentPassword='';
            this.RetypeNewPassword='';
            console.log('ERROR');
          }
          else{
            this.errorAlert2();
            this.NewPassword='';
            this.CurrentPassword='';
            this.RetypeNewPassword='';
            console.log('ERROR');
          }
     
    },(err: any)=>{
      console.log('ERROR',err);
    }
    )
   
  }
  TP(){
    this.router.navigate(['termsand-conditions',this.AccountID]) 
  }
  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      message: 'Changes has been saved!',
      buttons: [
        {
          text: 'OK',
          handler: ()=>{
            this.router.navigate(['profile',this.AccountID]) 
          }
        }
      ]      
    });
    await alert.present();
  }
  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Current Password does not match the password',
      buttons: [
        {
          text: 'OK',
         
        }
      ]      
    });
    await alert.present();
  }
  async errorAlert1() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Please make sure your passwords match',
      buttons: [
        {
          text: 'OK',
         
        }
      ]      
    });
    await alert.present();
  }
  async errorAlert2() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Passwords does not match',
      buttons: [
        {
          text: 'OK',
         
        }
      ]      
    });
    await alert.present();
  }
  async discardAlert() {
    const alert = await this.alertController.create({
      header: 'Edit Info',
      message: 'Discard changes?',
      buttons: [
        {
          text: "Cancel",
          handler: () =>{
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.router.navigate(['profile',this.AccountID]);
          }
        }
      ]
    });
    await alert.present();
  }
  editProfile(){
    this.router.navigate(['edit-profile',this.AccountID])
  }
  editPassword(){
    this.router.navigate(['edit-password',this.AccountID])
  }

}
