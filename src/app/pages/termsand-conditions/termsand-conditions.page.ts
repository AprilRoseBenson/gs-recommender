import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-termsand-conditions',
  templateUrl: './termsand-conditions.page.html',
  styleUrls: ['./termsand-conditions.page.scss'],
})
export class TermsandConditionsPage implements OnInit {
  AccountID: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _apiService: ApiService
  ) { 
    this.route.params.subscribe((param: any)=>{
      this.AccountID = param.AccountID;
      console.log(this.AccountID);
      this.getAccount(this.AccountID); 
    
    })
    
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

  ngOnInit() {
  }
 TP(){
    this.router.navigate(['edit-profile',this.AccountID])
  }
}
