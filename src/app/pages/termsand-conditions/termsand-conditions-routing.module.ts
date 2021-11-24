import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsandConditionsPage } from './termsand-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsandConditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsandConditionsPageRoutingModule {}
