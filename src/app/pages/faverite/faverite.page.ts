import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-faverite',
  templateUrl: './faverite.page.html',
  styleUrls: ['./faverite.page.scss'],
})
export class FaveritePage implements OnInit {

  constructor(
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }

}
