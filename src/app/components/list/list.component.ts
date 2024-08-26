import {Component, OnInit} from '@angular/core';
import {DiaryEntry, ListService} from "./list.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-diary-list',
  templateUrl: './list.component.html',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  entries: DiaryEntry[] = [];

  constructor(private listService: ListService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadEntries();
  }

  //загрузить все записи
  loadEntries(): void {
    const currentUser = this.dataService.getCurrentUser();
    if (currentUser) {
      this.entries = this.listService.getEntriesByUser(currentUser.username);
    }
  }

  //создать запись пользователя
  createEntry(): void {
    const currentUser = this.dataService.getCurrentUser();
    if (currentUser) {
      const index = this.nextId();
      const newEntry = {id: index, title: 'Новая запись', content: 'Текст записи', author: currentUser.username};
      this.listService.createEntry(newEntry);
      this.loadEntries();
    } else {
      console.error('Пользователь не авторизован!');
    }
  }

  //выйти из аккаунта
  logout(): void {
    this.dataService.logoutUser();
  }

  //удалить запись по id у определенного пользователя
  deleteEntry(index: number): void {
    const currentUser = this.dataService.getCurrentUser();
    if (currentUser) {
      this.listService.deleteEntry(index, currentUser.username);
      this.loadEntries();
    }
  }

  //следующий id
  private nextId(): number {
    const currentUser = this.dataService.getCurrentUser();
    if (currentUser) {
      const entries = this.listService.getEntriesByUser(currentUser?.username);
      if (entries.length == 0) {
        return 0;
      }
      return entries.length;
    }
    return 0;
  }
}
