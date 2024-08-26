import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-start',
  standalone: true,
  templateUrl: './start.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './start.component.scss'
})
export class StartComponent {
  constructor() {
  }

}
