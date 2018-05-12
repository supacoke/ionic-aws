import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { TrackData } from '../tracker/track-data';


/*
  Generated class for the Tracker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-track',
  templateUrl: 'track.html'
})
export class Track {
  public type: string;
  public options: any[];

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams
  ){
    this.type = navParams.get('type');
    console.log(this.type);
    this.showOptions(this.type);
  }

  showOptions(type) {
    switch(type) {
      case 'yes':
        this.options = [
          {name: 'Workouts', id: 'Workouts'},
          {name: 'Hockey', id: 'Hockey'}
        ]
        break;
      case 'no':
        break;
      case 'rest':
        break;
      case 'game':
        this.showModal('game');
        break;
    }
  }

  showModal(option) {
    let myModal = this.modalCtrl.create(TrackData, {type: option});
    myModal.present();
  }

}

