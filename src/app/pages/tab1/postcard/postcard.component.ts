import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PostService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/_interfaces/post';
import { Result, User } from 'src/app/_interfaces/user';

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

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getUser(false, '');
    console.log(this.usersList);
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
          console.log(this.combinedArrays);
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
}
