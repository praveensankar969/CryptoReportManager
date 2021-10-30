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
    return this.http.get<Coin[]>("https://api.wazirx.com/api/v2/tickers", {headers : {"Access-Control-Allow-Origin":"https://api.wazirx.com/"}}).pipe(first(), map(res=> {
      return Object.values(res)
    }));
  }

  SendMessage(text: string){
    this.http.get("sendMessage?chat_id=-1001711739464&text="+text+"&parse_mode=html").pipe(first()).subscribe();
  }
}
