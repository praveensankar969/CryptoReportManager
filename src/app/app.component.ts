import { Component, SimpleChanges } from '@angular/core';
import { HttpService } from './http.service';
import { Coin } from './Models/Ticker';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
declare var device;
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  priceDetailsHistory : Coin[]=[];
  priceDetails: Coin[] = [];
  
  constructor(private service: HttpService, private backgroundMode: BackgroundMode){}

  ngOnInit(): void {
    document.addEventListener("deviceready", function() {
      alert(device.platform);
      }, false);
      this.backgroundMode.enable();
   this.Fetch();
  }

  Fetch(){
    this.service.GetAllTickers().subscribe(res=> {
      console.log(res)
      this.priceDetails = res;
      this.priceDetailsHistory = this.priceDetails;
     });
    
     interval(60000)
    .pipe(takeWhile(() => true))
    .subscribe(() => {
      this.service.GetAllTickers().subscribe(res=> {
        this.priceDetails = res;
        this.Compare(this.priceDetailsHistory, this.priceDetails);
        this.priceDetailsHistory = this.priceDetails;
       });
    });
    
  }

  Compare(prevValue:Coin[], currentValue: Coin[]){
    for(let i=0; i<prevValue.length;i++){
      if(parseInt(currentValue[i].last) > parseInt(prevValue[i].last)){
        let change = (parseInt(currentValue[i].last)-parseInt(prevValue[i].last))/100;
        if(change > 5 && parseInt(currentValue[i].last) < 1000){
          let message="";
          if(change >= 10){
            message = "<strong>Spike</strong> in "+ currentValue[i].base_unit + ", Previous was: <strong>"+prevValue[i].last +"</strong> and Current is: <strong>"+currentValue[i].last+"</strong>";
          }else{
            message = "Change in "+  currentValue[i].base_unit + ", Previous was: <strong>"+prevValue[i].last +"</strong> and Current is: <strong>"+currentValue[i].last+"</strong>";
          }
          this.service.SendMessage(message);
        }
      }
    }
  }



  

}
