import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { createPipeType } from '@angular/compiler/src/render3/r3_pipe_compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { NgxQrcodeElementTypes } from 'ngx-qrcode2';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  AccountID: any;
  dataitem: any;
  qrData=null;
  createdCode=null;
  elementType =NgxQrcodeElementTypes.CANVAS;
  Image:any;
  public defaultInputBox: boolean = false;
  public button: boolean =true;
  constructor(private router: Router,
              private route: ActivatedRoute,
              public _apiService: ApiService,
              public http:HttpClient,
              private alertController: AlertController,
              private navCtrl: NavController,
              private base64ToGallery:Base64ToGallery,
              private toastCtrl:ToastController,
              private photoLibrary: PhotoLibrary)
  {
    this.route.params.subscribe((param: any)=>{
      this.AccountID = param.AccountID;
      console.log(this.AccountID);
      this.getAccount(this.AccountID);
      this.createCode();
    })
    
  }
 
  showChange(){
    this.defaultInputBox = true;
    this.button=false;
  }

  ngOnInit() {
  }
  selectedFile(event){
    this.Image=event.target.files[0];
    const formData=new FormData();
    formData.append('Image',this.Image);
    formData.append('AccountID',this.AccountID);
   
  
    this.http.post('http://localhost/grocery-app/backend/UploadPhoto.php',formData).subscribe((response:any)=>{
    console.log(response);
    this.getAccount(this.AccountID);
    this.successAlert();
 
    });
  }
  updateProfile(){
    let data = {
      Image: this.Image,
     
    }
    this._apiService.updatePhoto(this.AccountID,data).subscribe((res:any) => {
      console.log("SUCCESS",res);
    
    },(err:any) => {
      console.log("ERROR",err);
    })
  }
  createCode(){
    this.qrData=this.AccountID;
    this.createdCode=this.qrData;
  }
  downloadQR(){
  const canvas=document.querySelector('canvas') as HTMLCanvasElement;
    const imageData=canvas.toDataURL('image/jpeg').toString();
    console.log('data: ',imageData)
    let data=imageData.split(',')[1];
    this.base64ToGallery.base64ToGallery(data,
      {prefix: '_img',mediaScanner:true})
      .then (async res =>{
        let toast =await this.toastCtrl.create({
          header:'QR Code saved in your Gallery',
          duration:2000,
          color: 'light'         });
        toast.present();
      },err =>console.log('err: ',err)
      );
    
  }
  getAccount(AccountID){
    this._apiService.getAccount(AccountID).subscribe((res: any)=>{
      console.log('SUCESS');
      this.dataitem = res;
      this.defaultInputBox = false;
      this.button=true;
    },(err: any)=>{
      console.log('ERROR',err);
    }
    )
  }
  
  async successAlert() {
    let toast =await this.toastCtrl.create({
      header:'Your profile picture was updated',
      duration:2000,
      color: 'light'    });
    toast.present();
    
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

  editPage(){
    this.router.navigate(['edit-profile',this.AccountID])
  }

}
