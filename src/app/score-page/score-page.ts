import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../service/game-service';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-page',
  imports: [MatTableModule, AsyncPipe],
  templateUrl: './score-page.html',
  styleUrl: './score-page.css'
})
export class ScorePage {
  router: Router = inject(Router);
  gameService: GameService = inject(GameService);


  displayedColumns: string[] = ['id', 'username', 'score'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getLeaderboard();
  }

  getLeaderboard() {
    this.gameService.getBestScores().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  Restart() {
    console.log('Restarting the game...');
    this.router.navigate(['']);
  }
}
