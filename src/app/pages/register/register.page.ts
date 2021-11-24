import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  CustomerName: any;
  CustomerAddress: any;
  Age: any;
  Gender: any;
  ContactNo: any;
  Username: any;
  EmailAddress: any;
  Password: any;
  alertCtrl: any;
  data: any;
  isTermsAccepted= false;
  

  constructor(
    private alertController: AlertController,
    private router: Router,
    public http:HttpClient,
  public _apiService: ApiService
  
  ) { }
  TermsandCondtions(){
    this.isTermsAccepted= !this.isTermsAccepted;
  }
async tp(){
    const alert = await this.alertController.create({
      header:'Agreement to Terms',
      subHeader: 'Last Updated: October 25, 2021',
     message: '<div class="c-no-margin">' +
    '<p   >These Terms and Conditions constitute a legally binding agreement made between you, the Customer (whom we refer as “you”, “your” or the “Customer” in this application) concerning your access to and use of our mobile application (the Grocery Store Recommender App).  You agree that by accessing this Application, you have read, understood, and agree to be bound by all of these Terms and Conditions Use. As such, information collected from this application   shall be held in strict confidence and shall only be used solely for records keeping purposes.</p><p>IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE APPLICATION AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p> <p>The Application is intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Application. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Application.</p>' +
      '</div>',
      buttons: ['OK'],
     
  
      });
     await alert.present();
  }
  async dp(){
    const alert = await this.alertController.create({
      header:'Data Policy',
      subHeader: 'Last Updated: October 25, 2021',
     message: '<div class="c-no-margin">' +
    '<p   >Per Section 2 (Declaration of Policy) of the Data Privacy Act of 2012, it is the policy of the State to protect the fundamental human right of privacy, of communication while ensuring the free flow of information to promote innovation and growth. The State recognizes the vital role of information and communication technology in nation-building and its inherent obligation to ensure the personal information and communications system in the government and in the private sector are secured and protected..</p>' +
      '</div>',
      buttons: ['OK'],
     
  
      });
     await alert.present();
  }
  
  async AddAccount() {
    if(this.CustomerName == null || this.CustomerAddress == null || this.Age == null || this.Gender == null || this.ContactNo == null || this.Username == null || this.EmailAddress == null || this.Password == null){
      console.log("All fields are required")
     
        const alert = await this.alertController.create({
          cssClass: 'basic-alert',
          header: 'Sign Up',
          subHeader: 'All fields are required!',
          buttons: ['Try Again']
        });
    
        await alert.present();
      
    }
    else if(this.CustomerName !== '' && this.CustomerAddress !== '' && this.Age !== '' && this.Gender !== '' && this.ContactNo !== '' && this.Username !== '' && this.EmailAddress !== '' && this.Password !== ''){
      console.log("CustomerName:", this.CustomerName);
      console.log("CustomerAddress:", this.CustomerAddress);
      console.log("Age:", this.Age);
      console.log("Gender:", this.Gender);
      console.log("ContactNo:", this.ContactNo);
      console.log("Username:", this.Username);
      console.log("EmailAddress:", this.EmailAddress);
      console.log("Password:", this.Password);
      let url:string='http://localhost/grocery-app/backend/create.php';
      let data= JSON.stringify({
        CustomerName: this.CustomerName,
        CustomerAddress: this.CustomerAddress,
        Age: this.Age,
        Gender: this.Gender,
        ContactNo: this.ContactNo,
        Username: this.Username,
        EmailAddress: this.EmailAddress,
        Password: this.Password,

      });
      this.http.post(url,data)
      .pipe(
        map((res: Response)=>res))
      .subscribe(data =>{
        if(data !=null){
          this.successAlert();
        }
        else{
        this.FailPopup();
        }
      });
    }
 
   
  }
  
  cancel(){
    this.router.navigate(['mainscreen'])
  }
  login(){
    this.router.navigate(['login'])
  }

async successAlert() {
  const alert = await this.alertController.create({
    header: 'Registered Successfully! ',
    message: 'Do you want to proceed?',
    buttons: [
      {
        text: 'Yes',
        handler: ()=>{
          this.router.navigate(['\login']) 
        }
      }, {
        text: 'No',
        role: 'cancel',
        handler: ()=>{
          this.CustomerName='';
          this.CustomerAddress='';
          this.Age='';
          this.Gender='';
          this.ContactNo='';
          this.Username='';
          this.EmailAddress='';
          this.Password='';
          this.isTermsAccepted= false;
        }
      }
    ]      
  });
  await alert.present();
}
async FailPopup() {
  const alert = await this.alertCtrl.create({
  header: 'Error',
  subHeader: 'All fields are required!',
  buttons: ['Try Again']

  });
 await alert.present();
}

customPopoverOptions: any = {  

  }; 

customPopoverOptions2: any = {  

  };  

}