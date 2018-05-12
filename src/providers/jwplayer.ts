import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var jwplayer: any;

@Injectable()
export class Jwplayer {

  constructor(public http: Http) {
    console.log('Hello Jwplayer Provider');
  }

  loadMedia(media, isAutoPlay) {
    var cfg = {
      title: media.Title,
      mediaid: media.Id,
      "preload": "none",
      "autostart": false,
      "controls": true,
      "mute": false,
      "useAudioTag": true,
      "file": media.Location,
      "skin": "bekle",
      "stretching": "exactfit",
      "width": "100%",
      "volume": 50,
      "aspectratio": "16:9",
      image: "assets/logo.png",
      "primary": "html5",
      hlshtml: true,
      enableFullscreen: 'false',
      "logo": {
        hide: true
      }
    };

    return Promise.resolve(
      jwplayer("myMediaDiv").setup(cfg))
      .then(
      playerInstance => {
        if (isAutoPlay) {
          setTimeout(() => {
            return playerInstance.play();
          }, 500);
        }
      }
    );
  }

}
