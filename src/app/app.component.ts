import { Component } from '@angular/core';
import  * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monAgence';
constructor(){
  const firebaseConfig = {
    apiKey: "AIzaSyALIpDqRn5dwrphFSfMHZ5ej0z6V89mPAo",
    authDomain: "monprojetagence.firebaseapp.com",
    databaseURL: 'https://monprojetagence.firebaseio.com',
    projectId: "monprojetagence",
    storageBucket: "monprojetagence.appspot.com",
    messagingSenderId: "1066952373469",
    appId: "1:1066952373469:web:d0eff64e2ea5ae7b1c1734"
  };
  firebase.initializeApp(firebaseConfig);
}



}




