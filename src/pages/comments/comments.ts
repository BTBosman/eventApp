import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';



@IonicPage()
@Component({
 selector: 'page-comments',
 templateUrl: 'comments.html',
})
export class CommentsPage {
eventArray = this.navParams.get('eventObject');
comments = new Array();
sortedComments = new Array();
newmessage;

 constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseService: FirebaseConnectionProvider) {
 }

 ionViewDidLoad() {
   this.firebaseService.getComments(this.eventArray[0].key).then((data:any) =>{
     this.comments = data;
     console.log(this.comments)
     var length = this.comments.length;
   })
}

placeComment(){
 this.firebaseService.comment(this.newmessage,this.eventArray[0].key).then(() =>{
   this.firebaseService.addNumComments(this.eventArray[0].key,  this.eventArray[0].comments, this.eventArray[0].hostname)
   this.comments.length = 0;
   this.newmessage = "";
 this.ionViewDidLoad();
 })
}

text(event){

}


}