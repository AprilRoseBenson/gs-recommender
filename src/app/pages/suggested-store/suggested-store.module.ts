import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestedStorePageRoutingModule } from './suggested-store-routing.module';

import { SuggestedStorePage } from './suggested-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestedStorePageRoutingModule
  ],
  declarations: [SuggestedStorePage]
})
export class SuggestedStorePageModule {}
