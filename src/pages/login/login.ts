import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

import { MyPlans } from '../my-plans/my-plans';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  public email: string;
  public password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
    this.af.auth.login({
      email: this.email,
      password: this.password
    }).then( res => {
      if (res.uid) {
        this.navCtrl.setRoot(MyPlans);
      }
    });
  }
}
