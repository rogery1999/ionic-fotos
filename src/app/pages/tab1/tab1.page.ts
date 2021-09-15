import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/services/post/post.interface';
import PostService from 'src/app/services/post/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  posts: IPost[];
  postSubscription: Subscription;
  postsSubscription: Subscription;

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postsSubscription = this.postService.getPosts().subscribe(
      ({posts}) => {
        this.posts = [...posts.data];
      }
    );

    this.postSubscription = this.postService.getPost().subscribe(
      (post) => this.posts.unshift({...post})
    );
  }

  ngOnDestroy(): void{
    this.postSubscription.unsubscribe();
    this.postsSubscription.unsubscribe();
  }

  loadData(e: any){
    this.postService.getPosts().subscribe(
      ({posts}) => {
        if(posts.length !== 0){
          this.posts.push(...posts.data);
          this.infiniteScroll.complete();
        }else{
          this.infiniteScroll.disabled = true;
        }
      }
    );
  }

  doRefresh(e: any){
    this.postService.getPosts(1).subscribe(
      ({posts}) => {
        this.posts = [...posts.data];
        e.target.complete();
        this.infiniteScroll.disabled = false;
      }
    );
  }
}
