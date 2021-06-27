import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent, IonSlides, Platform } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { AdMobFree } from '@ionic-native/admob-free/ngx';
// import { AdmobfreeService } from 'src/app/services/admobfree.service';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file';

@Component({
  selector: 'app-video-slides',
  templateUrl: './video-slides.page.html',
  styleUrls: ['./video-slides.page.scss'],
})
export class VideoSlidesPage implements OnInit {
  getVideoObj: any = {};
  // constructor(
  // ) {
  //   this.getVideoObj = JSON.parse(this.route.snapshot.queryParamMap.get('item'));
  //   console.log("this.getVideoObj>>>>>>", this.getVideoObj);
  // }

  // ngOnInit() {
  // }

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
    direction: 'vertical',
  };
  @ViewChild('isNewVideo') isNewVideo: ElementRef;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(
    public router: Router,
    public alertCtrl: AlertController,
    // public fileTransfer: FileTransfer,
    // public file: File,
    // public admobS: AdmobfreeService,
    public gs: GlobalService,
    private route: ActivatedRoute,
    public socialSharing: SocialSharing,
    // public adMobFree: AdMobFree,
    private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      // let getCatBioObj = JSON.parse(this.route.snapshot.queryParamMap.get('item'));
      // this.getAllVideos = getCatBioObj['videos'];
      this.getAllVideos = [
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-23.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-23.jpg"
        },
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-22.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-22.jpg"
        },
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-21.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-21.jpg"
        },
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-20.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-20.jpg"
        },
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-19.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-19.jpg"
        },
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-18.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-18.jpg"
        },
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-17.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-17.jpg"
        },
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-16.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-16.jpg"
        },
        {
          "videoUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-15.mp4",
          "thubhUrl": "https://www.kahanihindi.com/wp-content/uploads/2021/05/full-screen-status-15.jpg"
        }
      ]
      // console.log("getCatBioObj>>>", getCatBioObj);
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

  viaVideoShare(url) {
    // this.admobS.rendomAdShow();
    this.isVidShare = true;
    this.socialSharing.share('', '', url, '').then((res) => {
      this.isVidShare = false;
    }, (er) => {
      this.isVidShare = false;
    });
  }
}
