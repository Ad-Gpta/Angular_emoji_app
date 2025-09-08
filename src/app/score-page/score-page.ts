import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-score-page',
  imports: [RouterLink],
  templateUrl: './score-page.html',
  styleUrl: './score-page.css'
})
export class ScorePage {
  router: Router = inject(Router);

  Restart() {
    console.log('Restarting the game...');
    this.router.navigate(['']);
  }
}
