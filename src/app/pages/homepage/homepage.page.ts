import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  AccountID: any;
  dataitem:any;
  dataitems:any;
  
 
  
  constructor
    (
    private router: Router,
    private route: ActivatedRoute,
    public _apiService: ApiService,
    private alertController: AlertController,
    public http:HttpClient,
    )
    {
    this.route.params.subscribe((param: any)=>{
      this.AccountID = param.AccountID;
      console.log(this.AccountID);
      this.getAccount(this.AccountID);
      this.loaddata(this.AccountID);
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
  loaddata(id:number){
    let postData=JSON.stringify({
      accountID:id
    });
    let url="http://localhost/grocery-app/backend/homepage.php";
    this.http.post(url,postData)
    .subscribe(
      data=>{
        if(data!=null){
        this.dataitem=data;
       
        }
      },error=>{
          console.log("Load Fail")
      }
    );
  }

 

 
  
 
  storePage(id:number,name:any,address:any,image:any,contact:any,oh:any,mc:any){
    this.router.navigate(['store',this.AccountID,{StoreID:id,StoreName:name,StoreAddress:address,Image:image,ContactNo:contact,OpenHours:oh,maximum_cust:mc}])
  }


  homepagePage(){
    this.router.navigate(['homepage',this.AccountID])
  }

  suggestedPage(){
    this.router.navigate(['suggested-store',this.AccountID])
  }

  recentsPage(){
    this.router.navigate(['recents',this.AccountID])
  }

  favoritesPage(){
    this.router.navigate(['favorites',this.AccountID])
  }

  profilePage(){
    this.router.navigate(['profile',this.AccountID])
  }
  search(){
    this.router.navigate(['search',this.AccountID])
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: "Cancel",
          handler: () =>{
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.router.navigate(['mainscreen']);
          }
        }
      ]
    });
    await alert.present();
  }

  
  

}
