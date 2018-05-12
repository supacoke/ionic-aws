import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

//import { Jwplayer } from '../providers/jwplayer';

declare var jwplayer: any;

@Component({
  selector: 'page-view-program',
  templateUrl: 'view-program.html'
})
export class ViewProgram {
  pid: string;
  public videos: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire
  ) {
    this.pid = navParams.get('pid');
    this.getVideos();
  }

  getVideos() {
    this.videos = this.af.database.list('/programVideos/' + this.pid);
  }

  playVideo(video) {
    console.log(video);
    var cfg = {
      title: video.title,
      mediaid: video.$key,
      "preload": "none",
      "autostart": false,
      "controls": true,
      "mute": false,
      "useAudioTag": true,
      "file": video.url,
      "skin": "bekle",
      "stretching": "exactfit",
      "width": "100%",
      "volume": 50,
      "aspectratio": "16:9",
      //image: "assets/logo.png",
      "primary": "html5",
      hlshtml: true,
      enableFullscreen: 'false',
      html5: true,
      playsinline: true,
      enablejsapi: true,
      "logo": {
        hide: true
      }
    };

    return Promise.resolve(
      jwplayer("myMediaDiv").setup(cfg))
      .then(
      playerInstance => {
        setTimeout(() => {
          return playerInstance.play();
        }, 500);
      }
    );
  }

}
