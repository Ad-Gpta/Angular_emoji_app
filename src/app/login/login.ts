import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router: Router = inject(Router);

  startGame() {
    // Logic to start the game
    console.log('Game started!');
    // alert('Game started!');
    this.router.navigate(['/game']);
    //this.router.navigateByUrl('/game');
  }
}
