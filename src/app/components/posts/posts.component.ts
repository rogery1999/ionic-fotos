import { Component, Input } from '@angular/core';
import { IPost } from 'src/app/services/post/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export default class PostsComponent {

  @Input() posts: IPost[] = [];

  constructor() { }

}
