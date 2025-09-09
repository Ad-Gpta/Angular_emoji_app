import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { GameService } from '../service/game-service';


interface Movie {
  emoji: string;
  answer: string;
  hint: string;
}

@Component({
  selector: 'app-game',
  imports: [MatCardModule, MatFormFieldModule, MatIcon, CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule],
  templateUrl: './game.html',
  styleUrls: ['./game.css']
})

export class Game implements OnInit {
  gameService = inject(GameService);

  movies = [
    { emoji: ["🕷️", "🧑"], answer: "spiderman", hint: "live action" },
    { emoji: ["🦁", "👑"], answer: "lion king", hint: "animation" },
    { emoji: ["🧑‍🚀", "🌑"], answer: "interstellar", hint: "space" },
    { emoji: ["🧊", "🚢"], answer: "titanic", hint: "romance" },
    { emoji: ["🦖", "🌴"], answer: "jurassic park", hint: "dinosaurs" },
    { emoji: ["🧙", "⚡"], answer: "harry potter", hint: "magic" },
    { emoji: ["🦇", "🌃"], answer: "batman", hint: "superhero" },
    { emoji: ["👻", "🏠"], answer: "ghostbusters", hint: "comedy" },
    { emoji: ["🥊", "🇺🇸"], answer: "rocky", hint: "boxing" },
    { emoji: ["👩‍🚀", "🚀"], answer: "gravity", hint: "space survival" }
  ];

  totalQuestions = 10;
  current = 0;
  currentMovie = this.movies[0];
  userAnswer: string = '';
  message: string = '';
  messageColor: string = 'black';

  timeLeft: number = 30;
  timer: any;
  showNext: boolean = false;

  score: number = 0;
  gameOver: boolean = false;
  router: Router = inject(Router);

  ngOnInit(): void {
    // safety: ensure we don't try to run more questions than we have defined
    if (this.movies.length < this.totalQuestions) {
      console.warn(
        `movies.length (${this.movies.length}) < totalQuestions (${this.totalQuestions}). Adjusting totalQuestions.`
      );
      this.totalQuestions = this.movies.length;
    }
    this.currentMovie = this.movies[this.current];
    this.startTimer();
  }

  startTimer() {
    this.timeLeft = 30;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        this.message = "⏰ Time's up!";
        this.messageColor = "red";
        this.showNext = true;
      }
    }, 1000);
  }

  submitAnswer() {
    if (
      this.userAnswer.trim().toLowerCase() ===
      this.currentMovie.answer.toLowerCase()
    ) {
      this.message = '✅ Correct!';
      this.messageColor = 'green';
      this.score++;
    } else {
      this.message = '❌ Wrong! Correct answer: ' + this.currentMovie.answer;
      this.messageColor = 'red';
    }
    this.showNext = true;
    clearInterval(this.timer);
  }

  nextQuestion() {
    if (this.current + 1 < this.totalQuestions) {
      this.current++;
      this.currentMovie = this.movies[this.current];
      this.userAnswer = '';
      this.message = '';
      this.showNext = false;
      this.startTimer();
    } else {
      this.endGame();
    }
  }

  endGame() {
    this.gameOver = true;
    clearInterval(this.timer);
    // send score to score page

    this.gameService.setUserScore(this.score);

    this.router.navigate(['/score']);
  }

  restartGame() {
    this.current = 0;
    this.score = 0;
    this.gameOver = false;
    this.currentMovie = this.movies[this.current];
    this.userAnswer = '';
    this.message = '';
    this.showNext = false;
    this.startTimer();
  }
}