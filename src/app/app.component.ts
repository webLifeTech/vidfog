import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, Platform } from '@ionic/angular';
import { GlobalService } from './services/global.service';
import { Network } from '@ionic-native/network/ngx';
import { File } from '@ionic-native/file/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ApiService } from './services/api.service';

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
    public gs: GlobalService,
    public api: ApiService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/tabs/home')) {
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
      this.gs.getLanguageList();

      // let userD = localStorage.getItem('hdvideostatusUser');
      // if(userD && userD['user_id']){

      // }
      // console.log("userD>>>", userD);

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
    // this.uniqueDeviceID.get().then((uuid: any) => {
    let body = {
      "device_token": "03993340-1665-a36f-8692-160499703718"
    }
    this.api.post('createUserProfile', body).then((res) => {
      // console.log("res>>>>"+JSON.stringify(res));
      if (res['ResponseCode'] == 1) {
        this.gs.userData = res['ResultData'];
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, error => {
      console.log(JSON.stringify("error>>>>>>>>" + error));
      this.gs.messageToast('Something went wrong');
    })
    // }).catch((error: any) => console.log(error));
  }
}
