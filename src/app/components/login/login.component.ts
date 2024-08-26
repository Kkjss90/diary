import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DataService} from "../../data.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  login: string = '';
  password: string = '';
  isTextVisible: boolean = false;
  errorMessage: string = '';

  constructor(private dataService: DataService, private router: Router) {
  }

  //вход
  tryLogin(){
    if(this.dataService.loginUser(this.login, this.password)){
      this.isTextVisible = false;
      this.router.navigate(['/main']);
    }else{
      this.errorMessage = 'Something went wrong, try again.';
      this.isTextVisible = true;
    }
  }

}
