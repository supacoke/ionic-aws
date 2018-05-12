import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WorkoutsTab } from '../workouts-tab/workouts-tab';
import { DrillsTab } from '../drills-tab/drills-tab';

@Component({
  selector: 'page-my-plans',
  templateUrl: 'my-plans.html'
})
export class MyPlans {
  tab1: any;
  tab2: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.tab1 = WorkoutsTab;
    this.tab2 = DrillsTab;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPlansPage');
  }

 

}
