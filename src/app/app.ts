import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ScorePage } from "./score-page/score-page";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScorePage, MatCardModule, RouterLink, RouterOutlet,
    MatButtonModule,
    MatInputModule,
    FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('emoji_app');
  private router: Router = inject(Router);

  startGame() {
    this.router.navigate(['game']);
  }
}
