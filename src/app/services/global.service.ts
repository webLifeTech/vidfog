import { Injectable } from '@angular/core';
import { Market } from '@ionic-native/market/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  videoPosters = [
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/new-Love-status-videos-14.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/new-Love-status-videos-16.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/new-Love-status-videos-13.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/new-Love-status-videos-20.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/new-Love-status-videos-19.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/new-Love-status-videos-18.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/new-Love-status-videos-17.jpg",
    "https://www.kahanihindi.com/wp-content/uploads/2020/10/new-Love-status-videos-12.jpg",
  ]

  allVideoLanguage: any = [];
  allVideoLangTemp: any = [];
  homeVideos: any = [];
  constructor(
    public market: Market,
    public socialSharing: SocialSharing,
    public alertController: AlertController,
    public api: ApiService,
    public tc: ToastController
  ) {
    this.getLanguageList();
    this.getHomeVideos();
  }

  getLanguageList() {
    this.api.post('getLanguageList', '').then((res) => {
      console.log("res>>>>", res);
      if (res['ResponseCode'] == 1) {
        this.allVideoLanguage = res['ResultData'];
        console.log(this.allVideoLanguage);
        for (let i in this.allVideoLanguage) {
          this.allVideoLangTemp.push({
            type: 'checkbox',
            label: this.allVideoLanguage[i].language_name,
            value: this.allVideoLanguage[i].language_id,
            checked: true
          })
        }
      } else {
        this.messageToast('Something went wrong');
      }
    }, err => {
      this.messageToast('Something went wrong');
    })
  }

  getHomeVideos() {
    this.api.post('getHomePageVideoList', '').then((res) => {
      if (res['ResponseCode'] == 1) {
        this.homeVideos = res['ResultData'];
        console.log("homeVideos>>>>", this.homeVideos);
      } else {
        this.messageToast('Something went wrong');
      }
    }, err => {
      this.messageToast('Something went wrong');
    })
  }

  async languagePopup() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Languages',
      inputs: this.allVideoLangTemp,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (res) => {
            console.log(String(res));
            if (res.length) {

              console.log('Confirm Ok');
            }
          }
        }
      ]
    });

    await alert.present();
  }


  async reportPopup() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Report',
      inputs: [
        {
          name: 'Sexual',
          type: 'radio',
          label: 'Sexual',
          value: 'value1',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: true
        },
        {
          name: 'copyright',
          type: 'radio',
          label: 'Copyright',
          value: 'value2',
          handler: () => {
            console.log('Radio 2 selected');
          }
        },
        {
          name: 'other',
          type: 'radio',
          label: 'Other',
          value: 'value3',
          handler: () => {
            console.log('Radio 3 selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Submit',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async messageToast(message) {
    const toast = await this.tc.create({
      message: message,
      mode: 'ios',
      duration: 4000
    });
    toast.present();
  }

  appShare() {
    this.socialSharing.share(
      'Swag Bio Quotes Idea download app to make your instagram professional profile (3500+) Bios, Share and Give 5 Stare Review',
      'Thank you',
      '',
      'https://play.google.com/store/apps/details?id=com.lifetechs.swagbio'
    ).then((res) => { }).catch((error) => { })
  }

  rateApp() {
    this.market.open('com.lifetechs.swagbio');
  }
}
