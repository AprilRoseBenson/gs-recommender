import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.page.html',
  styleUrls: ['./forgotpw.page.scss'],
})
export class ForgotpwPage implements OnInit {
  data: any={};
  accountID: number;
  accounts: any=[];
  constructor(
    public navCTrl: NavController,
    public http: HttpClient,
    public alrt: AlertController
  )
  {
    this.data.EmailAddress='' ;
  }

  ngOnInit() {
  }
  CheckGmail(){
    if(this.data.EmailAddress !==''){
      console.log('Email: ',this.data.EmailAddress)
      let url:string='http://localhost/grocery-app/backend/getEmail.php';
      let dataPost= JSON.stringify({
                email:this.data.EmailAddress

      });
      this.http.post(url,dataPost)
      .pipe(
        map((res: Response)=>res))
      .subscribe(data =>{
        if(data !=null){
         this.accountID=data[0].AccountID;
         this.navCTrl.navigateForward(['/resetpassword',this.accountID]);
        }
        else{
          this.presentAlert();
          this.data.EmailAddress='';
        }
     
      });
    }
    else{
      console.log('Enter email');
    }
  }
  async presentAlert() {
    const alert = await this.alrt.create({
    subHeader: 'No matches email address',
    buttons: ['Ok']
   });
   await alert.present();
}

}
