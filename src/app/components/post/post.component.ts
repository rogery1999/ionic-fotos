import { Component, Input } from '@angular/core';
import { IPost } from '../../services/post/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export default class PostComponent {

  @Input() post: IPost = {};
  opt = {
    scrollbar: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      hiddenClass: '.swiper-pagination-hidden'
    }
  };

  optOnly = {
    allowTouchMove: false
  };

  constructor() { }
}
