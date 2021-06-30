import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  constructor(
    public gs: GlobalService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  goVideoSlides() {
    this.router.navigate(['/video-slides']);
    // this.router.navigate(['/video-slides'], { queryParams: { item: JSON.stringify(item) } });
  }

}
