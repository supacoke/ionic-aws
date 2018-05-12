import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddPlan } from '../add-plan/add-plan';
import { ViewProgram } from '../programs/view-program';

import {AngularFire, AngularFireAuth, FirebaseObjectObservable, FirebaseListObservable, FirebaseAuthState} from 'angularfire2';

@Component({
  selector: 'page-workouts-tab',
  templateUrl: 'workouts-tab.html'
})
export class WorkoutsTab {
  public plans: FirebaseListObservable<any>;
  public programs: FirebaseListObservable<any>;

  public authState;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public auth: AngularFireAuth
  ) {
    this.programs = this.af.database.list('/programs');

    this.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
       console.log(this.authState);
    });
  }

  setDate(event, programKey) {
    console.log(programKey);
    console.log(event.getDate());
    this.plans = this.af.database.list('/userplans/' + this.authState.uid);
    this.plans.push({
      date: event.toString(),
      pid: programKey
    }).then(item => {
      console.log(item);
    }).catch(reject => {
      console.log('catch');
    });
  }

  addPlan() {
    console.log('pushed');
    this.navCtrl.push(AddPlan,{
      type: 'workouts'
    });
  }

  addToPlan() {

  }

  viewProgram(key) {
    // push view program list view
    this.navCtrl.push(ViewProgram,{
      pid: key
    });
    // tomorrow/dummy video from youtube and dummy content/finish view program listing
  }
}
