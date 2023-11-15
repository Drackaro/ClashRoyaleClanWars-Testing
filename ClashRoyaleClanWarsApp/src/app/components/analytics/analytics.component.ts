import { Component, ViewChild } from '@angular/core';
import { CardService } from '../cards/card.service';
import { ICardDto } from '../cards/ICardDto';
import { QualityEnum } from '../cards/CardEnums';
import { TargetEnum } from '../cards/CardEnums';
import { DenominationEnum } from '../cards/CardEnums';
import { OnInit } from '@angular/core';
import { Deck, CardsList } from './Results';
import { AnalyticsService } from './analytics.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

    displayResults = false;
   

    imageSrcs = [
      {
        deck: "Giant Double Prince",
        img: "/assets/gallery/decks/giantDouble.PNG"
      },
      {
        deck: "Golem Beatdown",
        img: "/assets/gallery/decks/golem.PNG"
      },
      {
        deck: "X-Bow 2.9",
        img: "/assets/gallery/decks/crossbow.jpg"
      },
      {
        deck: "Graveyard Poison",
        img: "/assets/gallery/decks/graveyardPoison.jpg"
      },
      {
        deck: "Mega Knight Miner",
        img: "/assets/gallery/decks/miner.PNG"
      },
      {
        deck: "Royal Giant",
        img: "/assets/gallery/decks/royalGiant.PNG"
      },
      {
        deck: "Hog 2.6",
        img: "/assets/gallery/decks/hog.PNG"
      },
      {
        deck: "Lava Hound",
        img: "/assets/gallery/decks/lavaHound.jpg"
      },
      {
        deck: "Giant Skeleton",
        img: "/assets/gallery/decks/skeleton.PNG"
      },
    ]

    queryResults: any =[]

    canDrop = true

    available: ICardDto[] =[];

    selected: ICardDto[] =[];

    allCards: ICardDto[] = []

    currentlyDragging: ICardDto  | null = null;

    constructor(private cardServ : CardService, private deckService: AnalyticsService){}

    ngOnInit() {
      this.selected = [];
      //save into availabale products the results from getall in the cardService
      this.getCards()
      
  }

  itemParsingFunction(data: any): ICardDto{
    return {
      areaDamage: data.areaDamage,
      damage: data.damage,
      description: data.description,
      elixir: data.elixir,
      id: data.id,
      imageUrl: data.imageUrl,
      initialLevel: data.initialLevel,
      name: data.name,
      quality: QualityEnum[data.quality],
      target: TargetEnum[data.target],
      type: DenominationEnum[data.type]
    }
  }
  
  createDeck(d:any) :Deck {
    return{
      name: d.name,
      score : d.score,
      rating : this.getRating()
    }
  }

  getCards(){
    this.cardServ.getAll().subscribe(cards=>{
      cards.forEach(cardData => {
        let parsed = this.itemParsingFunction(cardData);
          if(!parsed){
            throw Error("Failed to parse card");
          } else {
            this.available.push(parsed);
          }
          });
    })

    this.allCards = this.available
  }


  dragStart(product: ICardDto) {
      this.currentlyDragging = product;
  }

  drop() {
      if (this.currentlyDragging && this.canDrop) {
          let draggedProductIndex = this.findIndex(this.currentlyDragging);
          this.selected = [...this.selected, this.currentlyDragging];
          this.available = this.available.filter((val, i) => i != draggedProductIndex);
          this.currentlyDragging = null;
          if (this.selected.length==8){
            this.canDrop=false
          }
      }
  }

  dragEnd() {
      this.currentlyDragging = null;
  }

  findIndex(product: ICardDto) {
      let index = -1;
      for (let i = 0; i < this.available.length; i++) {
          if (product.id === this.available[i].id) {
              index = i;
              break;
          }
      }
      return index;
  } 

  Remove(id:number){
    
    let card:ICardDto 

    for (let i = 0; i < this.selected.length; i++) {
      if (this.selected[i].id==id){
        card = this.selected[i]
        this.available.push(card)
        this.selected = this.selected.filter(x=> x!=card)
        this.canDrop = true
        break
      }
      
    }
  }



  getImage(name: string){

    let obj = this.imageSrcs.filter(x => x.deck==name)
    return obj[0].img
    
  }

  CreateList(data: string[]):string{
    var a:string ="?"
    for (let index = 0; index < data.length; index++) {
      a+="Cards=" + data[index]
      if (index+1<data.length){
        a+= "&"
      }
    }
    return a
  }

  MakeRqst(){
    let arr:string[] = []
    arr = this.selected.map(x => x.name)

    var q : any = []
    
    let list = this.CreateList(arr) 

    this.deckService.rqst(list).subscribe((data)=>{
      this.queryResults = data});

    this.displayResults = true

    



  }

  rst(){
    this.displayResults = false
    this.available = this.allCards
    this.selected = []
    this.canDrop = true
    this.getRating()
  }

  getRating(){
    // return random
    const randNum = Math.floor(Math.random() * 5);
    return randNum

  }
 
}





