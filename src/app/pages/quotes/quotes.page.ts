import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  allQuotCatList: any = [];
  allQuotesList: any = [];
  constructor(
    public gs: GlobalService,
    public api: ApiService,
  ) {
    this.getCetegory();
  }

  ngOnInit() {
  }

  segmentChanged(event) {
    this.allCatQuotesList(event.target.value)
    console.log("eventeventeventeventeventeventeventeventeventevent");
  }

  getCetegory() {
    let body = {
      language_id: String(this.gs.selectedLang),
      start: 0,
    }
    this.api.Qpost('getCategoryList', body).then((res) => {
      if (res['ResponseCode'] == 1) {
        this.allQuotCatList = res['ResultData'];
        console.log("body>>>>", this.allQuotCatList);
        this.allCatQuotesList(this.allQuotCatList[0].category_id)
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

  allCatQuotesList(category_id) {
    let body = {
      category_id: category_id,
      language_id: String(this.gs.selectedLang),
      start: 0,
    }
    this.api.Qpost('getQuotesList', body).then((res) => {
      console.log("allQuotesList>>>>", res);

      if (res['ResponseCode'] == 1) {
        this.allQuotesList = res['ResultData'];
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

}
