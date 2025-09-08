import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {
  router: Router = inject(Router);

  quitGame() {
    // Logic to view the score
    console.log('View Score button clicked!');
    this.router.navigate(['/score']);
  }
}
