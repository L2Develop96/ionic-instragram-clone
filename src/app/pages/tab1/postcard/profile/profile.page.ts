import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PostService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/_interfaces/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  profilePic: string;
  imagesList: Array<Post> = [];

  loadingImg = '../../assets/imgs/loading.gif';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.firstName = this.route.snapshot.queryParams.firstName;
    this.lastName = this.route.snapshot.queryParams.lastName;
    this.userName = this.route.snapshot.queryParams.userName;
    this.profilePic = this.route.snapshot.queryParams.pic;
    this.getPosts();
  }


  async goback() {
    await this.navCtrl.navigateBack('/tabs/tab1');
  }

  getPosts() {
    this.postService.loadImages(Math.floor(Math.random() * 99) + 1) // generating a random number btw 1 - 99
      .subscribe((res: Post[]) => {
        res.forEach((post) => {
          this.imagesList.push(post);
        });
      });
  }
}
