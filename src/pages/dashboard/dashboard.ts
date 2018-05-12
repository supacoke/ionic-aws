import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AngularFire, AngularFireAuth, FirebaseAuthState} from 'angularfire2';

import { ViewProgram } from '../programs/view-program';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  public today: Date;
  public weekdays: Array<string>;
  public week: Array<any> = [];

  public authState: FirebaseAuthState;

  public plans: any;

  public sports: any[];
  public trackingDataSport;
  public gameDataSport;
  public sportName: string;
  public trackingDataName: string;
  public gameDataName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public auth: AngularFireAuth
  ) {
    this.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });

    this.weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    this.loadThisWeek();

    for (let i=0; i<7; i++) {
      let newDate = new Date();
      let thisDay = newDate.setDate(newDate.getDate()+i);
      let newDateNonHours = newDate.setHours(0,0,0,0);

      let dayObj = {
        timestamp: thisDay,
        day: this.weekdays[newDate.getDay()],
        programs: []
      }
      //console.log(thisDay.getDate());

      // subscribe to changes
      this.plans.subscribe(queriedItems => {
        let theDate = new Date(queriedItems[0].date).setHours(0,0,0,0);
        if ( theDate == newDateNonHours ) {
          // get programId
          let program = this.af.database.object('/programs/' + queriedItems[0].pid);
          program.subscribe(programItem => {
            console.log(programItem);
            dayObj.programs.push(programItem);
          });
        }
      });

      this.week.push(dayObj);
    }
    //console.log(this.week);

    // for admin section
    //let sports = this.sports;
    let sportsDb = this.af.database.list('/sports/');
    sportsDb.subscribe(sport => {
      this.sports = sport;
    })
  }

  loadThisWeek() {
    let startDate = new Date();
    let endDate = startDate.getDate()+7;
    //console.log(endDate);

    this.plans = this.af.database.list('/userplans/' + this.authState.uid, {
      query: {
        orderByChild: 'date',
        startAt: startDate.getTime()
      }
    });

    
  }

  viewProgram(key) {
    // push view program list view
    this.navCtrl.push(ViewProgram,{
      pid: key
    });
  }

  saveSport() {
    let sportDb = this.af.database.list('sports');
    sportDb.push({
      name: this.sportName
    }).then(item => {
      console.log(item);
    }).catch(reject => {
      console.log(reject);
    });
  }

  saveTrackingData() {
    let trackerDataDb = this.af.database.list('tracker_data');
    trackerDataDb.push({
      name: this.trackingDataName,
      [this.trackingDataSport]: true
    }).then(item => {
      console.log(item);
    }).catch(reject => {
      console.log(reject);
    });
  }

  saveGameData() {
    let gameDataDb = this.af.database.list('game_tracker_data');
    gameDataDb.push({
      name: this.gameDataName,
       [this.gameDataSport]: true
    }).then(item => {
      console.log(item);
    }).catch(reject => {
      console.log(reject);
    });
  }

}
