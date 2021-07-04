import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public router: Router
  ) { }

  upload() {
    this.router.navigate(['/login']);
    // this.router.navigate(['/upload']);
  }

}
