import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
store:any;
lists:any[];
AccountID: any;
dataitem:any;
  constructor(public _apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    public http:HttpClient) 
    {
      this.route.params.subscribe((param: any)=>{
        this.AccountID = param.AccountID;
        console.log(this.AccountID);
       
      // this.suggestdata(this.AccountID);
      })
      this.loaddata();
  
     }

  ngOnInit() {
    
  }
  search(ev:any)
{
  
  const val = ev.target.value;
 if(val && val.trim() != '')
 {
  
this.store = this.store.filter((stores)=>{
return(stores.StoreName.toLowerCase().indexOf(val.toLowerCase()) > -1);
});
 }
 else{
  this.loaddata();
 }

}
  
loaddata(){
  this._apiService.getSearch()
  .subscribe(list=>{
console.log(list);
    this.store=list;
  });
  
}
suggestdata(id:number){
 
  let postData=JSON.stringify({
    accountID:id
  });
  let url="http://localhost/grocery-app/backend/suggest.php";
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

back() {
          this.router.navigate(['homepage',this.AccountID]);
        
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
