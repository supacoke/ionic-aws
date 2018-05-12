import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Track } from '../tracker/track';
import { TrackData } from '../tracker/track-data';

import { AngularFire, AngularFireAuth, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Tracker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html'
})
export class Tracker {
  public data: FirebaseListObservable<any[]>;
  public authState: FirebaseAuthState;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFire,
    public auth: AngularFireAuth
  ) {
    this.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });

    // get tracker
    let today = new Date('2017-05-06');
    let todayString = today.toISOString();
    this.data = this.af.database.list('/tracker' + this.authState.uid, {
      query: {
        orderByChild: 'date',
        equalTo: todayString
      }
    });

    this.data.subscribe(queriedItems => {
      console.log(queriedItems);  
    });
  }

  track(type){
    this.navCtrl.push(Track,{
      type: type
    });
  }

  trackOther(type) {
    console.log(this.authState.uid);
    let uid = this.authState.uid;
    let tracker = this.af.database.list('tracker' + uid);
    tracker.push({
      //date:
      category: type
    }).then(item => {
      console.log(item);
    }).catch(reject => {
      console.log('catch error');
    });
  }

}
