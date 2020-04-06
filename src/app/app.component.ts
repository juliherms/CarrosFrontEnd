import { SharedService } from './shared/services/shared.service';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public shared: SharedService;

  exibirTemplate : boolean = false; //controla a exibição do menu

  title = 'carrospanel';

  constructor(){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
    this.shared.exibirTemplate.subscribe(
      show => this.exibirTemplate = show
    );

    console.log(this.exibirTemplate);
    
  }

  showContentWrapper(){
    return{
      'content-wrapper' : this.shared.isLoggedIn()
    }
  }
}
