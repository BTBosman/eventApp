import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../Modals/User';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { MoreInfoPage } from '../more-info/more-info';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  Users = {} as User;
  event = this.navParams.get('event');
  action =   this.navParams.get('action2')
  constructor(private firebaseService: FirebaseConnectionProvider,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  back(){
    this.navCtrl.pop()
  }

  reg(){

    if(this.Users.email == undefined && this.Users.password == undefined && this.Users.Username == undefined || this.Users.email == "" && this.Users.password == "" && this.Users.Username == "" ){
      const alert = this.alertCtrl.create({
        title: 'Error,',
        subTitle: ' Please provide your full details to register!',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.Users.Username == undefined || this.Users.Username == "" ){

      const alert = this.alertCtrl.create({
        title: 'Error,',
        subTitle: 'Please enter a Username, it cannot be left empty',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.Users.email ==undefined || this.Users.email == "" ){
      const alert = this.alertCtrl.create({
        title: 'Error,',
        subTitle: 'Please enter a valid email',
        buttons: ['OK']
      });
      alert.present();
    }


    else if(this.Users.password == undefined || this.Users.password == "" ){

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter a password, it cannot be left empty',
        buttons: ['OK']
      });
      alert.present();


    

}



    else {
      this.firebaseService.registerUser(this.Users.email,this.Users.password,this.Users.Username).then(() =>{
        this.firebaseService.getuser();
          this.navCtrl.push(TabsPage);
       })
    }
  }
}

}
