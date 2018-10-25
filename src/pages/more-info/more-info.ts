import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, PopoverController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { AboutPage } from '../about/about';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';
import {CommentsPage}  from '../comments/comments';
import { TabsPage } from '../tabs/tabs';
import { PopoverComponent } from '../../components/popover/popover';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { CommentStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@IonicPage()
@Component({
  selector: 'page-more-info',
  templateUrl: 'more-info.html',
})
export class MoreInfoPage {
event = new Array();
eventsDetails =  new Array();
plus;
url =   '../../assets/imgs/Spring-Fi.jpg';
color='linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,.8)),';
fee
go;
buttonActive: boolean =  false;
color2 = "light"
pet;
colorState = "light";
state = this.navParams.get('color')
loginStatus:boolean;
saveAction;
getActions = this.navParams.get('action');
tempArray = this.navParams.get('events');
test = [];
actionState;
  constructor(private zone: NgZone, public popoverCtrl: PopoverController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private view: ViewController,private toastCtrl: ToastController, private firebaseService: FirebaseConnectionProvider,private launchNavigator: LaunchNavigator, private socialSharing: SocialSharing) {
  }

  ​ionViewDidEnter(){
    this.zone.run;
    this.loginStatus = null;
    this.ionViewDidLoad().then(() =>{
      if (this.saveAction != undefined){
        if (this.saveAction == "navigate" ){
          this.navigate()
        }
        else if (this.saveAction == "share" ){
          this.share();
        }
        else if (this.saveAction == "going"){
          this.going();
        }
      }
      this.saveAction = undefined;
      this.getActions =  undefined;
    })
  }

  ionViewDidLoad() {
return new Promise((accpt,rej) =>{
  this.event.length = 0;
  this.eventsDetails.length = 0;
  if (this.getActions != undefined){
    this.saveAction = this.getActions;
    this.event.push(this.event.push(this.tempArray[0]))
    this.test = this.event[0];
    this.event.length = 0;
    this.event.push(this.test)
    this.actionState = "there is one";
    if (this.event[0].fee == 0){
      this.fee =  "Free"
    }
    else{
      this.fee = "R" + this.event[0].fee
    }
  }
else{
  this.event.push(this.navParams.get('events'));
  if (this.event[0].fee == 0){
    this.fee =  "Free"
  }
  else{
    this.fee = "R" + this.event[0].fee
  }
}
  this.firebaseService.getUserSatate().then( data2 =>{
    if (data2 == 1){
      this.changeLoginStatus(true);
      this.go =    this.event[0].going;
      this.url = this.event[0].img;
      this.firebaseService.getColourState(this.event[0].key).then(data =>{
        if (this.state == true){
          this.colorState = "danger";
        }
        else if (data == "found"){
          this.colorState = "danger";
        }
        else if (data == "not found"){
          this.colorState = "light";
        }
      })
    }
    else if(data2 == 0){
      this.go =    this.event[0].going;
      this.url = this.event[0].img;
     this.changeLoginStatus(false);
    }
    accpt('done running')
  })
})
  }

  changeLoginStatus(status){
    this.loginStatus =  status;
  }

  navigate(){
    if (this.loginStatus ==  true){
      this.launchNavigator.navigate(this.event[0].location);
    }
    else{
      this.saveAction = "navigate"
      const confirm = this.alertCtrl.create({
        message: 'you have to login before you can navigate to the event!',
        buttons: [
          {
            text: 'Sign In',
            handler: () => {
              this.navCtrl.push(LoginPage, {event:this.event, action:this.saveAction})
            }
          }
        ]
      });
      confirm.present();
    }
  }

  share(){
    if (this.loginStatus ==  true){
      var location = 'at ' + this.event[0].location + ', this event was shared from event finder app, please download the app to get more events like this' 
      this.socialSharing.share(this.event[0].eventName,this.event[0].eventDesc,this.event[0].img, location ) .then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }
    else{
      this.saveAction = "share";
      const confirm = this.alertCtrl.create({
        message: 'you have to login before you can share the event!',
        buttons: [
          {
            text: 'Sign In',
            handler: () => {
              this.navCtrl.push(LoginPage, {event:this.event, action:this.saveAction})
            }
          }
        ]
      });
      confirm.present();
    }
 
  }
  going(){
    if (this.loginStatus ==  true){
      if (this.colorState == "danger"){
        this.firebaseService.removeFromFav(this.event[0].key).then(data =>{
          const toast1 = this.toastCtrl.create({
            message: 'The event has been removed from your calendar',
            duration: 3000,
            cssClass: "toast1"
          });
          toast1.present();
        }  , Error =>{
          console.log(Error.message)
        })
        this.colorState = "light";
      }
      else if (this.colorState == "light"){
        this.firebaseService.Goings(this.event[0].hostname,this.event[0].key)
        const toast = this.toastCtrl.create({
         message: 'The event has been added to your calendar',
         duration: 3000,
         cssClass: "toast2"
       });
       toast.present();
        this.colorState = "danger";
      }
    }
    else{
      this.saveAction = "going";
      const confirm = this.alertCtrl.create({
        message: 'you have to login before you can add the event to your calendar!',
        buttons: [
          {
            text: 'Sign In',
            handler: () => {
              this.navCtrl.push(LoginPage, {event:this.event, action:this.saveAction})
            }
          }
        ]
      });
      confirm.present();
    }

   
   }
  
  comment(){
    if (this.loginStatus ==  true){
      this.navCtrl.push(CommentsPage, {eventObject:this.event});
    }
    else{
      this.saveAction = "comment";
      const confirm = this.alertCtrl.create({
        message: 'you have to login before you can place a comment!',
        buttons: [
          {
            text: 'Sign In',
            handler: () => {
              this.navCtrl.push(LoginPage, {event:this.event, action:this.saveAction})
            }
          }
        ]
      });
      confirm.present();
    }

}
back(){
  if (this.actionState != undefined){
    this.actionState =  undefined;
    this.navCtrl.push(HomePage)
  }else{
    this.navCtrl.pop();
  }

}


presentPopover() {
  const popover = this.popoverCtrl.create(PopoverComponent,{testing:"news"});
  popover.present({
     ev:event,
  });
}
}