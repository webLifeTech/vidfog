import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { GlobalService } from './services/global.service';
import { Network } from '@ionic-native/network/ngx';
import { File } from '@ionic-native/file/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ApiService } from './services/api.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  alertInShown: boolean = true;
  internetPopup: any;

  constructor(
    private platform: Platform,
    private _location: Location,
    private uniqueDeviceID: UniqueDeviceID,
    private file: File,
    public network: Network,
    private alertCtrl: AlertController,
    private menutCtrl: MenuController,
    public gs: GlobalService,
    public appVersion: AppVersion,
    public router: Router,
    public api: ApiService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/tabs/home')) {
        navigator['app'].exitApp();
        processNextHandler();
      } else {
        this._location.back();
      }
    });

    this.platform.ready().then((res) => {
      if (this.network.type == 'none') {
        if (!this.alertInShown) {
          this.internetNotConnect();
        }
      }
      this.listenConnection();
      this.createUserProfile();
      this.getAppDetail();
      this.gs.getLanguageList();
      this.file.createDir(this.file.externalRootDirectory, '4k Video Status', true)
        .then((result) => { })
        .catch((err) => { });
    })
  }

  async listenConnection() {
    this.network.onDisconnect().subscribe(() => {
      if (this.alertInShown == false) {
        this.internetNotConnect();
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.internetPopup) {
        this.internetPopup.then((res) => {
          res.dismiss();
        });
        this.alertInShown = false;
      }
    });
  }

  async internetNotConnect() {
    this.internetPopup = await this.alertCtrl.create({
      header: '4k video status',
      message: 'No Internet Connection!',
      backdropDismiss: false,
      mode: 'ios',
      cssClass: 'my_alertCtrl',
    });
    this.internetPopup.then((res) => {
      res.present();
      this.alertInShown = true;
    });
  }

  createUserProfile() {
    this.uniqueDeviceID.get().then((uuid: any) => {
      let body = {
        "device_token": uuid
      }
      this.api.post('createUserProfile', body).then((res) => {
        console.log(JSON.stringify("createUserProfile=====" + res));
        if (res['ResponseCode'] == 1) {
          this.gs.userData = res['ResultData'];
          console.log(JSON.stringify("gs.userData>>>>>>>>" + this.gs.userData));
        } else {
          this.gs.messageToast('Something went wrong');
        }
      }, error => {
        console.log(JSON.stringify("error>>>>>>>>" + error));
        this.gs.messageToast('Something went wrong');
      })
    }).catch((error: any) => console.log(error));
  }

  getAppDetail() {
    this.api.post('getAppDetail', '').then((res) => {
      if (res['ResponseCode'] == 1) {
        this.appVersion.getVersionNumber().then((versionNumber) => {
          if (res['ResultData'].app_version != versionNumber) {
            this.updatePopup()
          }
        })
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, error => {
      console.log(JSON.stringify("error>>>>>>>>" + error));
      this.gs.messageToast('Something went wrong');
    })
  }

  privacyPolice() {
    this.router.navigate(['/privacy-police']);
    this.menutCtrl.close();
  }
  quotes() {
    this.router.navigate(['/quotes']);
    this.menutCtrl.close();
  }

  async updatePopup() {
    let alert = await this.alertCtrl.create({
      header: 'Vibes Video Status',
      message: 'New Update Available',
      backdropDismiss: false,
      mode: 'ios',
      cssClass: 'my_alertCtrl',
      buttons: [
        {
          text: 'Ignore',
          role: 'cancel',
          cssClass: 'cancel_btn',
          handler: () => { },
        },
        {
          text: 'Update',
          cssClass: 'oky_btn',
          handler: () => {
            this.gs.rateApp();
          },
        },
      ],
    });
    await alert.present();
  }
}
