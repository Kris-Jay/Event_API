import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../events.service';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
   eventData: any = null;
   favorites:Favorite[]=[]
   constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute
  ) {}

 
  ngOnInit(): void {
    this.favorites=this.eventsService.getFavorites()
    this.route.queryParamMap.subscribe((response) => {
      let queryParams = response;
      this.eventsService
        .getEvents(queryParams.get('term'))
        .subscribe((response) => {
          console.log(response);
          this.eventData = response;
          this.setFavorites(this.favorites, this.eventData);
        });
    });

  }

  toggleFavorite=(favorite:Favorite):void=>{
    this.eventsService.editFavorites(favorite);
    this.favorites = this.eventsService.getFavorites();
    this.setFavorites(this.favorites, this.eventData);

  }

  setFavorites=(favorites:Favorite[],eventData:any)=>{
    eventData._embedded.events.forEach((item)=>{
      let booleanValue = favorites.some((favorite)=>{
        return  item.id === favorite.id ;
      });
      if(booleanValue){
        item.favorite = true;
      }else{
        item.favorite=false;
      }
    })
    console.log(eventData);
   
    
  }
}
