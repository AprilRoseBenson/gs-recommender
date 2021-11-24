import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  AccountID: any;
  StoreID: any;
  StoreName: any;
  StoreAddress: any;
  Image: any;
  ContactNo: any;
  OpenHours: any;
  maximum_cust:any;
  postdata: any={};
  dataitem:any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    public _apiService: ApiService,
    public http:HttpClient)
     {
    this.route.params.subscribe((param: any)=>{
      this.AccountID = param.AccountID;
      this.getAccount(this.AccountID);
     
       //Store Page//
     this.StoreID=param.StoreID;
     this.StoreName=param.StoreName;
     this.StoreAddress=param.StoreAddress;
     this.Image=param.Image;
     this.ContactNo=param.ContactNo;
     this.OpenHours=param.OpenHours;
     this.maximum_cust=param.maximum_cust;
     this.postdata.id=this.StoreID;
     this.postdata.name=this.StoreName;
     this.postdata.add=this.StoreAddress;
     this.postdata.image=this.Image;
     this.postdata.contact=this.ContactNo;
     this.postdata.oh=this.OpenHours;
     this.postdata.max_cust=this.maximum_cust;
     this.loaddata(this.StoreID);
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
      StoreID:id
    });
    let url="http://localhost/grocery-app/backend/getCustomerCount.php";
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
  storePage(){
    this.router.navigate(['storePage',this.AccountID])
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
}
