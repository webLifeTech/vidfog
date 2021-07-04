import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  allCategoryList: any = [];
  constructor(
    public gs: GlobalService,
    public api: ApiService,
  ) {
    this.getCetegory();
  }

  ngOnInit() {
  }

  getCetegory() {
    this.api.post('getCategoryList', '').then((res) => {
      console.log("res>>>>", res);
      if (res['ResponseCode'] == 1) {
        this.allCategoryList = res['ResultData'];
        console.log("this.allCategoryList>>>>", this.allCategoryList);
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

}
