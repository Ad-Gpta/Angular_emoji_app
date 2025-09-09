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

  private _usernameSource = new BehaviorSubject<string>('');

  // 2. Expose a public Observable that other components can subscribe to.
  // The '$' suffix is a convention for Observables.
  username$ = this._usernameSource.asObservable();

  constructor(private _http: HttpClient) { }

  // method to set username
  setUsername(username: string) {
    console.log('GameService: Setting username to', username);
    this._usernameSource.next(username); // Emit the new username
  }

  // send username and score to database
  addUser(data: any): Observable<any> {
    console.log(data);
    return this._http.post(this.userUrl + "/users", data);
  }

  addScore(data: any): Observable<any> {
    console.log(data);
    return this._http.post(this.userUrl + '/scores', data);
  }

  getUser(): Observable<any> {
    console.log("Getting username");
    return this._http.get(this.userUrl + "/users");
  }

  // get emojis from json server
  getEmojis(): Observable<any> {
    return this._http.get(this.emojiUrl);
  }

  // get best scores from databases
  getBestScores(): Observable<any> {
    return this._http.get(this.userUrl + '/scores/leaderboard');
  }
}
