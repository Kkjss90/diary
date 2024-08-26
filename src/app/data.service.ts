import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private readonly key = 'users';
  private readonly session = 'currentUser';
  private readonly sessionTimeout = 30 * 60 * 1000; // 30 минут
  private logoutTimer: any;

  constructor(private router: Router) {
  }

  //регистрация пользователя
  registerUser(username: string, password: string): boolean {
    const users = this.getUsers();
    if (users.some(user => user.username === username)) {
      return false;
    }
    users.push({username, password});
    localStorage.setItem(this.key, JSON.stringify(users));
    return true;
  }

  //вход
  loginUser(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      const sessionData = {username: user.username, loginTime: Date.now()};
      localStorage.setItem(this.session, JSON.stringify(sessionData));
      this.startSessionTimer();
      return true;
    }
    return false;
  }

  //выход
  logoutUser(): void {
    localStorage.removeItem(this.session);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.router.navigate(['/log']);
  }

  //проверка на то вошел ли пользователь
  isAuthenticatedUser(): boolean {
    const sessionData = this.getSessionData();
    if (sessionData) {
      const currentTime = Date.now();
      const sessionAge = currentTime - sessionData.loginTime;
      if (sessionAge < this.sessionTimeout) {
        this.startSessionTimer();
        return true;
      } else {
        this.logoutUser();
      }
    }
    return false;
  }

  //ник вошедшего в аккаунт пользователя
  getCurrentUser(): { username: string } | null {
    const sessionData = this.getSessionData();
    if (sessionData) {
      return { username: sessionData.username };
    }
    return null;
  }

  //все пользователи
  private getUsers(): User[] {
    const users = localStorage.getItem(this.key);
    return users ? JSON.parse(users) : [];
  }

  //данные сессии
  private getSessionData(): { username: string; loginTime: number } | null {
    const sessionData = localStorage.getItem(this.session);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  //начало таймера сессии
  private startSessionTimer(): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = setTimeout(() => {
      this.logoutUser();
    }, this.sessionTimeout);
  }
}
