import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  unicode_seq: string;
  movie_name: string;
  hint: string;
}
 
 
@Component({
  selector: 'app-game',
  imports: [MatCardModule, MatFormFieldModule, MatIcon, CommonModule, FormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule],
  templateUrl: './game.html',
  styleUrls: ['./game.css']
})
 
export class Game implements OnInit {
  movies: Movie[] = [];
  currentMovie!: Movie;
  current: number = 0;
  totalQuestions: number = 5;
  userAnswer: string = '';
  message: string = '';
  messageColor: string = 'black';
  showNext: boolean = false;
  score: number = 0;
  gameOver: boolean = false;
  timeLeft: number = 30;
  currentEmojis: string[] = [];
 
  timerInterval: any;
  gameService = inject(GameService);
 
  constructor(private http: HttpClient, private router: Router) {}
 
  ngOnInit(): void {
    this.fetchMovies();
  }
 
  fetchMovies() {
    this.http.get<Movie[]>('http://127.0.0.1:8000')
      .subscribe(data => {
        // this.movies = data;
        this.movies = this.shuffleArray(data);
        this.loadQuestion();
      });
  }
 
  loadQuestion(): void {
    this.currentMovie = this.movies[this.current];
    this.currentEmojis = this.convertUnicodeToEmojis(this.currentMovie.unicode_seq);
    this.resetTimer();
    this.userAnswer = '';
    this.message = '';
    this.messageColor = 'black';
    this.showNext = false;
  }
 
  convertUnicodeToEmojis(seq: string): string[] {
    return seq.split(' ').map(code => {
      const hex = code.replace('U+', '');
      return String.fromCodePoint(parseInt(hex, 16));
    });
  }
 
  submitAnswer(): void {
    if (this.userAnswer.trim().toLowerCase() === this.currentMovie.movie_name.toLowerCase()) {
      this.message = '✅ Correct answer!';
      this.messageColor = 'green';
      this.score++;
    } else {
      this.message = '❌ Wrong! Correct Answer ' + this.currentMovie.movie_name;
      this.messageColor = 'red';
    }
    this.showNext = true;
    clearInterval(this.timerInterval);
  }
 
  nextQuestion(): void {
    this.current++;
    if (this.current < this.totalQuestions) {
      this.loadQuestion();
    } else {
      this.gameOver = true;
      this.endGame();
    }
  }
 
  restartGame(): void {
    this.current = 0;
    this.score = 0;
    this.gameOver = false;
    this.fetchMovies();
  }
 
  public endGame() {
    // console.log('Game ended. Final score:', this.score);
    this.gameOver = true;
    clearInterval(this.timerInterval);

    this.gameService.setUserScore(this.score);
 
    console.log('Final Score:', this.score);
 
    this.gameService.addScore().subscribe({
      next: (res) => {
        console.log('Score submitted:', res);
      },
      error: (err) => {
        console.error('Error submitting score:', err);
      }
    });
 
    this.router.navigate(['/score']);
  }
 
  resetTimer(): void {
    this.timeLeft = 30;
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.message = '⏰ Time up! answer was ' + this.currentMovie.movie_name;
        this.messageColor = 'orange';
        this.showNext = true;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
 
  shuffleArray(array: Movie[]): Movie[] {
    return array.sort(() => Math.random() - 0.5);
  }
}