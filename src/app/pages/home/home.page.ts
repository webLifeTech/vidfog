import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // videoPosters = [
  //   "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
  //   "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
  //   "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
  //   "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
  //   "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
  //   "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
  //   "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
  //   "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg"
  // ]
  constructor(
    public gs: GlobalService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  goVideoSlides() {
    this.router.navigate(['/video-slides']);
    // this.router.navigate(['/video-slides'], { queryParams: { item: JSON.stringify(item) } });
  }

}
