import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {}

  //проверка на то зашел ли пользователь в аккаунт
  canActivate(): boolean {
    if (this.dataService.isAuthenticatedUser()) {
      return true;
    } else {
      this.router.navigate(['/log']);
      return false;
    }
  }
}
