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
  myFavVideos: any = [];
  isFavVideo: boolean = false;
  selectedLang: any = [];

  constructor(
    public market: Market,
    public socialSharing: SocialSharing,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public api: ApiService,
    public tc: ToastController
  ) {
    this.myFavVideos = JSON.parse(window.localStorage.getItem("4kvideostatus")) || [];
    this.selectedLang = JSON.parse(window.localStorage.getItem("selectedLanguages")) || [];
    console.log("selectedLang", this.selectedLang);

  }

  getLanguageList() {
    this.api.post('getLanguageList', '').then(async (res) => {
      if (res['ResponseCode'] == 1) {
        this.allVideoLanguage = res['ResultData'];
        console.log(this.allVideoLanguage);
        // let tempLang = [];
        const setCatLang = () => {
          for (let i in this.allVideoLanguage) {
            this.allVideoLangTemp.push({
              type: 'checkbox',
              label: this.allVideoLanguage[i].language_name,
              value: this.allVideoLanguage[i].language_id,
              checked: this.isLangCheck(this.allVideoLanguage[i].language_id)
            })
            if (!this.selectedLang.length) {
              this.selectedLang.push(this.allVideoLanguage[i].language_id)
            }
          }
        }
        await setCatLang();
        console.log("this.allVideoLangTemp>>>", this.allVideoLangTemp);

        this.getHomeVideos({
          language_id: String(this.selectedLang),
          start: 0,
        });
      } else {
        this.messageToast('Something went wrong');
      }
    }, err => {
      console.log("errgetLanguageList>>>>>>>>" + JSON.stringify(err));

      this.messageToast('Something went wrong');
    })
  }

  isLangCheck(language_id) {
    if (this.selectedLang.length) {
      for (let i in this.selectedLang) {
        if (this.selectedLang[i] == language_id) {
          return true
        }
      }
    } else {
      return true
    }
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

  increateCount(video_id, type) {
    let body = {
      video_id: video_id,
      type: type
    }
    this.api.post('increateCount', body).then((res) => {
      if (res['ResponseCode'] == 1) {
      } else {
        this.messageToast('Something went wrong');
      }
    }, err => {
      this.messageToast('Something went wrong');
    })
  }

  setFavourites(vidRow) {
    this.myFavVideos.push(vidRow);
    window.localStorage.setItem("4kvideostatus", JSON.stringify(this.myFavVideos));
    this.checkFavVideo(vidRow.video_id);
    vidRow.video_favourite = Number(vidRow.video_favourite) + 1;
    this.increateCount(vidRow.video_id, '3');
  }

  checkFavVideo(video_id) {
    this.isFavVideo = false;
    for (let i in this.myFavVideos) {
      if (this.myFavVideos[i].video_id == video_id) {
        this.isFavVideo = true;
      }
    }
  }

  removeFavVideo(video_id) {
    for (let i in this.myFavVideos) {
      if (this.myFavVideos[i].video_id == video_id) {
        this.myFavVideos.splice(i, 1);
        window.localStorage.setItem("4kvideostatus", JSON.stringify(this.myFavVideos));
        setTimeout(() => {
          this.checkFavVideo(video_id);
        }, 100);
      }
    }
    // this.isFavVideo = false;
  }

  async languagePopup() {
    const setCatLang = () => {
      for (let i in this.allVideoLangTemp) {
        this.allVideoLangTemp[i] = {
          type: 'checkbox',
          label: this.allVideoLanguage[i].language_name,
          value: this.allVideoLanguage[i].language_id,
          checked: this.isLangCheck(this.allVideoLanguage[i].language_id)
        }
      }
    }
    await setCatLang();
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
            this.selectedLang = res;
            console.log(res);
            if (res.length) {
              window.localStorage.setItem("selectedLanguages", JSON.stringify(res));
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
