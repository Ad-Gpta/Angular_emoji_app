import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  userUrl: string = 'http://localhost:8080'; //user and score
  emojiUrl: string = 'http://localhost:8000'; //emojis

  username: string = '';
  score: number = 0;

  private _usernameSource = new BehaviorSubject<string>('');
  private _scoreSource = new BehaviorSubject<number>(0);
  private _idSource = new BehaviorSubject<number>(0);

  // 2. Expose a public Observable that other components can subscribe to.
  // The '$' suffix is a convention for Observables.
  username$ = this._usernameSource.asObservable();
  score$ = this._scoreSource.asObservable();
  id$ = this._idSource.asObservable();

  constructor(private _http: HttpClient) { }

  // method to set username
  setUsername(username: string) {
    console.log('GameService: Setting username to', username);
    this._usernameSource.next(username); // Emit the new username
  }

  //set userID
  setUserID(id: number) {
    console.log('GameService: Setting userID to', id);
    this._idSource.next(id); // Emit the new username
  }

  // set User Score
  setUserScore(score: number) {
    console.log('GameService: Setting user score to', score);
    this._scoreSource.next(score); // Emit the new username
  }

  // get userID from database
  getUserID(): Observable<any> {
    console.log("GameService: Getting current user ID");
    return this._http.get(this.userUrl + "/userID");
  }

  // send username to database
  addUser(data: any): Observable<any> {
    console.log(data);
    return this._http.post(this.userUrl + "/users", data);
  }

  // add score to database (userID, score)
  addScore(data: any): Observable<any> {
    console.log(data);
    return this._http.post(this.userUrl + '/scores', data);
  }

  // get emojis from json server
  getEmojis(): Observable<any> {
    return this._http.get(this.emojiUrl);
  }

  // get best scores from databases (top 3 for leaderboard)
  getBestScores(): Observable<any> {
    return this._http.get(this.userUrl + '/scores/leaderboard');
  }
}
