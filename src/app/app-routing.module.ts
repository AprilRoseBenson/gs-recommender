import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',redirectTo: 'mainscreen',pathMatch: 'full'},
 
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'mainscreen',
    loadChildren: () => import('./pages/mainscreen/mainscreen.module').then( m => m.MainscreenPageModule)
  },
  {
    path: 'forgotpw',
    loadChildren: () => import('./pages/forgotpw/forgotpw.module').then( m => m.ForgotpwPageModule)
  },
  
  
  {
    path: 'homepage/:AccountID',
    loadChildren: () => import('./pages/homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'store/:AccountID',
    loadChildren: () => import('./pages/store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'recents/:AccountID',
    loadChildren: () => import('./pages/recents/recents.module').then( m => m.RecentsPageModule)
  },
  {
    path: 'profile/:AccountID',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  

  {
    path: 'resetpassword/:AccountID',
    loadChildren: () => import('./pages/resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'edit-profile/:AccountID',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'suggested-store/:AccountID',
    loadChildren: () => import('./pages/suggested-store/suggested-store.module').then( m => m.SuggestedStorePageModule)
  },
  {
    path: 'search/:AccountID',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'edit-password/:AccountID',
    loadChildren: () => import('./pages/edit-password/edit-password.module').then( m => m.EditPasswordPageModule)
  },
  {
    path: 'termsand-conditions/:AccountID',
    loadChildren: () => import('./pages/termsand-conditions/termsand-conditions.module').then( m => m.TermsandConditionsPageModule)
  },









  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
