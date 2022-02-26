import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coin } from './Models/Ticker';
import { first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  GetAllTickers(){
    return this.http.get<Coin[]>("https://api.wazirx.com/api/v2/tickers").pipe(first(), map(res=> {
      return Object.values(res).filter(_ => _.quote_unit=="usdt")
    }));
  }

  SendMessage(text: string){
    this.http.get("https://api.telegram.org/bot2086619820:AAHEc_MvMtL4WRNKFwWa7oZD_jPFq7HBpC4/sendMessage?chat_id=-1001711739464&text="+text+"&parse_mode=html").pipe(first()).subscribe();
  }
}
