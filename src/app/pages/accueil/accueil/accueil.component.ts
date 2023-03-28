import {Component, OnInit} from '@angular/core';
import NewsDTO from "../../../services/pacifista-api/news/dtos/NewsDTO";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  playersAmount: number = 0;
  newsList: NewsDTO[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
