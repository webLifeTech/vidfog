import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileFeed: any = 'myvideo';
  allMyVideos: any = {};
  dataStart: any = 0;
  constructor(
    public alertController: AlertController,
    public gs: GlobalService,
    public api: ApiService,
    public router: Router,
  ) {
    if (this.gs.userData && this.gs.userData.user_id) {
      this.getMyVideos();
    }
  }

  ngOnInit() {
  }

  getMyVideos() {
    console.log("this.userData", this.gs.userData);
    let body = {
      user_id: this.gs.userData.user_id,
      start: this.dataStart
    }
    console.log("body>>>>", body);
    this.api.post('getMyVideos', body).then((res) => {
      console.log("getMyVideos>>>>", res);
      if (res['ResponseCode'] == 1) {
        this.allMyVideos = res['ResultData'];
        console.log("this.allCategoryList>>>>", this.allMyVideos);
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }

  goProfile() {
    if (this.gs.userData && this.gs.userData.user_id) {
      // this.router.navigate(['/upload']);
      // this.router.navigate(['/login']);
    } else {
    }
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Alert !',
      message: 'Are you sure you want to unfavourite',
      mode: 'ios',
      cssClass: 'alert_ctrl',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Unfavourite',
          cssClass: 'danger-btn',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  editProfile() {
    this.router.navigate(['/login']);
  }

}
