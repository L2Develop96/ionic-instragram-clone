/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController, PopoverController } from '@ionic/angular';
import { PostService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/_interfaces/post';
import { Result, User } from 'src/app/_interfaces/user';
import { SharingComponent } from './sharing/sharing.component';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss'],
})
export class PostcardComponent implements OnInit {

  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;
  usersList: Array<User> = [];
  imagesList: Array<Post> = [];
  combinedArrays: { user: User; post: Post }[] = [];
  page = 1;
  loadingImg = '../assets/imgs/loading2.gif';


  constructor(
    private postService: PostService,
    private popoverController: PopoverController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getUser(false, '');
  }

  getUser(isFirstLoad, eventName) {
    this.getPosts();
    this.postService.loadUsers(this.page)
      .subscribe((res: Result) => {
        if (res.results.length) {
          res.results.forEach((user) => {
            this.usersList.push(user);
          });
          this.combinedArrays = [];
          this.usersList.forEach((userr, index) => {
            this.combinedArrays.push({ user: userr, post: this.imagesList[index] });
          });
          if (isFirstLoad) {
            eventName.target.complete();
          }
          this.page++;
        } else {
          if (this.infiniteScroll) {
            this.infiniteScroll.disabled = true;
          }
        }

      });
  }

  async doInfinite(event) {
    this.getUser(true, event);
  }

  getPosts() {
    this.postService.loadImages(this.page)
      .subscribe((res: Post[]) => {
        res.forEach((post) => {
          this.imagesList.push(post);
        });
      });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.combinedArrays = [];
      this.imagesList = [];
      this.usersList = [];
      this.page = 0;
      if (this.infiniteScroll) {
        this.infiniteScroll.disabled = false;
      }
      this.getUser(false, '');
      event.target.complete();
    }, 2000);
  }

  async presentSharing() {
    const popover = await this.popoverController.create({
      component: SharingComponent,
      mode: 'ios',
      translucent: true,
    });
    return await popover.present();
  }

  navigateToProfile(id, data) {
    this.navCtrl.navigateForward(['/tabs/tab1/profile', id], { queryParams: { firstName: data.name.first, lastName: data.name.last, userName: data.login.username, pic: data.picture.large } });
  };
}
