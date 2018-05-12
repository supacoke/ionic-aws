import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LocalNotifications } from 'ionic-native';

import { DatePickerModule } from 'datepicker-ionic2';

import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { MyPlans } from '../pages/my-plans/my-plans';
import { AddPlan } from '../pages/add-plan/add-plan';
import { WorkoutsTab } from '../pages/workouts-tab/workouts-tab';
import { DrillsTab } from '../pages/drills-tab/drills-tab';

import { CreateProgram } from '../pages/programs/create-program';
import { ViewProgram } from '../pages/programs/view-program';

import { Tracker } from '../pages/tracker/tracker';
import { Track } from '../pages/tracker/track';
import { TrackData } from '../pages/tracker/track-data';

import { Settings } from '../pages/settings/settings';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyCmG6CR8Ro9-E_aZgMvVzIM-LVZSp28gHc",
  authDomain: "heart-c4f99.firebaseapp.com",
  databaseURL: "https://heart-c4f99.firebaseio.com",
  storageBucket: "heart-c4f99.appspot.com",
  messagingSenderId: "683818436771"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    Login,
    Dashboard,
    MyPlans,
    AddPlan,
    WorkoutsTab,
    DrillsTab,
    ViewProgram,
    CreateProgram,
    Tracker,
    Track,
    TrackData,
    Settings
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    DatePickerModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    BrowserModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard,
    MyPlans,
    AddPlan,
    WorkoutsTab,
    DrillsTab,
    ViewProgram,
    CreateProgram,
    Tracker,
    Track,
    TrackData,
    Settings
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications
  ]
})
export class AppModule {}
