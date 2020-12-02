import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  eventData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  search = (term: string) => {
    this.router.navigate(['/events-list'], {
      queryParams: {
        term: term,
      },
    });
  };
}
