import { Component, SimpleChanges } from '@angular/core';
import { HttpService } from './http.service';
import { Coin } from './Models/Ticker';
import { interval } from 'rxjs';
import { first, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  priceDetails: Coin[] = [];
  constructor(private service: HttpService){}

  ngOnInit(): void {
   this.Fetch();
  }

  Fetch(){
    this.service.GetAllTickers().subscribe(res=> {
      console.log(res)
      this.priceDetails = res;
      localStorage.setItem("Initial", JSON.stringify(this.priceDetails));
     });
    interval(5000)
    .pipe(takeWhile(() => true))
    .subscribe(() => {
      this.service.GetAllTickers().pipe(first()).subscribe(res=> {
        this.priceDetails = res;
        this.Compare(this.priceDetails);
       });
    });
    
  }

  Reset(){
    localStorage.clear();
    this.service.GetAllTickers().subscribe(res=> {
      console.log(res)
      this.priceDetails = res;
      localStorage.setItem("Initial", JSON.stringify(this.priceDetails));
     });
  }

  Compare(currentValue: Coin[]){
    let val = ""
    val = val + localStorage.getItem("Initial")
    let intialValues : Coin[] = JSON.parse(val);
    for(let i=0; i<intialValues.length;i++){
      if(parseInt(currentValue[i].last) > parseInt(intialValues[i].last) && parseInt(currentValue[i].last) < 1000){
        let change = (parseInt(currentValue[i].last)-parseInt(intialValues[i].last))/100;
        console.log(change)
        if(change > 5){
          let message="";
          if(change >= 10){
            message = "<strong>Spike</strong> in "+ currentValue[i].base_unit + ", Previous was: <strong>"+intialValues[i].last +"</strong> and Current is: <strong>"+currentValue[i].last+"</strong>";
          }else{
            message = "Change in "+  currentValue[i].base_unit + ", Previous was: <strong>"+intialValues[i].last +"</strong> and Current is: <strong>"+currentValue[i].last+"</strong>";
          }
          this.service.SendMessage(message);
        }
      }
    }
  }



  

}
