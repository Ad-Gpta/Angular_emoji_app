import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  userUrl: string = 'http://localhost:8080';
  emojiUrl: string = 'http://localhost:8000';

  constructor(private _http: HttpClient) { }

  // send username and score to database
  addUserAndScore(data: any): Observable<any> {
    console.log(data);
    return this._http.post(this.userUrl, data);
  }

  // get emojis from json server
  getEmojis(): Observable<any> {
    return this._http.get(this.emojiUrl);
  }

  // get best scores from databases
  getBestScores(): Observable<any> {
    return this._http.get(this.emojiUrl + '/top-scores');
  }
}
