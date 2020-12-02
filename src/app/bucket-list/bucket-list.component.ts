import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css'],
})
export class BucketListComponent implements OnInit {
  favorites: Favorite[] = [];
  moreInfo = false;
  showIndex: number = -1;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites = () => {
    this.favorites = this.eventsService.getFavorites();
  };

  toggleFavorite = (favorite: Favorite): void => {
    this.eventsService.editFavorites(favorite);
  };

  setShowIndex = (index: number) => {
    if (this.showIndex === index) {
      this.showIndex = -1;
    } else {
      this.showIndex = index;
    }
  };
}
