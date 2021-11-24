import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  AccountID: any;
  CustomerName : any;
  CustomerAddress : any;
  Age : any;
  Gender : any;
  ContactNo : any;

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
      let customer_information = res[0];
      this.CustomerName = customer_information.CustomerName;
      this.CustomerAddress = customer_information.CustomerAddress;
      this.Age = customer_information.Age;
      this.Gender = customer_information.Gender;
      this.ContactNo = customer_information.ContactNo;
    },(err: any)=>{
      console.log('ERROR',err);
    }
    )
  }

  updateProfile(){
    let data = {
      CustomerName: this.CustomerName,
      CustomerAddress: this.CustomerAddress,
      Age: this.Age,
      Gender: this.Gender,
      ContactNo: this.ContactNo,
    }
    this._apiService.updateProfile(this.AccountID,data).subscribe((res:any) => {
      console.log("SUCCESS",res);
      this.successAlert();
    },(err:any) => {
      console.log("ERROR",err);
    })
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Edit Info',
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
  TP(){
    this.router.navigate(['termsand-conditions',this.AccountID]) 
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
