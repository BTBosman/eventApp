import { Component } from '@angular/core';
import {FirebaseConnectionProvider} from '../../providers/firebase-connection/firebase-connection'
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { SecondPage } from '../second/second';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  logg = LoginPage;
  status;
  splash = true;
secomndPage = SecondPage;
  constructor(public fire:FirebaseConnectionProvider) {

  }
  ​ionViewDidEnter(){
    setTimeout(()=> this.splash = false , 3000);
    this.checkLogInState();
  }
  checkLogInState(){
    this.fire.getUserSatate().then( data =>{
      if (data == 1){
       this.status =  true;
       this.fire.getuser().then(data=>{
       });
      }
  
     else if(data == 0){
        this.status =  false;
      }
       })
  }

}
