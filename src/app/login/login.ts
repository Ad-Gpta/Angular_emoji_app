import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router: Router = inject(Router);

  username = '';

  // get username from input field and start the game


  startGame() {
    // get username from input field and trim whitespace  

    this.username = this.username.trim();
    // Logic to start the game
    console.log('Game started! for username: ' + this.username);
    // alert('Game started!');
    this.router.navigate(['/game']);
    //this.router.navigateByUrl('/game');
  }
}
