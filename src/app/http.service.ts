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
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "https://wazirx.com");
    return this.http.get<Coin[]>("api/v2/tickers", {headers:headers}).pipe(first(), map(res=> {
      return Object.values(res)
    }));
  }

  SendMessage(text: string){
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "https://wazirx.com");
    this.http.get("sendMessage?chat_id=-1001711739464&text="+text+"&parse_mode=html", {headers : headers}).pipe(first()).subscribe();
  }
}
