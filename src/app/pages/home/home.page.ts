import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public gs: GlobalService,
    public api: ApiService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  goVideoSlides() {
    this.router.navigate(['/video-slides']);
    // this.router.navigate(['/video-slides'], { queryParams: { item: JSON.stringify(item) } });
  }

  loadData(event) {
    console.log("event", event);

    let body = {
      language_id: "",
      start: this.gs.homeVideos.length,
    }
    console.log("event????", this.gs.homeVideos.length);
    this.api.post('getHomePageVideoList', body).then((res) => {
      if (res['ResponseCode'] == 1) {
        this.gs.homeVideos = this.gs.homeVideos.concat(res['ResultData'])
        console.log("this.gs.homeVideos>>>>", this.gs.homeVideos);
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

}
