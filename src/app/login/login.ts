import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../service/game-service';
import { config } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router: Router = inject(Router);
  gameService = inject(GameService);

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  startGame() {

    if (this.form.valid) {
      this.gameService.addUser(this.form.value).subscribe({
        next: (res) => {
          // alert('User Added')
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          console.log("failed to create user")
        }
      });

      // add username to game service
      const username = this.form.value.name?.trim();
      this.gameService.setUsername(username);
      console.log('Username set to:', username);

      /*
      this.gameService.getUserID().subscribe(
        (res) => {
          console.log("Received user ID:", res);
          const userID = res.id;
          this.gameService.setUserID(userID);
        },
        (err) => {
          console.error("Error fetching user ID:", err);
        }
      );
      */
 
      this.gameService.getUserID().subscribe(config => {
        console.log("Received user ID:", config);
        const userID = config.id;
        this.gameService.setUserID(userID);
      })

      console.log('Game started!');
      this.router.navigate(['/game']);
      //this.router.navigateByUrl('/game');
    }
  }
}
