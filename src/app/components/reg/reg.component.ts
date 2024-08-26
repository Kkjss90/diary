import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DataService} from "../../data.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
  ],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss'
})
export class RegComponent{
  login: string = '';
  password1: string = '';
  password2: string = '';
  isTextVisible: boolean = false;
  errorMessage: string = '';

  constructor(private dataService: DataService ,private router: Router) {
  }

  //проверка на корректность ввода
  checkInput() {
    if (this.password1!== this.password2) {
      this.errorMessage = 'Passwords are different';
      return false;
    } else {
      return true;
    }
  }

  //регистрация
  tryRegistration() {
    if (this.dataService.registerUser(this.login, this.password1)){
      this.isTextVisible = false;
      this.router.navigate(['/log']);
    }else{
      this.errorMessage = 'Something went wrong, try again.';
      this.isTextVisible = true;
    }
  }

}
