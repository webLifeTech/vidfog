import { Injectable } from '@angular/core';
import { Market } from '@ionic-native/market/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  allVideoLanguage: any = [];
  allVideoLangTemp: any = [];
  homeVideos: any = [];
  userData: any = {};
  loading: any;
  appLogo: any = 'https://play-lh.googleusercontent.com/mt0d5BGWZX7nAJJq39X79a3FN0Jap1ydSo2b13Hj6EbqD3MkrYSzBmxoTXS2bMne6Q=s180-rw';

  constructor(
    public market: Market,
    public socialSharing: SocialSharing,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public api: ApiService,
    public tc: ToastController
  ) {
  }

  getLanguageList() {
    this.api.post('getLanguageList', '').then(async (res) => {
      if (res['ResponseCode'] == 1) {
        this.allVideoLanguage = res['ResultData'];
        console.log(this.allVideoLanguage);
        let tempLang = [];
        const setCatLang = () => {
          for (let i in this.allVideoLanguage) {
            this.allVideoLangTemp.push({
              type: 'checkbox',
              label: this.allVideoLanguage[i].language_name,
              value: this.allVideoLanguage[i].language_id,
              checked: true
            })
            tempLang.push(this.allVideoLanguage[i].language_id)
          }
        }
        await setCatLang();
        this.getHomeVideos({
          language_id: String(tempLang),
          start: 0,
        });
      } else {
        this.messageToast('Something went wrong');
      }
    }, err => {
      this.messageToast('Something went wrong');
    })
  }

  getHomeVideos(body) {
    this.api.post('getHomePageVideoList', body).then((res) => {
      this.homeVideos = [];
      if (res['ResponseCode'] == 1) {
        this.homeVideos = res['ResultData'];
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
              this.getHomeVideos({
                language_id: String(res),
                start: 0
              });
              console.log('Confirm Ok');
            }
          }
        }
      ]
    });

    await alert.present();
  }


  async reportPopup(video_id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Report',
      inputs: [
        {
          name: 'Sexual',
          type: 'radio',
          label: 'Sexual',
          value: '1'
        },
        {
          name: 'copyright',
          type: 'radio',
          label: 'Copyright',
          value: '2'
        },
        {
          name: 'other',
          type: 'radio',
          label: 'Other',
          value: '3',
          checked: true
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
          handler: (res) => {
            let body = {
              user_id: this.userData.user_id,
              video_id: video_id,
              report_reason: res
            }
            this.api.post('reportVideo', body).then((res) => {
              if (res['ResponseCode'] == 1) {
                this.messageToast(res['ResponseMsg']);
              } else {
                this.messageToast('Something went wrong');
              }
            }, err => {
              this.messageToast('Something went wrong');
            })
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

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message,
      duration: 2000,
      spinner: 'bubbles'
    });
    await this.loading.present();
  }

  dissmisLoding() {
    this.loading.dismiss();
  }

  appShare() {
    this.socialSharing.share(
      '📱 4k Full Screen Video Status 😍 Full HD Video Status Free Download Now 👇🏻👇🏻👇🏻👇🏻👇🏻',
      this.appLogo,
      'https://play.google.com/store/apps/details?id=com.fullscreenvideostatus.hdvideostatus'
    ).then((res) => { }).catch((error) => { })
  }

  rateApp() {
    this.market.open('com.fullscreenvideostatus.hdvideostatus');
  }
}
