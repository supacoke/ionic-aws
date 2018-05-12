import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AngularFire} from 'angularfire2';

@Component({
  selector: 'page-create-program',
  templateUrl: 'create-program.html'
})
export class CreateProgram {
  public programTitle: string;
  public programDescription:string;
  public videoTitle: string;
  public videoUrl: string;
  public videosList: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProgramPage');
  }

  addVideo() {
    this.videosList.push({
      title: this.videoTitle,
      url: this.videoUrl
    });
    console.log(this.videosList);
  }

  saveProgram() {
    let programsRef = this.af.database.list('/programs');
    programsRef.push({
      title: this.programTitle,
      description: this.programDescription,
      timestamp: Date.now()
    }).then(data=>{
      let programVideosRef = this.af.database.list('/programVideos/' + data.key);
      /*programVideosRef.push({
        title: this.videoTitle,
        url: this.videoUrl
      }).then(data=>{
        console.log('Success');
      });*/
      this.videosList.forEach(function(video){
        programVideosRef.push({
          title: video.title,
          url: video.url
        }).then(data=>{
          console.log('Success');
        });
      })
    });
  }
}
