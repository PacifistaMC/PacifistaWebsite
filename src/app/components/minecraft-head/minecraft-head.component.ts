import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'minecraft-head',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './minecraft-head.component.html',
  styleUrl: './minecraft-head.component.scss'
})
export class MinecraftHeadComponent {

  @Input() username: string = '';
  @Input() size: number = 100;

}
