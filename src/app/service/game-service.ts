import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  userUrl: string = 'http://localhost:8080'; //user and score
  emojiUrl: string = 'http://localhost:8000'; //emojis

  username: string = '';
  score: number = 0;
  userID: number = 0;


  private _usernameSource = new BehaviorSubject<string>('');
  private _scoreSource = new BehaviorSubject<number>(0);
  private _userIDSource = new BehaviorSubject<number>(0);

  // 2. Expose a public Observable that other components can subscribe to.
  // The '$' suffix is a convention for Observables.
  username$ = this._usernameSource.asObservable();
  score$ = this._scoreSource.asObservable();
  userID$ = this._userIDSource.asObservable();

  constructor(private _http: HttpClient) { }

  // method to set username
  setUsername(username: string) {
    console.log('GameService: Setting username to', username);
    this._usernameSource.next(username); // Emit the new username
  }

  //set userID
  setUserID(userID: number) {
    console.log('GameService: Setting userID to', userID);
    this._userIDSource.next(userID); // Emit the new username
  }

  getCurrentUserID(): number {
    console.log('GameService: Getting current user ID:', this._userIDSource.value);
    return this._userIDSource.value;
  }

  // set User Score
  setUserScore(score: number) {
    console.log('GameService: Setting user score to', score);
    this._scoreSource.next(score); // Emit the new username
  }

  // get userID from database
  getUserID(): Observable<any> {
    console.log("GameService: Getting user ID from backend");
    return this._http.get(this.userUrl + "/userID");
  }

  // send username to database
  addUser(data: any): Observable<any> {
    console.log("GameService: posting username to backend: ",data);
    return this._http.post(this.userUrl + "/users", data);
  }

  // add score to database (userID, score)
  addScore(): Observable<any> {
    console.log("GameService: posting score to backend: userID=",this._userIDSource.value," scoreValue=",this._scoreSource.value);
    //scores?userID=29&scoreValue=0

    let params = new HttpParams();
    params = params.append('userID', this._userIDSource.value); // Parameter name must match @RequestParam name
    params = params.append('scoreValue', this._scoreSource.value); // Parameter name must match @RequestParam name

    // 3. Make the POST request
    //    For a POST request that sends data via query parameters (and not in the body),
    //    the second argument (the request body) should typically be 'null' or an empty object.
    //    The query parameters are passed in the 'params' option of the third argument.
    return this._http.post(this.userUrl + '/scores', null, { params: params });
    
    //return this._http.post(this.userUrl + '/scores?userID='+this._userIDSource.value+"&scoreValue="+this._scoreSource.value);
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
