import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';

import { Tracker } from '../tracker/tracker';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {

  public notifications: any[] = [];
  public notificationsSchedule: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    this.notifications = [
      { name: 'Goals', set: false },
      { name: 'Statement', set: false },
      { name: 'Targets', set: false }
    ];
  }

  addNotifications() {
    let notificationTime = new Date();
    notificationTime.setHours(8);
    notificationTime.setMinutes(30);

    let notification = {
        id: 'notification-target-30',
        title: 'Your 30 Day Target',
        text: '105 lbs, Skating explosiveness, Stickhandling with movement',
        at: notificationTime,
        every: 'day'
    };

    this.notificationsSchedule.push(notification);

    LocalNotifications.schedule(this.notificationsSchedule);

    LocalNotifications.on('click', (notification, state) => {
      console.log('click');
      console.log(state);
      let alert = this.alertCtrl.create({
          title: "Notification Clicked",
          subTitle: "You just clicked the scheduled notification",
          buttons: ["OK"]
      });
      alert.present();
      this.navCtrl.push(Tracker);
    });

    let alert = this.alertCtrl.create({
      title: 'Schedule Set!',
      subTitle: 'Notification set.',
      buttons: ['OK']
    });
    alert.present();
  }

  cancelAll(){
 
    LocalNotifications.cancelAll();
 
    let alert = this.alertCtrl.create({
        title: 'Notifications cancelled',
        buttons: ['Ok']
    });
 
    alert.present();
 
}

}
