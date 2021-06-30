import { Injectable } from '@angular/core';
import { Market } from '@ionic-native/market/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController } from '@ionic/angular';

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
  constructor(
    public market: Market,
    public socialSharing: SocialSharing,
    public alertController: AlertController,
  ) { }

  appShare() {
    this.socialSharing.share(
      'Swag Bio Quotes Idea download app to make your instagram professional profile (3500+) Bios, Share and Give 5 Stare Review',
      'Thank you',
      '',
      'https://play.google.com/store/apps/details?id=com.lifetechs.swagbio'
    ).then((res) => {
      // Success!
    }).catch((error) => {
      // Error!
    })
  }

  rateApp() {
    this.market.open('com.lifetechs.swagbio');
  }

  async languagePopup() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Languages',
      inputs: [
        {
          name: 'Hindi',
          type: 'checkbox',
          label: 'Hindi',
          value: 'value1',
          handler: () => {
            console.log('Checkbox 1 selected');
          }
        },

        {
          name: 'English',
          type: 'checkbox',
          label: 'English',
          value: 'value2',
          handler: () => {
            console.log('Checkbox 2 selected');
          }
        },

        {
          name: 'Gujarati',
          type: 'checkbox',
          label: 'Gujarati',
          value: 'value3',
          handler: () => {
            console.log('Checkbox 3 selected');
          }
        },

        {
          name: 'Marathi',
          type: 'checkbox',
          label: 'Marathi',
          value: 'value4',
          handler: () => {
            console.log('Checkbox 4 selected');
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
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
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
}
