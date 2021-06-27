import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  videoPosters = [
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/bedardi-se-pyar-ka-sahara-na-mila-status.jpg"
  ]
  constructor() { }

  ngOnInit() {
  }

}
