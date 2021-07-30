import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './home.page';

import { Tab1PageRoutingModule } from './home-routing.module';
import { PostcardComponent } from './postcard/postcard.component';
import { ProfilePage } from './postcard/profile/profile.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [Tab1Page, PostcardComponent, ProfilePage]
})
export class Tab1PageModule { }
