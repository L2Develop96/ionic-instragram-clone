/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  loadUsers(page: number) {
    console.log(page);
    return this.http.get(`https://randomuser.me/api/?page=${page}&results=10&seed=feed`)
  }

  loadImages(page: number) {
    console.log(page);
    return this.http.get(`https://picsum.photos/v2/list?page=${page}&limit=10`)
  }
}
