import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AngularFire, AngularFireAuth, FirebaseAuthState, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-track-data',
  templateUrl: 'track-data.html'
})

export class TrackData {
  public categories:any[];
  public myDate:string = new Date().toISOString();
  public type:string;
  public myValue:any = 0;
  public gameVars:any[] = [];

  authState: FirebaseAuthState;
  tracker: FirebaseListObservable<any>;

  constructor(
    public params: NavParams,
    public af: AngularFire,
    public auth: AngularFireAuth
  ) {
    this.type = params.get('type');
    this.getTrackerData(params.get('type'));
  }

  getTrackerData(type) {

    switch (type) {
      /*case 'workouts':
        this.categories = [
          { name:'Arms', field:'checkbox' },
          { name:'Back', field:'checkbox' },
          { name:'Chest', field:'checkbox' },
          { name:'Core', field:'checkbox' },
          { name:'Legs', field:'checkbox' }
        ];
        break;*/
      /*case 'hockey':
        this.categories = [
          { name:'Skating', field:'checkbox' },
          { name:'Stickhandling', field:'checkbox' },
          { name:'Shooting', field:'checkbox', subcategories:[{name:'Wrist Shot'},{name:'Snap Shot'}] },
          { name:'Passing', field:'checkbox' }
        ];
        break;*/
      case 'game': {
        let sportDb = this.af.database.list('/sports', {
          query: {
            orderByChild: 'name',
            equalTo: 'Hockey'
          }
        });

        sportDb.subscribe(snapshots  => {
          let typeKey = snapshots[0].$key;
          console.log(typeKey);
          let trackerDb = this.af.database.list('/game_tracker_data/', {
            query: {
              orderByChild: typeKey,
              equalTo: true
            }
          });

          trackerDb.subscribe(snapshot => {
            this.categories = snapshot;
          });
        });  
        break;
      }
      default: {
        let sportDb = this.af.database.list('/sports', {
          query: {
            orderByChild: 'name',
            equalTo: type
          }
        });

        sportDb.subscribe(snapshots  => {
          let typeKey = snapshots[0].$key;
          let trackerDb = this.af.database.list('/tracker_data/', {
            query: {
              orderByChild: typeKey,
              equalTo: true
            }
          });

          trackerDb.subscribe(snapshot => {
            this.categories = snapshot;
          });
        });       

      }
    }
  }

  saveData() {
    let uid;

    this.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
       uid = this.authState.uid;
    });

    let af = this.af;
    let tracker = this.tracker;
    let timestamp = this.myDate;
    let trackerType = this.type;
    let value = this.myValue;
    let gameVars = this.gameVars;

    this.categories.forEach(function(category, index){
      let trackerDataObj;

      if (trackerType == 'game' && gameVars[index] != null && gameVars[index] != 0) {
        trackerDataObj = {
            timestamp: timestamp,
            [category.$key]: true,
            value: gameVars[index]
          }
      } else {
        if (category.checked) {
          trackerDataObj = {
            timestamp: timestamp,
            [category.$key]: true,
            value: null
          }
        }
      }

      if ( trackerDataObj) {
        tracker = af.database.list('/tracker/' + uid);
        tracker.push(
          trackerDataObj
        ).then(item => {
          console.log(item);
        }).catch(reject => {
          console.log('catch');
        });
      }
    });

    
  }

}