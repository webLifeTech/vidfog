import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {

  constructor(
    public gs: GlobalService,
    public api: ApiService,
  ) { }

  ngOnInit() {
  }

  getCetegory() {
    let body = {
      language_id: String(this.gs.selectedLang),
      start: 0,
    }
    this.api.post('getCategoryList', body).then((res) => {
      if (res['ResponseCode'] == 1) {
        // this.allCategoryList = res['ResultData'];
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

}
