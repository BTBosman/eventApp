import { Component } from '@angular/core';
import { NavController, AlertController, ModalController,LoadingController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { ProfileUpdatePage } from '../profile-update/profile-update';
import { PopoverController } from 'ionic-angular';

// import { PopoverComponent } from '../../components/popover/popover';
import { MoreInfoPage } from '../more-info/more-info';
import { PopOver2Component } from '../../components/pop-over2/pop-over2';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  profile = [];
  pic;
  username;
  message;
  email;
  
  fetching = new Array();

  constructor(public loadingCtrl: LoadingController,public popoverCtrl: PopoverController,public navCtrl: NavController,private firebaseService: FirebaseConnectionProvider, private alertCtrl : AlertController,public modalCtrl:ModalController) {

  }
  ionViewDidEnter(){
    this.fetching.length = 0;
    this.profile.length = 0;
    this.ionViewDidLoad()
  }

  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please Wait.',
      duration: 17000
    });

    loading.present();
    this.profile.length = 0;
    this.message = "";
    this.firebaseService.getProfile().then((data:any)=>{
      this.profile = data;
      this.pic = this.profile[0].img
      this.username = this.profile[0].Username;
  
    })
    this.fetching.length = 0;
    this.firebaseService.getALlGoings().then((data:any) => {
      if (data != "no data"){
        this.fetching = data;
      }
      else{
        this.message = "You currently do not have any events to attend"
      }
    }, Error =>{
     console.log(Error)

    });
    loading.dismiss()
  }

  presentModal(){
   this.navCtrl.push(ProfileUpdatePage);
  }


  Log(event) {
    const popover = this.popoverCtrl.create(PopOver2Component);
    popover.present({
       ev:event
    });
   
  }

   more(a){
    this.navCtrl.push(MoreInfoPage, {events:this.fetching[a], color:true});
  }

}