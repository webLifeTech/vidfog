import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, Platform } from '@ionic/angular';
import { GlobalService } from './services/global.service';
import { Network } from '@ionic-native/network/ngx';
import { File } from '@ionic-native/file/ngx';

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
    private alertCtrl: AlertController,
    public gs: GlobalService,
    private file: File,
    public network: Network
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
}
