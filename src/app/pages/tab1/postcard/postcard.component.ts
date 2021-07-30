import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { Result, User } from 'src/app/_interfaces/user';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss'],
})
export class PostcardComponent implements OnInit {

  usersList: Array<User> = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.postService.loadUsers(1)
      .subscribe((res: Result) => {
        res.results.forEach((user) => {
          this.usersList.push(user);
        });
      });
  }
}
