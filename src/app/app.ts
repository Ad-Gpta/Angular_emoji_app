import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('emoji_app');

  router: Router = inject(Router);

  startGame() {
    // Logic to start the game
    console.log('Game started!');
    // alert('Game started!');
    this.router.navigate(['/game']);
    //this.router.navigateByUrl('/game');
  }
}
