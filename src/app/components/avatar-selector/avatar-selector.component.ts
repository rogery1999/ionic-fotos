import { Component, EventEmitter, Input, Output, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit, AfterViewInit {

  @Input() avatars = [];
  @Input() default: string;
  @Output() selectionChange = new EventEmitter<string>();
  @ViewChild(IonSlides) ionSlides: IonSlides;
  positionDefault: number;

  avatarsOptions = {
    slidesPerView: 3.5
  };

  constructor() { }

  ngOnInit(): void {
    if(!this.default){
      this.avatars[0].seleccionado = true;
      this.default = {...this.avatars[0].img};
    }else{
      this.avatars.forEach((item, index) => {
        if(item.img === this.default){
          item.seleccionado = true;
          this.positionDefault = index;
        }else{
          item.seleccionado = false;
        }
      });
    }
  }

  ngAfterViewInit(): void{
    this.ionSlides.slideTo(this.positionDefault, 1);
  }

  seleccionarAvatar(avatar: ({img: string; seleccionado: boolean})){
    this.avatars.forEach((item) => item.seleccionado = false);
    avatar.seleccionado = true;
    this.selectionChange.emit(avatar.img);
  }
}
