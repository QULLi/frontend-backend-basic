import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<div class="home-container">
    <h2>Home Page</h2>
    <p>Welcome to the home page!</p>
  </div>`,
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {}