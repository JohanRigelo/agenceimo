import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private formBuilder:  FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    });
  }

  onSubmitLoginForm(){
    console.log(this.loginForm.value);
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authenticationService.signInUser(email, password).then(
      (data)=>{
        this.router.navigate(['/admin','dashboard']);
      }
    ).catch(
      (error) =>{
        console.log(error);
      }
      );
  //   this.authenticationService.signUpUser(email, password).then(
  //     ()=>{
  //       console.log('OKay')
  //     }
  //   ).catch(
  //     (error) =>{
  //       console.log(error);
  //     }
  //     );

  }
}
