import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coin } from './Models/Ticker';
import { first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  GetAllTickers(){
    return this.http.get<Coin[]>("https://api-crypto-reporter.herokuapp.com/redirect").pipe(first(), map(res=> {
      return Object.values(res).filter(_ => _.quote_unit=="usdt")
    }));
  }

  SendMessage(text: string){
    this.http.post("https://api-crypto-reporter.herokuapp.com/redirect/sendmessage", {text: text}).pipe(first()).subscribe();
  }
}
