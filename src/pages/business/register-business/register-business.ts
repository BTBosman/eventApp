import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { User } from '../../../Modals/User';
import { FirebaseConnectionProvider } from '../../../providers/firebase-connection/firebase-connection';

/**
* Generated class for the RegisterBusinessPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
 selector: 'page-register-business',
 templateUrl: 'register-business.html',
})
export class RegisterBusinessPage {
 Users = {} as User;
 url;
 constructor(public fire:FirebaseConnectionProvider, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
 }

 ionViewDidLoad() {

 }

 insertpic(event:any){
   if (event.target.files && event.target.files[0]){
     let reader = new FileReader();
     reader.onload = (event:any) =>{
      this.url = event.target.result;
     }
     reader.readAsDataURL(event.target.files[0]);
   }
 }
 reg(name,location, cellno){
   this.fire.registerBusiness(this.Users.email,this.Users.password,this.Users.Username ,name,location,this.url, cellno).then(() =>{
     const alert = this.alertCtrl.create({
       title: 'Congradulations',
       subTitle: 'Business Profile has been successfully created',
       buttons: ['OK']
     });
     alert.present();
   })
 }

}
