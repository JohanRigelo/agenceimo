import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Ma super agence';
  isLoggedIn = false



  constructor(
    private authentificationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (userSession)=>{
        if( userSession){
          this.isLoggedIn = true;

          console.log( userSession );
          console.log('connecté !!!!!!!!');
        }
        else{
          this.isLoggedIn = false;

          console.log('deconnecté');
        }
      }
    );

  }
  onLogOut(){
    this.authentificationService.logOutUser();
  }
}
