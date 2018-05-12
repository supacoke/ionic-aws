import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Dashboard } from '../pages/dashboard/dashboard';
import { MyPlans } from '../pages/my-plans/my-plans';
import { Login } from '../pages/login/login';
import { CreateProgram } from '../pages/programs/create-program';

import { Tracker } from '../pages/tracker/tracker';
import { Settings } from '../pages/settings/settings';

import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularfire2';

declare var jwplayer: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any}>;

  private authState: FirebaseAuthState;

  constructor(
    public platform: Platform,
    public af: AngularFire,
    public auth: AngularFireAuth
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Dashboard },
      { title: 'My Plans', component: MyPlans },
      { title: 'Create Program', component: CreateProgram },
      { title: 'Settings', component: Settings },
      { title: 'Tracker', component: Tracker }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
       console.log(this.authState);

      if (this.authState !== null) {
        this.nav.setRoot(Dashboard);
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
