import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DiaryEntry, ListService} from "../list/list.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-diary-edit',
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  entry: any = {
    id: 0,
    title: '',
    content: '',
    author: '',
    date: new Date(),
    image: ''
  };
  isNew = true;
  entryIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const index = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(index)) {
      const currentUser = this.dataService.getCurrentUser();
      const entries = this.listService.getEntriesByUser(currentUser?.username || '');
      if (entries[index]) {
        this.entry = entries[index];
        this.isNew = false;
        this.entryIndex = index;
      }
    }
  }

  //метод сохраняет записи
  saveEntry(): void {
    const currentUser = this.dataService.getCurrentUser();
    if (!currentUser) {
      console.error('Пользователь не авторизован!');
      return;
    }

    this.entry.author = currentUser.username;
    this.entry.date = new Date();

    if (this.isNew) {
      this.listService.createEntry(this.entry);
    } else if (this.entryIndex !== null) {
      this.listService.updateEntry(this.entryIndex, this.entry);
    }

    this.router.navigate(['/main']);
  }

  //метод для прикрепления изображения
  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.entry.image = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
