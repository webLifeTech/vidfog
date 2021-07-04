import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent, IonSlides, Platform } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ApiService } from 'src/app/services/api.service';
// import { AdMobFree } from '@ionic-native/admob-free/ngx';
// import { AdmobfreeService } from 'src/app/services/admobfree.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';

@Component({
  selector: 'app-video-slides',
  templateUrl: './video-slides.page.html',
  styleUrls: ['./video-slides.page.scss'],
})
export class VideoSlidesPage implements OnInit {
  getVideoObj: any = {};
  getAllVideos: any = [];
  foldername: any;
  spinner: boolean = true;
  isShown: boolean = false;
  downloadspinner: boolean = false;
  isVidShare: boolean = false;
  shownVideos: number = 0;
  previousInd: any = 0;
  videoURL: any;
  isPlay: boolean = true;
  isHideShowPlay: boolean = true;
  setTimeout: any;
  slideOpts = {
    loop: false,
    initialSlide: 1,
    direction: 'vertical',
  };
  @ViewChild('isNewVideo') isNewVideo: ElementRef;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(
    public router: Router,
    public alertCtrl: AlertController,
    public fileTransfer: FileTransfer,
    public file: File,
    // public admobS: AdmobfreeService,
    public gs: GlobalService,
    private route: ActivatedRoute,
    public socialSharing: SocialSharing,
    public api: ApiService,
    // public adMobFree: AdMobFree,
    private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      let getCatBioObj = JSON.parse(this.route.snapshot.queryParamMap.get('item'));
      this.slideOpts.initialSlide = getCatBioObj.index;
      this.getAllVideos = getCatBioObj.videoData;
      console.log("getCatBioObj>>>>>>>>>>", this.getAllVideos);
      this.shownVideos = 0;
      this.previousInd = 0;
      this.spinner = false;
      // this.adMobFree.on(this.adMobFree.events.INTERSTITIAL_OPEN).subscribe(() => {
      //   let index = this.slides.getActiveIndex();
      //   console.log("index>>>>>>>>>>>>>>>>>" + index);

      //   setTimeout(() => {
      //     let newVideoData = <HTMLVideoElement>(
      //       document.getElementById("isNewVideo" + index)
      //     );
      //     console.log("newVideoData>>>>>" + JSON.stringify(newVideoData));

      //     if (newVideoData) {
      //       newVideoData.pause();
      //     }
      //   }, 100);
      // });
    })
    // this.service.checkFavVideo(this.videoURL+this.getAllVideos[0].link);
  }

  ngOnInit() {
    setTimeout(() => {
      let newVideoData = <HTMLVideoElement>document.getElementById("isNewVideo" + 0);
      console.log("newVideoData???", newVideoData);
      if (newVideoData) {
        // newVideoData.play();
      }
      this.isPlay = false;
    }, 50);
  }

  loadMoreData() {
    console.log("shownVideos>>>", this.shownVideos);
    if (this.shownVideos < this.getAllVideos.length) {
      this.shownVideos += 5;
      // this.admobS.showInterstitialAds();
    }
  }

  slideChanged() {
    this.isPlay = false;
    try {
      (<any>window).document.querySelectorAll('video').forEach(vid => {
        vid.pause();
        vid.currentTime = 0;
      });

      this.slides.getActiveIndex().then((index) => {
        if (index == 1) {
          this.shownVideos += 1;
        }
        setTimeout(() => {
          if (index > this.previousInd) {
            let newVideoData = <HTMLVideoElement>(
              document.getElementById("isNewVideo" + (index - 1))
            );
            if (newVideoData) {
              newVideoData.pause();
            }
          } else {
            let newVideoData = <HTMLVideoElement>(
              document.getElementById("isNewVideo" + (index + 1))
            );
            if (newVideoData) {
              newVideoData.pause();
            }
          }
          this.previousInd = index;

          let newVideoData = <HTMLVideoElement>(
            document.getElementById("isNewVideo" + index)
          );
          if (newVideoData) {
            newVideoData.play();
          }
        }, 100);
      });

    } catch (ee) {
    }
  }

  downloadVideo(vidRow) {
    this.downloadspinner = true;
    var fileName = '4kVideoStatus' + new Date().getTime() + '.mp4';
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const fileTransferDir = this.file.externalRootDirectory;
    console.log("fileTransferDir<<<<<<<<<>>>>" + JSON.stringify(fileTransferDir));
    const fileURL = fileTransferDir + '4k Video Status/' + fileName;
    fileTransfer.download(vidRow.video_url, fileURL).then(
      (entry) => {
        this.downloadspinner = false;
        let alert = this.alertCtrl.create({
          header: 'Vibes Video Status',
          message: 'Download Successfully!',
          mode: 'ios',
          cssClass: 'my_alertCtrl',
          buttons: [
            {
              text: 'Ok',
              cssClass: 'oky_btn',
              handler: () => {
                (<any>window).cordova.plugins.MediaScannerPlugin.scanFile(fileURL, () => { },
                  (errr) => { }
                );
              },
            },
          ],
        });
        alert.then((res) => {
          res.present();
        });
      },
      (error) => {
        console.log("error>>>>>>>>>>>>>" + JSON.stringify(error));
        this.downloadspinner = false;
      }
    );
  }

  viaVideoShare(vidRow) {
    this.isVidShare = true;
    this.socialSharing.share('👌🏻 10,000+ 4k Full Screen Video Status  (Free)Download Now 👇🏻👇🏻👇🏻👇🏻👇🏻', vidRow.video_url, 'https://play.google.com/store/apps/details?id=com.fullscreenvideostatus.hdvideostatus').then((res) => {
      this.isVidShare = false;
      vidRow.video_share = Number(vidRow.video_share) + 1;
      this.increateCount(vidRow.video_id, "2");
    }, (er) => {
      this.isVidShare = false;
    });
  }

  increateCount(video_id, type) {
    let body = {
      video_id: video_id,
      type: type
    }
    this.api.post('increateCount', body).then((res) => {
      if (res['ResponseCode'] == 1) {
      } else {
        this.gs.messageToast('Something went wrong');
      }
    }, err => {
      this.gs.messageToast('Something went wrong');
    })
  }
}
