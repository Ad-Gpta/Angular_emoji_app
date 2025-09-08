import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ScorePage } from "./score-page/score-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScorePage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('emoji_app');

  startGame() {
    // Logic to start the game
    console.log('Game started!');
    alert('Game started!');
  }
}
