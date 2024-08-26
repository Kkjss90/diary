import { Injectable } from '@angular/core';

export interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  author: string;
  date: Date;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly diary = 'diaryEntries';

  //найти все записи определенного пользователя
  getEntriesByUser(username: string): any[] {
    const entries = this.getAllEntries();
    console.log(entries.filter(entry => entry.author === username));
    return entries.filter(entry => entry.author === username);

  }

  //создать запись
  createEntry(entry: { id: number, title: string; content: string; author: string }): void {
    const entries = this.getAllEntries();
    entries.push(entry);
    localStorage.setItem(this.diary, JSON.stringify(entries));
  }

  //изменить запись по id у определенного пользователя
  updateEntry(index: number, updatedEntry: { id: number, title: string; content: string; author: string }): void {
    const allEntries = this.getAllEntries();
    const userEntries = allEntries.filter(entry => entry.author === updatedEntry.author);
    const entryIndex = userEntries.findIndex(entry => entry.id === index);
    if (entryIndex !== -1) {
      userEntries[entryIndex] = { ...userEntries[entryIndex], ...updatedEntry };
      const updatedEntries = allEntries.map(entry => {
        return (entry.author === updatedEntry.author && entry.id === updatedEntry.id)
          ? updatedEntry
          : entry;
      });
      localStorage.setItem(this.diary, JSON.stringify(updatedEntries));
    }
  }

  //удалить запись по id у определенного пользователя
  deleteEntry(entryId: number, author: string): void {
    const allEntries = this.getAllEntries();
    const userEntries = allEntries.filter(entry => entry.author === author);
    const entryIndex = userEntries.findIndex(entry => entry.id === entryId);

    if (entryIndex !== -1) {
      userEntries.splice(entryIndex, 1);
      const updatedEntries = allEntries.filter(entry => {
        return !(entry.author === author && entry.id === entryId);
      });
      console.log(updatedEntries);
      localStorage.setItem(this.diary, JSON.stringify(updatedEntries));
    }
  }

  //загрузить все записи, не зависимо от пользователя
  private getAllEntries(): any[] {
    const entries = localStorage.getItem(this.diary);
    console.log(entries);
    return entries ? JSON.parse(entries) : [];
  }
}
